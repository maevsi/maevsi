import FormAccountSignIn from './FormAccountSignIn.vue'
import { defineComponent } from '#app'

export default {
  component: FormAccountSignIn,
  title: 'form/account/FormAccountSignIn',
}

const Template = (_: never, { argTypes }: any) =>
  defineComponent({
    components: { FormAccountSignIn },
    props: Object.keys(argTypes),
    template:
      // eslint-disable-next-line @intlify/vue-i18n/no-raw-text
      '<FormAccountSignIn v-bind="$props">FormAccountSignIn</FormAccountSignIn>',
  })

export const Default = Template.bind({})
