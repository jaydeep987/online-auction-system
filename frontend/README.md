## About ##
This is frontend part of application. It contains all front-end technologies which are intended to use and make development fast and easy.

## How to start with project ? ##
For development purpose, you need to install `node.js` in your system. After that go to this project directory and use following commands:
  - `npm i -g yarn grunt-cli`
  - `yarn`

**To build project:**  
  - `grunt`
  * Before build, you need to make sure two things:
    - 1. Modify path in `app/jslib/index.js`, like this: change from `app/jslib/utils/index` to `./jslib/utils/index`

**To run in browser:**  
Before you do so, you need to set your machine's IP address in `package.json` file, under `serverHost`. This will be automated soon but till that you need to do manually. After than execute following:
  - `grunt serve`

**For production build:**
  - `grunt build`
  * Before build, you need to make sure two things:
    - 1. Modify path in `app/jslib/index.js`, like this: change from `./jslib/utils/index` to `app/jslib/utils/index`
    - 2. In `app/js/constants/modules/constants.js`, provide your `API_URL` correctly.

To run production build in browser:
  - `grunt serve --directory dist`