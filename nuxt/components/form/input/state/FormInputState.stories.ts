import { defineComponent } from '#app'
import FormInputState from './FormInputState.vue'

export default {
  component: FormInputState,
  title: 'form/input/state/FormInputState',
}

const Template = (_: never, { argTypes }: any) =>
  defineComponent({
    components: { FormInputState },
    props: Object.keys(argTypes),
    template:
      // eslint-disable-next-line @intlify/vue-i18n/no-raw-text
      '<FormInputState v-bind="$props">FormInputState</FormInputState>',
  })

export const Default = Template.bind({})
