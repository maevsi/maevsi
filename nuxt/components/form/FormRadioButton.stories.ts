import FormRadioButton from './FormRadioButton.vue'
import { defineComponent } from '#app'

export default {
  component: FormRadioButton,
  title: 'form/FormRadioButton',
}

const Template = (_: never, { argTypes }: any) =>
  defineComponent({
    components: { FormRadioButton },
    props: Object.keys(argTypes),
    template:
      // eslint-disable-next-line @intlify/vue-i18n/no-raw-text
      '<FormRadioButton v-bind="$props">FormRadioButton</FormRadioButton>',
  })

export const Default = Template.bind({})
// @ts-ignore
Default.args = {
  title: 'title',
  value: 'value',
}
