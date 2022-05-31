import { defineComponent } from '#app'
import CardStateAlert from './CardStateAlert.vue'

export default {
  component: CardStateAlert,
  title: 'card/state/CardStateAlert',
}

const Template = (_: never, { argTypes }: any) =>
  defineComponent({
    components: { CardStateAlert },
    props: Object.keys(argTypes),
    // eslint-disable-next-line @intlify/vue-i18n/no-raw-text
    template: '<CardStateAlert v-bind="$props">CardStateAlert</CardStateAlert>',
  })

export const Default = Template.bind({})

export const Error = Template.bind({})
// @ts-ignore
Error.args = {
  errorMessage: 'errorMessage',
}
