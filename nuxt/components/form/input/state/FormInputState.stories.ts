import { defineComponent } from 'vue'
import FormInputState from './FormInputState.vue'

export default {
  component: FormInputState,
  title: 'form/input/state/FormInputState',
}

const Template = (_: never, { argTypes }: any) =>
  defineComponent({
    components: { FormInputState },
    props: Object.keys(argTypes),
    template: '<FormInputState v-bind="$props">FormInputState</FormInputState>',
  })

export const Default = Template.bind({})
