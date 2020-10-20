import slugify from 'slugify'

export default (_, inject) => {
  inject('slugify', slugify)
}
