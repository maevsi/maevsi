module.exports = {
  ...(process.env.SELENIUM_ENV === 'dedicated' && {
    gridUrl: `http://${
      process.env.CI === 'true' ? '172.17.0.1' : '127.0.0.1'
    }:4444/wd/hub`,
  }),
}
