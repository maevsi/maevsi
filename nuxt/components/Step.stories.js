import Step from './Step.vue'

export default {
  component: Step,
  title: 'Step',
}

const Template = (_, { argTypes }) => ({
  components: { Step },
  props: Object.keys(argTypes),
  // eslint-disable-next-line @intlify/vue-i18n/no-raw-text
  template: '<Step v-bind="$props">Step</Step>',
})

export const Default = Template.bind({})
Default.args = {
  title: 'Title',
  number: 1,
  description: 'Description',
}
