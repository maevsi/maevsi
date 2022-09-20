import { defineComponent } from 'vue'
import FormInputPassword from './FormInputPassword.vue'

export default {
  component: FormInputPassword,
  title: 'form/input/FormInputPassword',
}

const Template = (_: never, { argTypes }: any) =>
  defineComponent({
    components: { FormInputPassword },
    props: Object.keys(argTypes),
    template:
      '<FormInputPassword v-bind="$props">FormInputPassword</FormInputPassword>',
  })

export const Default = Template.bind({})
// @ts-ignore
Default.args = {
  id: 'id',
  formInput: {},
}
