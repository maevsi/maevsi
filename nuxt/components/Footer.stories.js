import Footer from './Footer.vue'

export default {
  component: Footer,
  title: 'Footer',
}

const Template = (_, { argTypes }) => ({
  components: { Footer },
  props: Object.keys(argTypes),
  // eslint-disable-next-line @intlify/vue-i18n/no-raw-text
  template: '<Footer v-bind="$props">Footer</Footer>',
})

export const Default = Template.bind({})
