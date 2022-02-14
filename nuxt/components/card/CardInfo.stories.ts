import CardInfo from './CardInfo.vue'
import { defineComponent } from '#app'

export default {
  component: CardInfo,
  title: 'card/CardInfo',
}

const Template = (_: never, { argTypes }: any) =>
  defineComponent({
    components: { CardInfo },
    props: Object.keys(argTypes),
    // eslint-disable-next-line @intlify/vue-i18n/no-raw-text
    template: '<CardInfo v-bind="$props">CardInfo</CardInfo>',
  })

export const Default = Template.bind({})
