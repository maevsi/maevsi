import { defineComponent } from 'vue'
import MaevsiForm from './Form.vue'

export default {
  component: MaevsiForm,
  title: 'form/Form',
}

const Template = (_: never, { argTypes }: any) =>
  defineComponent({
    components: { MaevsiForm },
    props: Object.keys(argTypes),
    template: '<Form v-bind="$props">Form</Form>',
  })

export const Default = Template.bind({})
// @ts-ignore
Default.args = {
  form: {},
  isFormSent: false,
  submitName: 'submitName',
}
