const defaultTheme = require('tailwindcss/defaultTheme')

function heading(theme) {
  return {
    fontWeight: theme('fontWeight.bold'),
    marginBottom: theme('margin.1'),
    marginTop: theme('margin.4'),
    overflow: 'hidden',
    textOverflow: 'ellipsis',
  }
}

function prose(theme) {
  return {
    css: {
      color: theme('colors.text.dark'),
      a: {
        color: theme('colors.link.dark'),
        textDecoration: 'none',
      },
      h1: {
        lineHeight: theme('lineHeight.snug'),
      },
      h2: {
        lineHeight: theme('lineHeight.snug'),
      },
      h3: {
        lineHeight: theme('lineHeight.snug'),
      },
      h4: {
        lineHeight: theme('lineHeight.snug'),
      },
      h5: {
        lineHeight: theme('lineHeight.snug'),
      },
      h6: {
        lineHeight: theme('lineHeight.snug'),
      },
    },
  }
}

module.exports = {
  darkMode: 'class',
  mode: 'jit',
  theme: {
    extend: {
      animation: {
        shake: 'shake 0.6s ease-in-out 0s 1 normal forwards running',
      },
      boxShadow: {
        'sm-white': '0 1px 2px 0 rgba(255, 255, 255, 0.05)',
      },
      colors: {
        background: {
          body: '#282828',
          bright: '#f0f0f0',
          dark: '#202020',
        },
        link: {
          bright: defaultTheme.colors.blue['400'],
          dark: defaultTheme.colors.blue['700'],
        },
        text: {
          bright: defaultTheme.colors.gray['50'],
          dark: defaultTheme.colors.gray['900'],
        },
      },
      fontFamily: {
        sans: ['Manrope', ...defaultTheme.fontFamily.sans],
      },
      keyframes: {
        shake: {
          '0%': {
            transform: 'translateX(0)',
          },
          '15%': {
            transform: 'translateX(0.375rem)',
          },
          '30%': {
            transform: 'translateX(-0.375rem)',
          },
          '45%': {
            transform: 'translateX(0.375rem)',
          },
          '60%': {
            transform: 'translateX(-0.375rem)',
          },
          '75%': {
            transform: 'translateX(0.375rem)',
          },
          '90%': {
            transform: 'translateX(-0.375rem)',
          },
          '100%': {
            transform: 'translateX(0)',
          },
        },
      },
      typography: (theme) => ({
        sm: prose(theme),
        DEFAULT: prose(theme),
        lg: prose(theme),
        xl: prose(theme),
        '2xl': prose(theme),
        dark: {
          css: {
            color: theme('colors.text.bright'),
            a: {
              color: theme('colors.link.bright'),
            },
            h1: {
              color: theme('colors.text.bright'),
            },
            h2: {
              color: theme('colors.text.bright'),
            },
            h3: {
              color: theme('colors.text.bright'),
            },
            h4: {
              color: theme('colors.text.bright'),
            },
            h5: {
              color: theme('colors.text.bright'),
            },
            h6: {
              color: theme('colors.text.bright'),
            },
            strong: {
              color: theme('colors.text.bright'),
            },
            '.card &': {
              color: theme('colors.text.dark'),
              a: {
                color: theme('colors.link.dark'),
              },
              h1: {
                color: theme('colors.text.dark'),
              },
              h2: {
                color: theme('colors.text.dark'),
              },
              h3: {
                color: theme('colors.text.dark'),
              },
              h4: {
                color: theme('colors.text.dark'),
              },
              h5: {
                color: theme('colors.text.dark'),
              },
              h6: {
                color: theme('colors.text.dark'),
              },
              strong: {
                color: theme('colors.text.dark'),
              },
            },
          },
        },
      }),
    },
  },
  variants: {
    extend: {
      margin: ['last'],
      typography: ['dark'],
    },
  },
  plugins: [
    require('@tailwindcss/forms'),
    require('@tailwindcss/line-clamp'),
    require('@tailwindcss/typography'),
    function ({ addBase, addComponents, addUtilities, theme }) {
      addBase({
        ':disabled': {
          cursor: theme('cursor.not-allowed'),
          opacity: theme('opacity.50'),
        },
        '::placeholder': {
          fontStyle: 'italic',
          'input&,textarea&': {
            opacity: 0.5,
          },
        },
        '::selection': {
          color: theme('colors.text.bright'),
          background: '#e53e3e',
        },
        'a[target="_blank"]:after': {
          backgroundColor: 'currentColor',
          content: '""',
          display: 'inline-block',
          mask: 'url(data:image/svg+xml;base64,PHN2ZyBhcmlhLWhpZGRlbj0idHJ1ZSIgZm9jdXNhYmxlPSJmYWxzZSIgZGF0YS1wcmVmaXg9ImZhcyIgZGF0YS1pY29uPSJleHRlcm5hbC1saW5rLWFsdCIgY2xhc3M9InN2Zy1pbmxpbmUtLWZhIGZhLWV4dGVybmFsLWxpbmstYWx0IGZhLXctMTYiIHJvbGU9ImltZyIgeG1sbnM9Imh0dHA6Ly93d3cudzMub3JnLzIwMDAvc3ZnIiB2aWV3Qm94PSIwIDAgNTEyIDUxMiI+PHBhdGggZmlsbD0iY3VycmVudENvbG9yIiBkPSJNNDMyLDMyMEg0MDBhMTYsMTYsMCwwLDAtMTYsMTZWNDQ4SDY0VjEyOEgyMDhhMTYsMTYsMCwwLDAsMTYtMTZWODBhMTYsMTYsMCwwLDAtMTYtMTZINDhBNDgsNDgsMCwwLDAsMCwxMTJWNDY0YTQ4LDQ4LDAsMCwwLDQ4LDQ4SDQwMGE0OCw0OCwwLDAsMCw0OC00OFYzMzZBMTYsMTYsMCwwLDAsNDMyLDMyMFpNNDg4LDBoLTEyOGMtMjEuMzcsMC0zMi4wNSwyNS45MS0xNyw0MWwzNS43MywzNS43M0wxMzUsMzIwLjM3YTI0LDI0LDAsMCwwLDAsMzRMMTU3LjY3LDM3N2EyNCwyNCwwLDAsMCwzNCwwTDQzNS4yOCwxMzMuMzIsNDcxLDE2OWMxNSwxNSw0MSw0LjUsNDEtMTdWMjRBMjQsMjQsMCwwLDAsNDg4LDBaIj48L3BhdGg+PC9zdmc+) no-repeat 50% 50%',
          maskSize: 'cover',
          height: theme('fontSize.xs'),
          marginLeft: '5px',
          width: theme('fontSize.xs'),
        },
        address: {
          margin: theme('margin.4'),
        },
        h1: {
          ...heading(theme),
          fontSize: theme('fontSize.4xl'),
          marginBottom: theme('margin.4'),
          textAlign: 'center',
        },
        h2: {
          ...heading(theme),
          fontSize: theme('fontSize.3xl'),
        },
        h3: {
          ...heading(theme),
          fontSize: theme('fontSize.2xl'),
        },
        h4: {
          ...heading(theme),
          fontSize: theme('fontSize.xl'),
        },
        img: {
          '&::before': {
            alignItems: 'center',
            display: 'flex',
            height: '100%',
            justifyContent: 'center',
          },
        },
        table: {
          width: '100%',
        },
        tbody: {
          color: theme('colors.text.dark'),
          backgroundColor: theme('colors.white'),
        },
        td: {
          padding: theme('padding.4') + ' ' + theme('padding.6'),
          whiteSpace: 'nowrap',
        },
        thead: {
          backgroundColor: theme('colors.gray.50'),
        },
        th: {
          padding: theme('padding.3') + ' ' + theme('padding.6'),
          textAlign: 'left',
          fontSize: theme('fontSize.xs'),
          fontWeight: theme('fontWeight.medium'),
          textTransform: 'uppercase',
          letterSpacing: theme('letterSpacing.wider'),
          color: theme('colors.gray.500'),
        },
      })
      addComponents({
        '.flip-card': {
          perspective: '1000px',
        },
        '.flip-card-inner': {
          transition: 'transform 0.7s',
          transformStyle: 'preserve-3d',
        },
        '.flip-card.flipped .flip-card-inner': {
          transform: 'rotateY(180deg)',
        },
        '.flip-card-front, .flip-card-back': {
          backfaceVisibility: 'hidden',
        },
        '.flip-card-front': {
          transform: 'rotateY(-180deg)',
        },
        '.flip-card-back': {
          transform: 'rotateY(0deg)',
        },
        '.form-input': {
          appearance: 'none',
          backgroundColor: theme('colors.gray.50'),
          borderColor: theme('colors.gray.300'),
          borderRadius: theme('borderRadius.DEFAULT'),
          borderWidth: theme('borderWidth.DEFAULT'),
          boxShadow: theme('boxShadow.sm'),
          color: theme('colors.text.dark'),
          lineHeight: theme('lineHeight.tight'),
          padding: theme('padding.2') + ' ' + theme('padding.4'),
          width: theme('width.full'),
          '&:focus': {
            backgroundColor: theme('colors.white'),
          },
        },
        '.form-input-error': {
          input: {
            borderColor: theme('colors.red.500'),
          },
        },
        '.form-input-success': {
          input: {
            borderColor: theme('colors.green.600'),
          },
        },
        '.form-input-warning': {
          input: {
            borderColor: theme('colors.yellow.600'),
          },
        },
        '.pills': {
          display: 'flex',
          justifyContent: 'space-between',
          li: {
            width: theme('width.full'),
            button: {
              fontWeight: theme('fontWeight.semibold'),
              padding: theme('padding.2') + ' ' + theme('padding.4'),
              width: theme('width.full'),
            },
          },
        },
      })
      addUtilities({
        '.button-list': {
          margin: theme('margin.2') + ' ' + theme('margin.-2'),
          '> *': {
            margin: theme('margin.2'),
          },
        },
        '.disabled': {
          cursor: theme('cursor.not-allowed'),
          opacity: theme('opacity.50'),
        },
        '.e1': {
          gridRow: '1',
          gridColumn: '1',
        },
        '.flex-basis-auto': {
          flexBasis: 'auto',
        },
        '.flex-basis-33': {
          flexBasis: '33.333333%',
        },
        '.flex-basis-50': {
          flexBasis: '50%',
        },
        '.inline-grid': {
          display: 'inline-grid',
        },
        '.shadow-md-white': {
          '--tw-shadow':
            '0 4px 6px -1px rgba(255, 255, 255, 0.1), 0 2px 4px -1px rgba(255, 255, 255, 0.06)',
          boxShadow:
            'var(--tw-ring-offset-shadow, 0 0 #ffff), var(--tw-ring-shadow, 0 0 #ffff), var(--tw-shadow)',
        },
      })
    },
  ],
}
