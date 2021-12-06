import FormInputSuccess from './FormInputSuccess.vue'

import { defineComponent } from '#app'

export default {
  component: FormInputSuccess,
  title: 'form/input/FormInputSuccess',
}

const Template = (_: never, { argTypes }: any) =>
  defineComponent({
    components: { FormInputSuccess },
    props: Object.keys(argTypes),
    template:
      // eslint-disable-next-line @intlify/vue-i18n/no-raw-text
      '<FormInputSuccess v-bind="$props">FormInputSuccess</FormInputSuccess>',
  })

export const Default = Template.bind({})
// @ts-ignore
Default.args = {
  formInput: {
    $model: 'x',
    $invalid: false,
  },
}
