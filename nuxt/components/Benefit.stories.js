import Benefit from './Benefit.vue'

export default {
  component: Benefit,
  title: 'Benefit',
}

const Template = (_, { argTypes }) => ({
  components: { Benefit },
  props: Object.keys(argTypes),
  template: '<Benefit v-bind="$props">Benefit</Benefit>',
})

export const Default = Template.bind({})
Default.args = {
  title: 'Title',
  iconPath: '/assets/static/logos/maevsi.svg',
  description: 'Description',
}
