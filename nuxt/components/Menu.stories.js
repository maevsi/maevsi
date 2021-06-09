import Menu from './Menu.vue'

export default {
  component: Menu,
  title: 'Menu',
}

const Template = (_, { argTypes }) => ({
  components: { Menu },
  props: Object.keys(argTypes),
  template: '<Menu v-bind="$props">Menu</Menu>',
})

export const Default = Template.bind({})
