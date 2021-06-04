module.exports = {
  ...(process.env.SELENIUM_ENV === 'dedicated' && {
    gridUrl: 'http://127.0.0.1:4444/wd/hub',
  }),
}
