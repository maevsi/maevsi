import { exec } from 'node:child_process'
import { promises as fs } from 'node:fs'
import { dirname, join } from 'node:path'
import { fileURLToPath } from 'node:url'
import { promisify } from 'node:util'

import { compareColors, stringToColor } from '@iconify/utils/lib/colors'
import {
  SVG,
  cleanupSVG,
  parseColors,
  runSVGO,
  deOptimisePaths,
} from '@iconify/tools'

const currentDir = dirname(fileURLToPath(import.meta.url))
const execPromise = promisify(exec)

export const RELEASE_NAME = async () =>
  process.env.RELEASE_NAME ||
  (await execPromise('git describe --tags')).stdout.trim()

export const IS_IN_PRODUCTION = process.env.NODE_ENV === 'production'
export const IS_IN_STACK = !!process.env.NUXT_PUBLIC_SITE_URL
export const IS_NITRO_OPENAPI_ENABLED =
  !!process.env.NUXT_IS_NITRO_OPENAPI_ENABLED || false
export const NUXT_PUBLIC_VIO_ENVIRONMENT = process.env.NODE_ENV
export const SITE_URL =
  process.env.SITE_URL ||
  process.env.NUXT_PUBLIC_SITE_URL ||
  `https://${process.env.HOST || 'localhost'}:${process.env.PORT || '3000'}`

export const iconCollectionOptimization =
  ({ isColored }: { isColored?: boolean }) =>
  async (name: string) => {
    const filePath = join(
      currentDir,
      `./app/assets/icons/${isColored ? 'colored/' : ''}${name}.svg`,
    )
    const content = await fs.readFile(filePath, 'utf8')
    const svg = new SVG(content)
    const blackColor = stringToColor('black')

    cleanupSVG(svg)
    parseColors(svg, {
      defaultColor: 'currentColor',
      callback: (attr, colorStr, color) => {
        if (!color) return colorStr

        if (blackColor && compareColors(color, blackColor))
          return 'currentColor'

        if (!isColored) {
          if (['none', 'current'].includes(color.type)) {
            return color
          }

          throw new Error(`Unexpected color "${colorStr}" in attribute ${attr}`)
        }

        return color
      },
    })
    runSVGO(svg)
    deOptimisePaths(svg)

    return svg.toMinifiedString({}) // first parameter must be set to change height to `1em`
  }
