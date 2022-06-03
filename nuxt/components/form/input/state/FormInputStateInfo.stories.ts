import { defineComponent } from '#app'
import FormInputStateInfo from './FormInputStateInfo.vue'

export default {
  component: FormInputStateInfo,
  title: 'form/input/state/FormInputStateInfo',
}

const Template = (_: never, { argTypes }: any) =>
  defineComponent({
    components: { FormInputStateInfo },
    props: Object.keys(argTypes),
    template:
      // eslint-disable-next-line @intlify/vue-i18n/no-raw-text
      '<FormInputStateInfo v-bind="$props">FormInputStateInfo</FormInputStateInfo>',
  })

export const Default = Template.bind({})
