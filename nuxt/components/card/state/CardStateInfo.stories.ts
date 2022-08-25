import { defineComponent } from 'vue'
import CardStateInfo from './CardStateInfo.vue'

export default {
  component: CardStateInfo,
  title: 'card/state/CardStateInfo',
}

const Template = (_: never, { argTypes }: any) =>
  defineComponent({
    components: { CardStateInfo },
    props: Object.keys(argTypes),
    // eslint-disable-next-line @intlify/vue-i18n/no-raw-text
    template: '<CardStateInfo v-bind="$props">CardStateInfo</CardStateInfo>',
  })

export const Default = Template.bind({})
