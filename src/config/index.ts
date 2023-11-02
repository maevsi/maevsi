import type { DefineNuxtConfig } from 'nuxt/config'

import { environmentsConfig } from './environments'
import { modulesConfig } from './modules'

export const config: ReturnType<DefineNuxtConfig> = {
  ...modulesConfig,
  ...environmentsConfig,
}
