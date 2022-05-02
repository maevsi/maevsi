import { ServerMiddleware } from '@nuxt/types-edge'

const myServerMiddleware: ServerMiddleware = function (_req, res, next) {
  res.setHeader('Permissions-Policy', '')
  // // Disabled until there is better browser support (https://caniuse.com/?search=report-to)
  // res.setHeader(
  //   'Report-To',
  //   '{"group":"default","max_age":31536000,"endpoints":[{"url":"https://dargmuesli.report-uri.com/a/d/g"}],"include_subdomains":true}'
  // )
  next()
}

export default myServerMiddleware
