import { defineComponent } from 'vue'
import CardStateWarn from './CardStateWarn.vue'

export default {
  component: CardStateWarn,
  title: 'card/state/CardStateWarn',
}

const Template = (_: never, { argTypes }: any) =>
  defineComponent({
    components: { CardStateWarn },
    props: Object.keys(argTypes),
    // eslint-disable-next-line @intlify/vue-i18n/no-raw-text
    template: '<CardStateWarn v-bind="$props">CardStateWarn</CardStateWarn>',
  })

export const Default = Template.bind({})
