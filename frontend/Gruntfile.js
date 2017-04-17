/* eslint-disable */
/* jshint esnext: true */
module.exports = function (grunt) {
  'use strict';

  function log(...messages) {
    console.log(...messages);
  }

  function getLocalIpAddress() {
    const os = require('os');
    const ifaces = os.networkInterfaces();
    let lookupIpAddress;
    for (const dev in ifaces) {
      if (dev != 'en1' && dev != 'en0') {
        continue;
      }
      ifaces[dev].forEach(function (details) {
        if (details.family == 'IPv4' && !lookupIpAddress) {
          lookupIpAddress = details.address;
        }
      });
      if (lookupIpAddress) {
        break;
      }
    }
    return lookupIpAddress;
  }

  const packageFile = 'package.json';
  const requireJsConfigFile = 'app/js/requirejsconfig.json';

  grunt.registerTask('initGrunt', 'Load package.json and initConfig', () => {
    const wiredep = require('wiredep');

    function isPackageJsonValidFile(path) {
      try {
        const data = grunt.file.readJSON(path);
        return data && data.name && data.version;
      } catch (e) {
        return false;
      }
    }

    if (isPackageJsonValidFile(packageFile)) {
      gruntInit(packageFile);
    }

    function gruntInit(pkgFile) {
      const pkg = grunt.file.readJSON(pkgFile);
      const lessOptions = {
        paths: ['assets/styles-less'],
        ieCompat: true,
        plugins: [
          new (require('less-plugin-autoprefix'))({ browsers: ['last 2 versions'] }),
        ],
      };
      const lessFiles = ((destPath) => {
        let fileName;
        let filePath;
        const files = {};

        grunt.file.expand('app/assets/styles-less/**/*.less').map((file) => {
          fileName = file.substring(file.lastIndexOf('/') + 1);
          filePath = file.replace('app/assets/styles-less/', '').replace(fileName, '');
          fileName = fileName.replace('.less', '.css');
          files[`${destPath}/assets/styles/${filePath + fileName}`] = file;
        });

        return files;
      });

      // read requirejsconfig json file
      const requirejsConfig = grunt.file.readJSON(requireJsConfigFile);

      grunt.initConfig({
        clean: {
          dist: ['dist'],
        },

        injector: {
          options: {
            bowerPrefix: 'bower:',
          },
          bower_dependencies: {
            files: {
              'app/index.html': ['bower.json'],
            },
          },
          local_dependencies: {
            files: {
              'app/index.html': grunt.file.expand(['app/js/**/*.js', '!app/js/compiled-templates/**', '!app/js/**/modules/**/*.js']),
            },
          },
        },

        handlebars: {
          all: {
            options: {
              exportAMD: true,
              returnAMD: false,
              returnTemplates: true,
            },
            files: (() => {
              const files = {};
              const dirs = grunt.file.expand({ filter: 'isDirectory' }, 'app/templates/*');
              let dir;

              dirs.map((dirPath) => {
                dir = dirPath.substring(dirPath.lastIndexOf('/') + 1);
                files[`app/js/compiled-templates/${dir}.js`] = grunt.file.expand(`${dirPath}/**/*.hbs`);
              });
              return files;
            })(),
          },
        },

        requirejs: {
          compile: {
            options: {
              baseUrl: '.',
              removeCombined: false,
              findNestedDependencies: true,
              out: 'dist/js/bundle.js',
              generateSourceMaps: false,
              shim: requirejsConfig.shim,
              wrapShim: true,
              optimize: "none",
              uglify2: {
                output: {
                  beautify: true
                }
              },
              //name: 'bower_components/requirejs/require.js',
              name: 'app/js/appConfig.js',
              //include: grunt.file.expand(['app/js/**/*.js', `!${pkg.moduleConfigFile}`]),
              paths: requirejsConfig.paths
            },
          },
        },

        replace: {
          dev: {
            options: {
              patterns: [
                {
                  match: /<!-- include_requirejs -->/g,
                  replacement: '<script src="/bower_components/requirejs/require.js"></script>'
                },
                {
                  match: /<!-- include_livereload -->/g,
                  replacement: '<script src="//localhost:35729/livereload.js"></script>'
                },
                {
                  match: /<!-- include_bundle -->/g,
                  replacement: ''
                },
                {
                  match: /<!-- include_moduleconfig -->/g,
                  replacement: '<script src="/app/js/module_config.js"></script>'
                },
                {
                  match: /<!-- include_appconfig -->/g,
                  replacement: '<script src="/app/js/appConfig.js"></script>'
                },
              ]
            },
            files: [{ expand: true, src: ['index.html'], dest: 'app/' }]
          },
          dist: {
            options: {
              patterns: [
                {
                  match: /<!-- include_requirejs -->/g,
                  replacement: '<script src="js/require.js"></script>'
                },
                {
                  match: /<!-- include_livereload -->/g,
                  replacement: ''
                },
                {
                  match: /<!-- include_bundle -->/g,
                  replacement: '<script src="js/bundle.js"></script>'
                },
                {
                  match: /<!-- injector:bower:css -->/g,
                  replacement: '<link rel="stylesheet" href="assets/styles/vendorBundle.min.css">'
                },
                {
                  match: /<!-- endinjector -->/,
                  replacement: ''
                },
                {
                  match: /<!-- include_moduleconfig -->/g,
                  replacement: ''
                },
                {
                  match: /<!-- include_appconfig -->/g,
                  replacement: ''
                },
              ]
            },
            files: [{ expand: true, src: ['dist/index.html'], dest: '.' }]
          }
        },

        less: {
          dev: {
            options: {
              paths: ['assets/styles-less'],
              ieCompat: true,
              plugins: [
                new (require('less-plugin-autoprefix'))({ browsers: ['last 2 versions'] }),
              ],
            },
            files: lessFiles('app/'),
          },
          prod: {
            options: Object.assign({}, lessOptions, {
              compress: true,
            }),
            files: lessFiles('dist/'),
          },
        },

        cssmin: {
          options: {
            mergeIntoShorthands: false,
            roundingPrecision: -1
          },
          target: {
            files: [{
              expand: false,
              cwd: '.',
              src: (() => {
                const dependencies = wiredep({
                  directory: './bower_components',
                });
                const files = [];
                let fileName;

                // load bower components
                Object.keys(dependencies).forEach((key) => {
                  if (key === 'css') {
                    dependencies[key].map((path) => {
                      files.push(path);
                    });
                  }
                });
                return files;
              })(),
              dest: 'dist/assets/styles/vendorBundle.min.css',
            }]
          }
        },

        imagemin: {
          dynamic: {
            options: {
              optimizationLevel: 3,
            },
            files: [{
              expand: true,
              cwd: 'app/img/',
              src: ['**/*.{png,jpg,gif}'],
              dest: 'dist/img/',
            }],
          },
        },

        copy: {
          main: {
            files: [
              {
                expand: true,
                src: ['index.html'],
                dest: 'dist/',
                filter: 'isFile',
                flatten: true,
              },
              {
                expand: true,
                cwd: 'app/assets',
                src: ['**', '!styles-less/**'],
                dest: 'dist/assets/',
              },
              {
                expand: true,
                cwd: 'bower_components/requirejs',
                src: ['require.js'],
                dest: 'dist/js/',
              },
              {
                expand: true,
                cwd: '.',
                src: ['bower_components/bootstrap/dist/fonts/*', 'bower_components/components-font-awesome/fonts/*'],
                dest: 'dist/assets/fonts/',
                flatten: true,
              },
              {
                expand: true,
                cwd: '.',
                src: ['bower_components/foundation-icon-fonts/*.woff', 'bower_components/foundation-icon-fonts/*.eot'],
                dest: 'dist/assets/styles/',
                flatten: true,
              },
              {
                expand: true,
                cwd: '.',
                src: ['bower_components/bootstrap-fileinput/img/*'],
                dest: 'dist/assets/img/',
                flatten: true,
              }
            ],
          },
        },

        connect: {
          server: {
            options: {
              directory: grunt.option('directory') || '.',
              hostname: pkg.serverHost || getLocalIpAddress(),
              cors: true,
              port: pkg.serverPort,
              openBrowser: pkg.openBrowser,
              livereload: true,
            },
          },
        },

        watch: {
          options: {
            livereload: true,
          },
          hbs: {
            files: [
              'Gruntfile.js',
              'app/templates/**/*.hbs',
              'app/js/**/*.js',
              'app/assets/styles-less/**/*.less',
              '!app/js/compiled-templates/**/*.js',
              `!${pkg.moduleConfigFile}`,
            ],
            tasks: ['default'],
          },
        },

        updateModuleConfig: {
          options: {
            pkg: pkg,
            wiredep: wiredep,
            requirejsConfig: requirejsConfig,
          },
        },
      });
    }
  });

  grunt.registerTask('updateModuleConfig', function updateModuleConfig() {
    const options = this.options();
    const pkg = options.pkg;
    const configFile = grunt.file.read(pkg.moduleConfigFile).split('\n');
    const requirejsConfig = options.requirejsConfig;

    let compiledTpls = '';
    const extend = require('extend');
    const dependencies = options.wiredep({
      directory: './bower_components',
    });
    const pathsNotToInclude = {
      require: '',
    };
    let sections;
    let fileName;
    let moduleNames = [];

    function getSection(file, sectionStartRegEx, sectionEndRegEx, type) {
      const linesWithNo = {};
      const firstHalf = [];
      const lastHalf = [];
      let startLine;
      let endLine;
      let lineno;
      let line;
      // find startLine & endLine
      file.map((kline, vlineno) => {
        linesWithNo[vlineno + 1] = kline;
        if (sectionStartRegEx.test(kline)) {
          startLine = vlineno + 1;
        } else if (sectionEndRegEx.test(kline)) {
          endLine = vlineno + 1;
        }
      });

      if (type === 'firstandlast') {
        // get first half
        for (lineno in linesWithNo) {
          line = linesWithNo[lineno];
          if (lineno <= startLine) {
            firstHalf.push(line);
          }
          if (lineno >= endLine) {
            lastHalf.push(line);
          }
        }
      } else if (type === 'exact') {
        for (lineno in linesWithNo) {
          if (lineno > startLine && lineno < endLine) {
            firstHalf.push(linesWithNo[lineno]);
          }
        }
      }

      return { firstHalf: firstHalf.join('\n'), lastHalf: lastHalf.join('\n') };
    }

    function concatExpandedFiles(file) {
      fileName = file.substring(file.lastIndexOf('/') + 1).replace('.js', '');
      moduleNames.push(`'${fileName}'`);
      compiledTpls = `${compiledTpls}\n    '${fileName}': '${file.replace('.js', '').replace('app/', '')}',`;
    }

    Object.keys(dependencies).forEach((key) => {
      if (key === 'js') {
        dependencies[key].map((path) => {
          fileName = path.substring(path.lastIndexOf('/') + 1).split('.')[0];
          if (!(fileName in pathsNotToInclude)) {
            compiledTpls = `${compiledTpls}\n    '${fileName}': '/${path.replace('.js', '')}',`;
          }
        });
      }
    });

    grunt.file.expand('app/js/compiled-templates/*.js').map(concatExpandedFiles);

    grunt.file.expand('app/js/**/modules/**/*.js').map(concatExpandedFiles);

    // include controllers
    grunt.file.expand('app/js/controllers/**/*.js').map(concatExpandedFiles);

    // update requirejsconfig file
    (function updateRequirejsConfig() {
      // convert paths related to baseDir which is .
      function convertPaths(obj, keyToConvert) {
        Object.keys(obj).forEach((key) => {
          if (key == keyToConvert) {
            Object.keys(obj[key]).forEach((key1) => {
              depValue = obj[key][key1];
              if (!/^\/bower_components/.test(depValue)) {
                obj[key][key1] = `app/${depValue}`;
              } else {
                obj[key][key1] = depValue.substring(1);
              }
            });
          }
        });
      }
      sections = getSection(configFile, /\/\/ <include_custom_paths>/, /\/\/ <\/include_custom_paths>/, 'exact');
      let jsonCompatibleStr = compiledTpls + sections.firstHalf.substring(0, sections.firstHalf.length - 1);
      jsonCompatibleStr = jsonCompatibleStr.replace(/\'/g, '"');
      let paths = JSON.parse(`{${jsonCompatibleStr}}`);
      let copyOfConfig = extend(true, {}, requirejsConfig);
      let shimConfig = getSection(configFile, /\/\/ <shim_config>/, /\/\/ <\/shim_config>/, 'exact');
      shimConfig = shimConfig.firstHalf.substring(0, shimConfig.firstHalf.length - 1);
      shimConfig = eval('shimConfig={'+shimConfig + '}');
      let depValue;

      copyOfConfig.paths = paths;
      copyOfConfig.shim = shimConfig.shim;

      convertPaths(copyOfConfig, 'paths');

      grunt.file.write(requireJsConfigFile, JSON.stringify(copyOfConfig, null, 2));
    }());

    (function updateAppConfig() {
      let appConfigFile = grunt.file.read('app/js/appConfig.js').split('\n');
      let requireModules = moduleNames.join(', ');
      requireModules = `require([${requireModules}], function() {});`;
      sections = getSection(appConfigFile, /\/\/ <make_it_start_page>/, /\/\/ <\/make_it_start_page>/, 'firstandlast');

      grunt.file.write('app/js/appConfig.js', `${sections.firstHalf}\n${requireModules}\n${sections.lastHalf}`);
    }());

    sections = getSection(configFile, /\/\/ <include_paths>/, /\/\/ <\/include_paths>/, 'firstandlast');

    grunt.file.write(pkg.moduleConfigFile, `${sections.firstHalf}\n${compiledTpls}\n${sections.lastHalf}`);
  });

  grunt.registerTask('removeBowers', 'Removes bower_components from index.html', () => {
    const index = grunt.file.read('dist/index.html').split('\n');
    let lines = [];
    let line;

    function ignoreLinesAndGet(lines, regex) {
      const rlines = [];
      let startLine;
      let endLine;
      lines.map((line, lineNo) => {
        if (regex.test(line.trim())) {
          startLine = lineNo + 1;
        }
        if (!startLine || startLine && endLine) {
          rlines.push(line);
        }
        if (/<!-- endinjector -->/.test(line.trim()) && startLine && !endLine) {
          endLine = lineNo + 1;
        }
      });
      return rlines;
    }

    lines = ignoreLinesAndGet(index, /<!-- injector:bower:css -->/);
    lines = ignoreLinesAndGet(lines, /<!-- injector:bower:js -->/);

    // replace contents of index.html
    grunt.file.write('dist/index.html', lines.join('\n'));
  });

  grunt.loadNpmTasks('grunt-contrib-clean');
  grunt.loadNpmTasks('grunt-contrib-handlebars');
  grunt.loadNpmTasks('grunt-injector');
  grunt.loadNpmTasks('grunt-contrib-connect');
  grunt.loadNpmTasks('grunt-contrib-requirejs');
  grunt.loadNpmTasks('grunt-contrib-copy');
  grunt.loadNpmTasks('grunt-contrib-less');
  grunt.loadNpmTasks('grunt-contrib-imagemin');
  grunt.loadNpmTasks('grunt-contrib-watch');
  grunt.loadNpmTasks('grunt-handlebars-compiler');
  grunt.loadNpmTasks('grunt-replace');
  grunt.loadNpmTasks('grunt-contrib-cssmin');

  // default is build
  grunt.registerTask('default', ['initGrunt', 'clean', 'handlebars:all', 'replace:dev', 'injector', 'updateModuleConfig', 'less:dev']);
  grunt.registerTask('serve', ['initGrunt', 'connect:server', 'watch']);
  grunt.registerTask('rjs', ['initGrunt', 'requirejs']);
  grunt.registerTask('build', ['initGrunt', 'clean', 'handlebars:all', 'updateModuleConfig', 'requirejs', 'copy:main', 'replace:dist', 'less:prod', 'cssmin', 'imagemin']);
};
