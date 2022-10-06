import { defineComponent } from 'vue'
import FormInputStateWarning from './FormInputStateWarning.vue'

export default {
  component: FormInputStateWarning,
  title: 'form/input/state/FormInputStateWarning',
}

const Template = (_: never, { argTypes }: any) =>
  defineComponent({
    components: { FormInputStateWarning },
    props: Object.keys(argTypes),
    template:
      '<FormInputStateWarning v-bind="$props">FormInputStateWarning</FormInputStateWarning>',
  })

export const Default = Template.bind({})
