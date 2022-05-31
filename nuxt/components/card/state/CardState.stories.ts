import { defineComponent } from '#app'
import CardState from './CardState.vue'

export default {
  component: CardState,
  title: 'card/state/CardState',
}

const Template = (_: never, { argTypes }: any) =>
  defineComponent({
    components: { CardState },
    props: Object.keys(argTypes),
    // eslint-disable-next-line @intlify/vue-i18n/no-raw-text
    template: '<CardState v-bind="$props">CardState</CardState>',
  })

export const Default = Template.bind({})
