module.exports = {
  theme: {
    extend: {}
  },
  variants: {},
  plugins: [
    function({ addBase, addComponents, config }) {
      addBase({
        'h1': { fontSize: config('theme.fontSize.2xl'),
                marginBottom: config('theme.margin.4') },
        /*'h2': { fontSize: config('theme.fontSize.xl') },
        'h3': { fontSize: config('theme.fontSize.lg') },*/
      }),
      addComponents({
        '.btn': {
          boxShadow: config('theme.boxShadow.default'),
          margin: config('theme.margin.4'),
          padding: config('theme.padding.2') + ' ' + config('theme.padding.4'),
          borderRadius: config('theme.borderRadius.full'),
          fontWeight: config('theme.fontWeight.bold'),
          '&:focus': {
            boxShadow: config('theme.boxShadow.outline'),
            outline: 0
          },
        },
        '.btn-red': {
          backgroundColor: config('theme.colors.red.600'),
          '&:hover': {
            backgroundColor: config('theme.colors.red.700')
          },
        },
        '.form': {
          backgroundColor: config('theme.colors.white'),
          boxShadow: config('theme.boxShadow.md'),
          borderRadius: config('theme.borderRadius.default'),
          marginBottom: config('theme.margin.4'),
          padding: config('theme.padding.6') + ' ' + config('theme.padding.8') + ' ' + config('theme.padding.8') + ' ' + config('theme.padding.8'),
        },
        '.form-input': {
          appearance: 'none',
          backgroundColor: config('theme.colors.gray.200'),
          borderColor: config('theme.colors.gray.200'),
          borderRadius: config('theme.borderRadius.default'),
          borderWidth: config('theme.borderWidth.2'),
          color: config('theme.colors.gray.700'),
          lineHeight: config('theme.lineHeight.tight'),
          padding: config('theme.padding.2') + ' ' + config('theme.padding.4'),
          width: config('theme.width.full'),
          '&:focus': {
            backgroundColor: config('theme.colors.white'),
            borderColor: config('theme.colors.purple.500'),
            outline: 0
          },
        },
        '.form-label': {
          color: config('theme.colors.gray.500'),
          display: 'block',
          fontWeight: config('theme.fontWeight.bold'),
          paddingRight: config('theme.padding.4'),
        },
        '.td': {
          borderWidth: config('theme.borderWidth.default'),
          padding: config('theme.padding.2') + ' ' + config('theme.padding.4'),
        },
        '.th': {
          padding: config('theme.padding.2') + ' ' + config('theme.padding.4'),
        }
      })
    },
  ]

}
