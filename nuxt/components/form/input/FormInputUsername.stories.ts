import { defineComponent } from '@nuxtjs/composition-api'
import FormInputUsername from './FormInputUsername.vue'

export default {
  component: FormInputUsername,
  title: 'form/input/FormInputUsername',
}

const Template = (_: never, { argTypes }: any) =>
  defineComponent({
    components: { FormInputUsername },
    props: Object.keys(argTypes),
    template:
      // eslint-disable-next-line @intlify/vue-i18n/no-raw-text
      '<FormInputUsername v-bind="$props">FormInputUsername</FormInputUsername>',
  })

export const Default = Template.bind({})
// @ts-ignore
Default.args = {
  id: 'id',
  formInput: {},
}
