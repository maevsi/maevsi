import { defineComponent } from '#app'
import IconEyeOff from './IconEyeOff.vue'

const argTypes = { click: { action: 'click' } }
type ArgTypesType = { argTypes: typeof argTypes }

export default {
  component: IconEyeOff,
  title: 'icon/IconEyeOff',
  argTypes,
}

const Template = (_: never, { argTypes }: ArgTypesType) =>
  defineComponent({
    components: { IconEyeOff },
    props: Object.keys(argTypes),
    template:
      // eslint-disable-next-line @intlify/vue-i18n/no-raw-text
      '<IconEyeOff v-bind="$props" @click="click">IconEyeOff</IconEyeOff>',
  })

export const Default = Template.bind({})
