import { defineComponent } from 'vue'
import FormInputEmailAddress from './FormInputEmailAddress.vue'

export default {
  component: FormInputEmailAddress,
  title: 'form/input/FormInputEmailAddress',
}

const Template = (_: never, { argTypes }: any) =>
  defineComponent({
    components: { FormInputEmailAddress },
    props: Object.keys(argTypes),
    template:
      '<FormInputEmailAddress v-bind="$props">FormInputEmailAddress</FormInputEmailAddress>',
  })

export const Default = Template.bind({})
// @ts-ignore
Default.args = {
  formInput: {},
}
