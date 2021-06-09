import Header from './Header.vue'

export default {
  component: Header,
  title: 'Header',
}

const Template = (_, { argTypes }) => ({
  components: { Header },
  props: Object.keys(argTypes),
  template: '<Header v-bind="$props">Header</Header>',
})

export const Default = Template.bind({})
