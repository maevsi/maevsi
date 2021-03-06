import Header from './Header.vue'

export default {
  component: Header,
  title: 'Header',
}

const Template = (_, { argTypes }) => ({
  components: { Header },
  props: Object.keys(argTypes),
  // eslint-disable-next-line @intlify/vue-i18n/no-raw-text
  template: '<Header v-bind="$props">Header</Header>',
})

export const Default = Template.bind({})
