import { defineComponent } from 'vue'
import FormAccountSignIn from './FormAccountSignIn.vue'

export default {
  component: FormAccountSignIn,
  title: 'form/account/FormAccountSignIn',
}

const Template = (_: never, { argTypes }: any) =>
  defineComponent({
    components: { FormAccountSignIn },
    props: Object.keys(argTypes),
    template:
      '<FormAccountSignIn v-bind="$props">FormAccountSignIn</FormAccountSignIn>',
  })

export const Default = Template.bind({})
