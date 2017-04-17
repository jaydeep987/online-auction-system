/* eslint quote-props:0, key-spacing:0 */
requirejs.config({
  enforceDefine: false,
  // <shim_config>
  shim         : {
    bootstrap: {
      deps: ['jquery'],
    },
    fileinput: {
      deps: ['jquery'],
    },
    explorertheme: {
      deps   : ['fileinput', 'jquery'],
      exports: '$.fn.fileinputThemes.explorer',
    },
    lightslider: {
      deps: ['jquery'],
    },
    jscf: {
      deps: ['jquery', 'handlebars'],
    },
  },
  // </shim_config>
  paths: {
    // <include_custom_paths>
    'hbdivide'     : '/bower_components/bullhorn-handlebars-helpers/src/math/divide',
    'fileinput'    : '/bower_components/bootstrap-fileinput/js/fileinput',
    'explorertheme': '/bower_components/bootstrap-fileinput/themes/explorer/theme',
    'jscf'         : 'jslib/index',
    'jmask'        : '/bower_components/jquery-mask-plugin/dist/jquery.mask',
    // </include_custom_paths>

    // <include_paths>

    'handlebars': '/bower_components/handlebars/handlebars.amd',
    'jquery': '/bower_components/jquery/dist/jquery',
    'bootstrap': '/bower_components/bootstrap/dist/js/bootstrap',
    'moment': '/bower_components/moment/moment',
    'underscore': '/bower_components/underscore/underscore',
    'lightslider': '/bower_components/lightslider/dist/js/lightslider',
    'cart': 'js/compiled-templates/cart',
    'item': 'js/compiled-templates/item',
    'searchpage': 'js/compiled-templates/searchpage',
    'sell': 'js/compiled-templates/sell',
    'toppage': 'js/compiled-templates/toppage',
    'user': 'js/compiled-templates/user',
    'viewCartItems': 'js/cart/modules/viewCartItems',
    'constants': 'js/constants/modules/constants',
    'itemView': 'js/item/modules/itemView',
    'sellItem': 'js/sell/modules/sellItem',
    'homepage': 'js/toppage/modules/homepage',
    'homepageBindings': 'js/toppage/modules/homepageBindings',
    'mainHeader': 'js/toppage/modules/mainHeader',
    'homeAppliancesWidget': 'js/toppage/modules/widgets/homeAppliancesWidget',
    'laptopsAndDesktopsWidget': 'js/toppage/modules/widgets/laptopsAndDesktopsWidget',
    'newArrivalsWidget': 'js/toppage/modules/widgets/newArrivalsWidget',
    'loginUtils': 'js/utils/modules/loginUtils',
    'viewCartItemsCtrl': 'js/controllers/cart/viewCartItemsCtrl',
    'itemViewCtrl': 'js/controllers/item/itemViewCtrl',
    'homepageWidgetsCtrl': 'js/controllers/toppage/homepageWidgetsCtrl',
    // </include_paths>
  },
});
