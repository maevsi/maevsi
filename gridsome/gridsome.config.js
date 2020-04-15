// This is where project configuration and plugin options are located.
// Learn more: https://gridsome.org/docs/config

// Changes here require a server restart.
// To restart press CTRL + C in terminal and run `gridsome develop`

module.exports = {
  icon: './src/assets/maevsi.svg',
  siteDescription: 'A manager for events supported by invitees.',
  siteName: 'mævsi',
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
      use: 'gridsome-plugin-tailwindcss',
      options: {
        purgeConfig: {
          content: [
            'src/assets/**/*.css',
            './src/**/*.vue',
            './src/**/*.js',
            './src/**/*.jsx',
            './src/**/*.ts',
            './src/**/*.tsx',
            './src/**/*.html',
            './src/**/*.pug',
            './src/**/*.md',
            './src/**/*.svg'
          ],
          whitelist: [
            'body',
            'html',
            'img',
            'a',
            'g-image',
            'g-image--lazy',
            'g-image--loaded',
            'active',
            'active--exact',
            'svg-inline--fa'
          ],
          whitelistPatterns: [/fa-/],
          defaultExtractor: content => content.match(/[A-Za-z0-9-_:/]+/g) || []
        }
      }
    }
  ]
}
