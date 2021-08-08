import { defineComponent } from '@nuxtjs/composition-api'
import CardWarn from './CardWarn.vue'

export default {
  component: CardWarn,
  title: 'card/CardWarn',
}

const Template = (_: never, { argTypes }: any) =>
  defineComponent({
    components: { CardWarn },
    props: Object.keys(argTypes),
    // eslint-disable-next-line @intlify/vue-i18n/no-raw-text
    template: '<CardWarn v-bind="$props">CardWarn</CardWarn>',
  })

export const Default = Template.bind({})
