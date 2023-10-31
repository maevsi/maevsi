export default defineEventHandler((event) => {
  const requestPath = event.path

  if (
    requestPath.match(
      /^\/(de\/)?(account|contact|event|task|upload)([^s]|$)(.*)/,
    )
  ) {
    return sendRedirect(
      event,
      requestPath.replace(
        /^\/(de\/)?(account|contact|event|task|upload)([^s]|$)(.*)/,
        (_a, b, c, d, e) => `/${b || ''}${c || ''}s${d || ''}${e || ''}`,
      ),
      302,
    )
  }

  if (requestPath.match(/^\/(de\/)?tasks\/(account|event)([^s]|$)(.*)/)) {
    return sendRedirect(
      event,
      requestPath.replace(
        /^\/(de\/)?tasks\/(account|event)(.*)/,
        (_a, b, c, d, e) => `/${b || ''}tasks/${c || ''}s${d || ''}${e || ''}`,
      ),
      302,
    )
  }

  if (
    requestPath.match(
      /^\/(de\/)?events\/([^/]+)\/([^/]+)\/(attendance|invitation)([^s]|$)(.*)/,
    )
  ) {
    return sendRedirect(
      event,
      requestPath.replace(
        /^\/(de\/)?events\/([^/]+)\/([^/]+)\/(attendance|invitation)([^s]|$)(.*)/,
        (_a, b, c, d, e, f, g) =>
          `/${b || ''}events/${c || ''}/${d || ''}/${e || ''}s${f || ''}${
            g || ''
          }`,
      ),
      302,
    )
  }
})
