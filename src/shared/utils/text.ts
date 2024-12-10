import { htmlToText } from 'html-to-text'

export const getStringTruncated = ({
  string,
  limit,
  isLastWordIncluded = false,
}: {
  string: string
  limit: number
  isLastWordIncluded?: boolean
}) => {
  if (string.length <= limit) return string
  const subString = string.slice(0, limit - 1)
  return (
    (isLastWordIncluded
      ? subString.slice(0, subString.lastIndexOf(' '))
      : subString) + ' …'
  )
}

export const getTextFromHtml = (html: string) =>
  htmlToText(html, {
    selectors: [
      { selector: 'a', options: { ignoreHref: true } },
      { selector: 'img', format: 'skip' },
    ],
  })
