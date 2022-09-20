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
    template: '<CardStateWarn v-bind="$props">CardStateWarn</CardStateWarn>',
  })

export const Default = Template.bind({})
