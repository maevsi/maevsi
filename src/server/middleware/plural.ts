export default defineEventHandler((event) => {
  const requestPath = event.path

  if (requestPath.match(/^\/(account|contact|event|task|upload)\//)) {
    return sendRedirect(
      event,
      requestPath.replace(
        /^\/(account|contact|event|task|upload)(.*)/,
        (_a, b, c) => `/${b}s${c}`,
      ),
      302,
    )
  }

  if (requestPath.match(/^\/tasks\/(account|event)\//)) {
    return sendRedirect(
      event,
      requestPath.replace(
        /^\/tasks\/(account|event)(.*)/,
        (_a, b, c) => `/tasks/${b}s${c}`,
      ),
      302,
    )
  }
})
