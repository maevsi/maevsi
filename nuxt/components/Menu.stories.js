import Menu from './Menu.vue'

export default {
  component: Menu,
  title: 'Menu',
}

const Template = (_, { argTypes }) => ({
  components: { Menu },
  props: Object.keys(argTypes),
  // eslint-disable-next-line @intlify/vue-i18n/no-raw-text
  template: '<Menu v-bind="$props">Menu</Menu>',
})

export const Default = Template.bind({})
