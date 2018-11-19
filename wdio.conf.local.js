const defaults = require('defaults-deep');
const defaultConfig = require('./automation/config/wdio.conf.default');
const path = require('path');

const cwd = path.resolve(__dirname);

const config = defaults({
  baseUrl: 'https://amazon.com',
  sync: false,
  capabilities: [{
    browserName: 'chrome',
    chromeOptions: {
      args: [`--load-extension=${cwd}`],
    }
  }],
  mochaOpts: {
    compilers: ['js:babel-register'] //allows es6 modules in tests.
  },
  suites: {
    bvt: [
      '**.func.js',
    ],
    unit: [
      '**.spec.js'
    ],
  },
  debug: true,
  reporters: ['dot'],
  reporterOptions: {
      allure: {
          outputDir: 'allure-results',
          disableWebdriverStepsReporting: true,
      }
  },
}, defaultConfig.config);

//console.log(config);

exports.config = config;
