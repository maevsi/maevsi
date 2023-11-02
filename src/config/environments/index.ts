import type { DefineNuxtConfig } from 'nuxt/config'

import { developmentConfig } from './development'
import { productionConfig } from './production'

export const environmentsConfig: ReturnType<DefineNuxtConfig> = {
  ...developmentConfig,
  ...productionConfig,
}
