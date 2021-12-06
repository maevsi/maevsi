import FormInputPassword from './FormInputPassword.vue'

import { defineComponent } from '#app'

export default {
  component: FormInputPassword,
  title: 'form/input/FormInputPassword',
}

const Template = (_: never, { argTypes }: any) =>
  defineComponent({
    components: { FormInputPassword },
    props: Object.keys(argTypes),
    template:
      // eslint-disable-next-line @intlify/vue-i18n/no-raw-text
      '<FormInputPassword v-bind="$props">FormInputPassword</FormInputPassword>',
  })

export const Default = Template.bind({})
// @ts-ignore
Default.args = {
  id: 'id',
  formInput: {},
}
