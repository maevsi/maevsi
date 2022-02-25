import { defineComponent } from '#app'
import CardAlert from './CardAlert.vue'

export default {
  component: CardAlert,
  title: 'card/CardAlert',
}

const Template = (_: never, { argTypes }: any) =>
  defineComponent({
    components: { CardAlert },
    props: Object.keys(argTypes),
    // eslint-disable-next-line @intlify/vue-i18n/no-raw-text
    template: '<CardAlert v-bind="$props">CardAlert</CardAlert>',
  })

export const Default = Template.bind({})

export const Error = Template.bind({})
// @ts-ignore
Error.args = {
  errorMessage: 'errorMessage',
}
