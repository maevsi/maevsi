const path = require('path');

module.exports = {
  browsers: {
    chrome640: {
      browserName: 'chrome',
      viewport: { height: 1020, width: 640 },
    },
    firefox1280: {
      browserName: 'firefox',
      viewport: { height: 1020, width: 1280 },
    }
  },
  diffOptions: { threshold: 0.11 },
  failFast: process.env.CI ? true : false,
  gridUrl: `http://${process.env.HOST_IP || '127.0.0.1'}:4444/wd/hub`, // Always use a dedicated selenium instance, startable by a package.json script, instead of Creevey's own Selenoid for reproducible builds.
  reportDir: path.join(__dirname, './report'),
  screenDir: path.join(__dirname, './images'),
  storybookUrl: `http://127.0.0.1:6006`,
}
