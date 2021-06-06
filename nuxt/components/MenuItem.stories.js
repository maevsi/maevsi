import MenuItem from './MenuItem.vue'

export default {
  component: MenuItem,
  title: 'MenuItem',
}

const Template = (_, { argTypes }) => ({
  components: { MenuItem },
  props: Object.keys(argTypes),
  template: '<MenuItem v-bind="$props">MenuItem</MenuItem>',
})

export const Default = Template.bind({})
