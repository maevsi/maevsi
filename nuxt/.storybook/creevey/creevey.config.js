module.exports = {
  gridUrl: `http://${process.env.HOST_IP || '127.0.0.1'}:4444/wd/hub`, // Always use a dedicated selenium instance, startable by a package.json script, instead of Creevey's own Selenoid for reproducible builds.
}
