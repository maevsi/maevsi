import { defineComponent } from '#app'
import IconSignIn from './IconSignIn.vue'

const argTypes = { click: { action: 'click' } }
type ArgTypesType = { argTypes: typeof argTypes }

export default {
  component: IconSignIn,
  title: 'icon/IconSignIn',
  argTypes,
}

const Template = (_: never, { argTypes }: ArgTypesType) =>
  defineComponent({
    components: { IconSignIn },
    props: Object.keys(argTypes),
    template:
      // eslint-disable-next-line @intlify/vue-i18n/no-raw-text
      '<IconSignIn v-bind="$props" @click="click">IconSignIn</IconSignIn>',
  })

export const Default = Template.bind({})
