import { htmlToText } from 'html-to-text'

export default (_, inject) => {
  inject('htmlToText', htmlToText)
}
