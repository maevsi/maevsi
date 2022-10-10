import { defineComponent } from 'vue'
import CardState from './CardState.vue'

export default {
  component: CardState,
  title: 'card/state/CardState',
}

const Template = (_: never, { argTypes }: any) =>
  defineComponent({
    components: { CardState },
    props: Object.keys(argTypes),
    template: '<CardState v-bind="$props">CardState</CardState>',
  })

export const Default = Template.bind({})
