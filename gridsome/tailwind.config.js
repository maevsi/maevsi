module.exports = {
  theme: {
    extend: {}
  },
  variants: {},
  plugins: [
    function ({ addBase, addComponents, config }) {
      addBase({
        a: {
          outline: 0
        },
        body: {
          background: 'linear-gradient(#34a1f0, #695bc0) fixed'
        },
        h1: {
          fontSize: config('theme.fontSize.2xl'),
          marginBottom: config('theme.margin.4'),
          fontWeight: config('theme.fontWeight.bold')
        },
        h2: {
          fontSize: config('theme.fontSize.xl'),
          marginBottom: config('theme.margin.4'),
          fontWeight: config('theme.fontWeight.bold')
        }
        /* 'h3': { fontSize: config('theme.fontSize.lg') }, */
      })
      addComponents({
        ':disabled': {
          cursor: config('theme.cursor.not-allowed'),
          opacity: config('theme.opacity.50')
        },
        '.alert': {
          backgroundColor: config('theme.colors.red.100'),
          borderWidth: config('theme.borderWidth.default'),
          borderColor: config('theme.colors.red.400'),
          color: config('theme.colors.red.700'),
          padding: config('theme.padding.3') + ' ' + config('theme.padding.4'),
          borderRadius: config('theme.borderRadius.default'),
          position: 'relative'
        },
        '.btn': {
          boxShadow: config('theme.boxShadow.default'),
          margin: config('theme.margin.4'),
          padding: config('theme.padding.2') + ' ' + config('theme.padding.4'),
          borderRadius: config('theme.borderRadius.full'),
          fontWeight: config('theme.fontWeight.bold'),
          '&:focus': {
            boxShadow: config('theme.boxShadow.outline'),
            outline: 0
          }
        },
        '.btn-green': {
          backgroundColor: config('theme.colors.green.600'),
          '&:hover': {
            backgroundColor: config('theme.colors.green.700')
          }
        },
        '.btn-red': {
          backgroundColor: config('theme.colors.red.600'),
          '&:hover': {
            backgroundColor: config('theme.colors.red.700')
          },
          '&:disabled': {
            backgroundColor: config('theme.colors.red.600')
          }
        },
        '.description': {
          a: {
            color: config('theme.colors.blue.700')
          },
          p: {
            margin: config('theme.margin.2') + ' ' + config('theme.margin.0')
          }
        },
        '.disabled': {
          cursor: config('theme.cursor.not-allowed'),
          opacity: config('theme.opacity.50')
        },
        '.e1': {
          gridRow: '1',
          gridColumn: '1'
        },
        '.event-meta': {
          color: config('theme.colors.gray.600'),
          div: {
            margin: config('theme.margin.2') + ' ' + config('theme.margin.0')
          }
        },
        '.flip-card': {
          perspective: '1000px'
        },
        '.flip-card-inner': {
          transition: 'transform 0.7s',
          transformStyle: 'preserve-3d'
        },
        '.flip-card.flipped .flip-card-inner': {
          transform: 'rotateY(180deg)'
        },
        '.flip-card-front, .flip-card-back': {
          backfaceVisibility: 'hidden'
        },
        '.flip-card-front': {
          transform: 'rotateY(0deg)'
        },
        '.flip-card-back': {
          transform: 'rotateY(180deg)'
        },
        '.form': {
          backgroundColor: config('theme.colors.white'),
          boxShadow: config('theme.boxShadow.md'),
          borderRadius: config('theme.borderRadius.default'),
          marginBottom: config('theme.margin.4'),
          padding: config('theme.padding.6') + ' ' + config('theme.padding.8') + ' ' + config('theme.padding.8') + ' ' + config('theme.padding.8'),
          '&.error': {
            borderColor: config('theme.colors.red.500'),
            borderWidth: config('theme.borderWidth.default')
          }
        },
        '.form-error': {
          input: {
            borderColor: config('theme.colors.red.500'),
            '&:focus': {
              borderColor: config('theme.colors.red.500')
            }
          },
          label: {
            color: config('theme.colors.red.500')
          }
        },
        '.shake': {
          animationName: 'shake',
          animationFillMode: 'forwards',
          animationDuration: '0.6s',
          animationTimingFunction: 'ease-in-out'
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
          }
        },
        '.form-label': {
          color: config('theme.colors.gray.600'),
          display: 'block',
          fontWeight: config('theme.fontWeight.semibold'),
          paddingRight: config('theme.padding.4')
        },
        '.pills': {
          display: 'flex',
          justifyContent: 'space-between',
          li: {
            width: config('theme.width.full'),
            button: {
              color: config('theme.colors.black'),
              fontWeight: config('theme.fontWeight.semibold'),
              outline: 0,
              padding: config('theme.spacing.2') + ' ' + config('theme.spacing.4'),
              width: config('theme.width.full')
            }
          }
        },
        '.td': {
          borderWidth: config('theme.borderWidth.default'),
          padding: config('theme.padding.2') + ' ' + config('theme.padding.4')
        },
        '.translate-x-100': {
          transform: 'translateX(100%)'
        },
        '.th': {
          padding: config('theme.padding.2') + ' ' + config('theme.padding.4')
        },
        '.line-clamp-box': {
          display: '-webkit-box',
          overflow: 'hidden',
          textOverflow: 'ellipsis',
          '-webkit-box-orient': 'vertical'
        },
        '.line-clamp-2': {
          '-webkit-line-clamp': '2'
        }
      })
    }
  ]
}
