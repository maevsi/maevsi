import { defineComponent } from '#app'
import CardStateSuccess from './CardStateSuccess.vue'

export default {
  component: CardStateSuccess,
  title: 'card/state/CardStateSuccess',
}

const Template = (_: never, { argTypes }: any) =>
  defineComponent({
    components: { CardStateSuccess },
    props: Object.keys(argTypes),
    template:
      // eslint-disable-next-line @intlify/vue-i18n/no-raw-text
      '<CardStateSuccess v-bind="$props">CardStateSuccess</CardStateSuccess>',
  })

export const Default = Template.bind({})
