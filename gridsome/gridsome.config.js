// This is where project configuration and plugin options are located.
// Learn more: https://gridsome.org/docs/config

// Changes here require a server restart.
// To restart press CTRL + C in terminal and run `gridsome develop`

module.exports = {
  icon: './src/assets/maevsi.svg',
  siteDescription: 'A manager for events supported by invitees.',
  siteName: 'maevsi',
  siteUrl: 'https://maev.si',
  plugins: [
    {
      use: '@gridsome/plugin-critical',
      options: {
        paths: ['/'],
        width: 1300,
        height: 900
      }
    },
    {
      use: 'gridsome-plugin-tailwindcss'
    }
  ]
}
