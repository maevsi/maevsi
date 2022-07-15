import { defineComponent } from '#app'
import IconTelescope from './IconTelescope.vue'

const argTypes = { click: { action: 'click' } }
type ArgTypesType = { argTypes: typeof argTypes }

export default {
  component: IconTelescope,
  title: 'icon/IconTelescope',
  argTypes,
}

const Template = (_: never, { argTypes }: ArgTypesType) =>
  defineComponent({
    components: { IconTelescope },
    props: Object.keys(argTypes),
    template:
      // eslint-disable-next-line @intlify/vue-i18n/no-raw-text
      '<IconTelescope v-bind="$props" @click="click">IconTelescope</IconTelescope>',
  })

export const Default = Template.bind({})
