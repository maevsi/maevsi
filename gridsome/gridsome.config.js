// This is where project configuration and plugin options are located.
// Learn more: https://gridsome.org/docs/config

// Changes here require a server restart.
// To restart press CTRL + C in terminal and run `gridsome develop`

module.exports = {
  icon: './src/assets/isolated-layout.svg',
  siteDescription: 'A manager for user supported events.',
  siteName: 'maevsi',
  siteUrl: 'https://maev.si',
  plugins: [
    {
      use: 'gridsome-plugin-tailwindcss',
      options: {
        //tailwindConfig: './some/file/js',
        purgeConfig: {},
        presetEnvConfig: {},
        shouldPurge: true,
        shouldImport: true,
        shouldTimeTravel: true,
        shouldPurgeUnusedKeyframes: true,
      }
    }
  ]
}
