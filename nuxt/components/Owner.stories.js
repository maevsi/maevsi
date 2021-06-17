import Owner from './Owner.vue'

export default {
  component: Owner,
  title: 'Owner',
}

const Template = (_, { argTypes }) => ({
  components: { Owner },
  props: Object.keys(argTypes),
  // eslint-disable-next-line @intlify/vue-i18n/no-raw-text
  template: '<Owner v-bind="$props">Owner</Owner>',
})

export const Default = Template.bind({})
Default.args = {
  username: 'Owner',
}

export const Linked = Template.bind({})
Linked.args = {
  ...Default.args,
  link: true,
}
