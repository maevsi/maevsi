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
      // eslint-disable-next-line @intlify/vue-i18n/no-raw-text
      '<FormInputStateWarning v-bind="$props">FormInputStateWarning</FormInputStateWarning>',
  })

export const Default = Template.bind({})
