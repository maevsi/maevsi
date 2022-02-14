import FormInputInfo from './FormInputInfo.vue'
import { defineComponent } from '#app'

export default {
  component: FormInputInfo,
  title: 'form/input/FormInputInfo',
}

const Template = (_: never, { argTypes }: any) =>
  defineComponent({
    components: { FormInputInfo },
    props: Object.keys(argTypes),
    template:
      // eslint-disable-next-line @intlify/vue-i18n/no-raw-text
      '<FormInputInfo v-bind="$props">FormInputInfo</FormInputInfo>',
  })

export const Default = Template.bind({})
