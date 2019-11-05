// https://gridsome.org/docs/server-api/
// Changes here require a server restart.

module.exports = function (api) {
  api.loadSource(({ addCollection }) => {
    // Use the Data Store API here: https://gridsome.org/docs/data-store-api/
  })

  api.createPages(({ createPage }) => {
    // Use the Pages API here: https://gridsome.org/docs/pages-api/
    createPage({
      path: '/account/:account_name([A-Za-z0-9-_]+)',
      component: './src/templates/Account.vue'
    }),
    createPage({
      path: '/events/:event_series([A-Za-z0-9-_]+)',
      component: './src/templates/EventSeries.vue'
    }),
    createPage({
      path: '/events/:event_series([A-Za-z0-9-_]+)/:event_name([A-Za-z0-9-_]+)',
      component: './src/templates/Event.vue'
    })
  })
}
