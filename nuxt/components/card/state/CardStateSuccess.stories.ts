import { defineComponent } from 'vue'
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
      '<CardStateSuccess v-bind="$props">CardStateSuccess</CardStateSuccess>',
  })

export const Default = Template.bind({})
