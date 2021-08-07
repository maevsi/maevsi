export * from '~~/.nuxt-storybook/storybook/preview.js'

import { addDecorator } from '@storybook/vue'
import { initialize, mswDecorator } from 'msw-storybook-addon'

initialize()
addDecorator(mswDecorator)
