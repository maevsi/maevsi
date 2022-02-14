import AppLink from './AppLink.vue'
import { defineComponent } from '#app'

const argTypes = { click: { action: 'click' } }
type ArgTypesType = { argTypes: typeof argTypes }

export default {
  component: AppLink,
  title: 'AppLink',
  argTypes,
}

const Template = (_: never, { argTypes }: ArgTypesType) =>
  defineComponent({
    components: { AppLink },
    props: Object.keys(argTypes),
    // eslint-disable-next-line @intlify/vue-i18n/no-raw-text
    template: '<AppLink v-bind="$props" @click="click">AppLink</AppLink>',
  })

export const Default = Template.bind({})
// @ts-ignore
Default.args = {
  to: '/',
}

export const External = Template.bind({})
// @ts-ignore
External.args = {
  to: 'https://example.com',
}
