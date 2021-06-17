import MenuItem from './MenuItem.vue'

export default {
  component: MenuItem,
  title: 'MenuItem',
}

const Template = (_, { argTypes }) => ({
  components: { MenuItem },
  props: Object.keys(argTypes),
  // eslint-disable-next-line @intlify/vue-i18n/no-raw-text
  template: '<MenuItem v-bind="$props">MenuItem</MenuItem>',
})

export const Default = Template.bind({})
