import { defineComponent } from 'vue'
import FormContact from './FormContact.vue'

export default {
  component: FormContact,
  title: 'form/contact/FormContact',
}

const Template = (_: never, { argTypes }: any) =>
  defineComponent({
    components: { FormContact },
    props: Object.keys(argTypes),
    template: '<FormContact v-bind="$props">FormContact</FormContact>',
  })

export const Default = Template.bind({})
// @ts-ignore
Default.args = {
  contact: {},
}
