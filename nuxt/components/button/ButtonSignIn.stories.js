import ButtonSignIn from './ButtonSignIn.vue'

export default {
  component: ButtonSignIn,
  title: 'button/ButtonSignIn',
  argTypes: { click: { action: 'click' } },
}

const Template = (_, { argTypes }) => ({
  components: { ButtonSignIn },
  props: Object.keys(argTypes),
  template:
    // eslint-disable-next-line @intlify/vue-i18n/no-raw-text
    '<ButtonSignIn v-bind="$props" @click="click">ButtonSignIn</ButtonSignIn>',
})

export const Default = Template.bind({})
