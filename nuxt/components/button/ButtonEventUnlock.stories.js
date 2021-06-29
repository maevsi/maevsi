import ButtonEventUnlock from './ButtonEventUnlock.vue'

export default {
  component: ButtonEventUnlock,
  title: 'button/ButtonEventUnlock',
  argTypes: { click: { action: 'click' } },
}

const Template = (_, { argTypes }) => ({
  components: { ButtonEventUnlock },
  props: Object.keys(argTypes),
  template:
    // eslint-disable-next-line @intlify/vue-i18n/no-raw-text
    '<ButtonEventUnlock v-bind="$props" @click="click">ButtonEventUnlock</ButtonEventUnlock>',
})

export const Default = Template.bind({})
