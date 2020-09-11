module.exports = {
  theme: {
    animations: {
      shake: {
        '0%': {
          transform: 'translateX(0)'
        },
        '15%': {
          transform: 'translateX(0.375rem)'
        },
        '30%': {
          transform: 'translateX(-0.375rem)'
        },
        '45%': {
          transform: 'translateX(0.375rem)'
        },
        '60%': {
          transform: 'translateX(-0.375rem)'
        },
        '75%': {
          transform: 'translateX(0.375rem)'
        },
        '90%': {
          transform: 'translateX(-0.375rem)'
        },
        '100%': {
          transform: 'translateX(0)'
        }
      }
    },
    extend: {
      animationDuration: {
        fast: '0.6s'
      },
      screens: {
        'dark-mode': { raw: '(prefers-color-scheme: dark)' }
      }
    }
  },
  variants: {
    margin: ['last', 'responsive']
  },
  plugins: [
    require('tailwindcss-animations'),
    function ({ addBase, addComponents, addUtilities, config }) {
      addBase({
        '@font-face': {
          fontFamily: 'Montserrat',
          src: "local('Montserrat Medium'), local('Montserrat-Medium'), url(/assets/static/fonts/montserrat/montserrat-medium.woff2) format('woff2')",
          unicodeRange: 'U+0000-00FF, U+0131, U+0152-0153, U+02BB-02BC, U+02C6, U+02DA, U+02DC, U+2000-206F, U+2074, U+20AC, U+2122, U+2191, U+2193, U+2212, U+2215, U+FEFF, U+FFFD'
        },
        '::selection': {
          color: config('theme.colors.white'),
          background: '#e53e3e'
        },
        body: {
          background: '#f0f0f0',
          '@screen dark-mode': {
            background: '#202020'
          }
        },
        h1: {
          fontSize: config('theme.fontSize.4xl'),
          marginBottom: config('theme.margin.4'),
          fontFamily: 'Montserrat',
          fontWeight: config('theme.fontWeight.bold'),
          overflow: 'hidden',
          textOverflow: 'ellipsis',
          whiteSpace: 'nowrap'
        },
        h2: {
          fontSize: config('theme.fontSize.3xl'),
          fontFamily: 'Montserrat',
          fontWeight: config('theme.fontWeight.bold'),
          marginBottom: config('theme.margin.4')
        },
        ':disabled': {
          cursor: config('theme.cursor.not-allowed'),
          opacity: config('theme.opacity.50')
        }
      })
      addComponents({
        '.description': {
          a: {
            color: config('theme.colors.blue.700')
          },
          p: {
            margin: config('theme.margin.2') + ' ' + config('theme.margin.0')
          }
        },
        '.dropdown-content': {
          display: 'none',
          '>*': {
            display: 'block'
          }
        },
        '.dropdown': {
          '&:hover': {
            '.dropdown-content': {
              display: 'block'
            }
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
        '.form-input-error': {
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
          animationFillMode: config('theme.animationFillMode.forwards'),
          animationDuration: config('theme.animationDuration.fast'),
          animationTimingFunction: config('theme.animationTimingFunction.ease-in-out')
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
            borderColor: config('theme.colors.purple.500')
          }
        },
        '.pills': {
          display: 'flex',
          justifyContent: 'space-between',
          li: {
            width: config('theme.width.full'),
            button: {
              color: config('theme.colors.black'),
              fontWeight: config('theme.fontWeight.semibold'),
              padding: config('theme.spacing.2') + ' ' + config('theme.spacing.4'),
              width: config('theme.width.full')
            }
          }
        }
      })
      addUtilities({
        '.bg-half-transparent': {
          backgroundColor: 'rgba(0, 0, 0, 0.5)'
        },
        '.disabled': {
          cursor: config('theme.cursor.not-allowed'),
          opacity: config('theme.opacity.50')
        },
        '.e1': {
          gridRow: '1',
          gridColumn: '1'
        },
        '.inline-grid': {
          display: 'inline-grid'
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
  ],
  purge: {
    content: [
      'components/**/*.vue',
      'layouts/**/*.vue',
      'pages/**/*.vue',
      'plugins/**/*.js',
      'nuxt.config.js'
    ],
    options: {
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
