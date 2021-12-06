import FormInputError from './FormInputError.vue'

import { defineComponent } from '#app'

export default {
  component: FormInputError,
  title: 'form/input/FormInputError',
}

const Template = (_: never, { argTypes }: any) =>
  defineComponent({
    components: { FormInputError },
    props: Object.keys(argTypes),
    template:
      // eslint-disable-next-line @intlify/vue-i18n/no-raw-text
      '<FormInputError v-bind="$props">FormInputError</FormInputError>',
  })

export const Default = Template.bind({})
