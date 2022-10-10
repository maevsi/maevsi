import { defineComponent } from 'vue'
import FormInputStateError from './FormInputStateError.vue'

export default {
  component: FormInputStateError,
  title: 'form/input/state/FormInputStateError',
}

const Template = (_: never, { argTypes }: any) =>
  defineComponent({
    components: { FormInputStateError },
    props: Object.keys(argTypes),
    template:
      '<FormInputStateError v-bind="$props">FormInputStateError</FormInputStateError>',
  })

export const Default = Template.bind({})
