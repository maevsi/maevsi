import Button from './Button.vue'

export default {
  component: Button,
  title: 'button/Button',
  argTypes: { click: { action: 'click' } },
}

const Template = (_, { argTypes }) => ({
  components: { Button },
  props: Object.keys(argTypes),
  // eslint-disable-next-line @intlify/vue-i18n/no-raw-text
  template: '<Button v-bind="$props" @click="click">Button</Button>',
})

export const Default = Template.bind({})

export const Disabled = Template.bind({})
Disabled.args = {
  disabled: true,
}
