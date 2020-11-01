const md = require('markdown-it')()

export default (_, inject) => {
  inject('md', md)
}
