import ButtonHome from './ButtonHome.vue'

export default {
  component: ButtonHome,
  title: 'button/ButtonHome',
  argTypes: { click: { action: 'click' } },
}

const Template = (_, { argTypes }) => ({
  components: { ButtonHome },
  props: Object.keys(argTypes),
  template:
    // eslint-disable-next-line @intlify/vue-i18n/no-raw-text
    '<ButtonHome v-bind="$props" @click="click">ButtonHome</ButtonHome>',
})

export const Default = Template.bind({})
