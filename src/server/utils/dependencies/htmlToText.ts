import { htmlToText } from 'html-to-text'

const HTML_TO_TEXT_OPTIONS = {
  selectors: [
    { selector: 'a', options: { ignoreHref: true } },
    { selector: 'img', format: 'skip' },
  ],
}

export const HTML_TO_TEXT = (html: string) =>
  htmlToText(html, HTML_TO_TEXT_OPTIONS)
