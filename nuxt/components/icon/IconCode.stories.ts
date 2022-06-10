import { defineComponent } from '#app'
import IconCode from './IconCode.vue'

const argTypes = { click: { action: 'click' } }
type ArgTypesType = { argTypes: typeof argTypes }

export default {
  component: IconCode,
  title: 'icon/IconCode',
  argTypes,
}

const Template = (_: never, { argTypes }: ArgTypesType) =>
  defineComponent({
    components: { IconCode },
    props: Object.keys(argTypes),
    template:
      // eslint-disable-next-line @intlify/vue-i18n/no-raw-text
      '<IconCode v-bind="$props" @click="click">IconCode</IconCode>',
  })

export const Default = Template.bind({})
