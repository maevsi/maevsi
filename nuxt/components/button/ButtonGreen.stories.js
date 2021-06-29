import ButtonGreen from './ButtonGreen.vue'

export default {
  component: ButtonGreen,
  title: 'button/ButtonGreen',
  argTypes: { click: { action: 'click' } },
}

const Template = (_, { argTypes }) => ({
  components: { ButtonGreen },
  props: Object.keys(argTypes),
  template:
    // eslint-disable-next-line @intlify/vue-i18n/no-raw-text
    '<ButtonGreen v-bind="$props" @click="click">ButtonGreen</ButtonGreen>',
})

export const Default = Template.bind({})
