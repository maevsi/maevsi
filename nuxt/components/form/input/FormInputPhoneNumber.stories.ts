import { defineComponent } from 'vue'
import FormInputPhoneNumber from './FormInputPhoneNumber.vue'

export default {
  component: FormInputPhoneNumber,
  title: 'form/input/FormInputPhoneNumber',
}

const Template = (_: never, { argTypes }: any) =>
  defineComponent({
    components: { FormInputPhoneNumber },
    props: Object.keys(argTypes),
    template:
      '<FormInputPhoneNumber v-bind="$props">FormInputPhoneNumber</FormInputPhoneNumber>',
  })

export const Default = Template.bind({})
// @ts-ignore
Default.args = {
  formInput: {},
}
