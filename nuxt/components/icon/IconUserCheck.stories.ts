import { defineComponent } from '#app'
import IconUserCheck from './IconUserCheck.vue'

const argTypes = { click: { action: 'click' } }
type ArgTypesType = { argTypes: typeof argTypes }

export default {
  component: IconUserCheck,
  title: 'icon/IconUserCheck',
  argTypes,
}

const Template = (_: never, { argTypes }: ArgTypesType) =>
  defineComponent({
    components: { IconUserCheck },
    props: Object.keys(argTypes),
    template:
      // eslint-disable-next-line @intlify/vue-i18n/no-raw-text
      '<IconUserCheck v-bind="$props" @click="click">IconUserCheck</IconUserCheck>',
  })

export const Default = Template.bind({})
