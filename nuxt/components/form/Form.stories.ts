import { defineComponent } from '#app'
import MaevsiForm from './Form.vue'

export default {
  component: MaevsiForm,
  title: 'form/Form',
}

const Template = (_: never, { argTypes }: any) =>
  defineComponent({
    components: { MaevsiForm },
    props: Object.keys(argTypes),
    // eslint-disable-next-line @intlify/vue-i18n/no-raw-text
    template: '<Form v-bind="$props">Form</Form>',
  })

export const Default = Template.bind({})
// @ts-ignore
Default.args = {
  form: {},
  formSent: false,
  graphqlError: undefined,
  submitName: 'submitName',
}
