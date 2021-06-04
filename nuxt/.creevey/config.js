module.exports = {
  // Specify custom Selenium Grid url (see usage below)
  // In most cases you don't need this option
  ...(process.env.DOCKER_ENV === "true" && {gridUrl: 'http://127.0.0.1:4444/wd/hub'})
}
