import consola from 'consola'

export default defineEventHandler((event) => {
  const requestPath = event.path

  if (
    requestPath.match(/^\/(de\/)?(account|contact|event|task|upload)(s)(.*)/)
  ) {
    consola.log('Middleware plural used!')
    return sendRedirect(
      event,
      requestPath.replace(
        /^\/(de\/)?(account|contact|event|task|upload)(s)(.*)/,
        (_a, b, c, _d, e) => `/${b || ''}${c || ''}${e || ''}`,
      ),
      302,
    )
  }

  if (requestPath.match(/^\/(de\/)?tasks\/(account|event)(s)(.*)/)) {
    consola.log('Middleware plural used!')
    return sendRedirect(
      event,
      requestPath.replace(
        /^\/(de\/)?tasks\/(account|event)(.*)/,
        (_a, b, c, _d, e) => `/${b || ''}tasks/${c || ''}${e || ''}`,
      ),
      302,
    )
  }

  if (
    requestPath.match(
      /^\/(de\/)?event\/view\/([^/]+)\/([^/]+)\/(attendance|invitation)(s)(.*)/,
    )
  ) {
    consola.log('Middleware plural used!')
    return sendRedirect(
      event,
      requestPath.replace(
        /^\/(de\/)?event\/view\/([^/]+)\/([^/]+)\/(attendance|invitation)(s)(.*)/,
        (_a, b, c, d, e, _f, g) =>
          `/${b || ''}event/view/${c || ''}/${d || ''}/${e || ''}${g || ''}`,
      ),
      302,
    )
  }

  if (requestPath.match(/^\/(de\/)?task\/events\/unlock/)) {
    consola.log('Middleware plural used!')
    return sendRedirect(
      event,
      requestPath.replace(
        /^\/(de\/)?task\/events\/unlock/,
        (_a, b) => `/${b || ''}invitation/unlock`,
      ),
      302,
    )
  }

  if (requestPath.match(/^\/(de\/)?task\/accounts\/email-address\/verify/)) {
    consola.log('Middleware plural used!')
    return sendRedirect(
      event,
      requestPath.replace(
        /^\/(de\/)?task\/accounts\/email-address\/verify/,
        (_a, b) => `/${b || ''}account/verify`,
      ),
      302,
    )
  }
})
