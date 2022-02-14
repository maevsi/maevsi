import CardAlert from './CardAlert.vue'
import { defineComponent } from '#app'

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
