import FormRadioButtonGroup from './FormRadioButtonGroup.vue'

export default {
  component: FormRadioButtonGroup,
  title: 'form/FormRadioButtonGroup',
}

const Template = (_, { argTypes }) => ({
  components: { FormRadioButtonGroup },
  props: Object.keys(argTypes),
  template:
    // eslint-disable-next-line @intlify/vue-i18n/no-raw-text
    '<FormRadioButtonGroup v-bind="$props">FormRadioButtonGroup</FormRadioButtonGroup>',
})

export const Default = Template.bind({})
Default.args = {
  titlesValues: ['a', 'b'],
}
