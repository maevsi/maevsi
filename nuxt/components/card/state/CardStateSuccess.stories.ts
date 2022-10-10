import { Story } from '@storybook/vue3'
import { defineComponent } from 'vue'

import CardStateSuccess from './CardStateSuccess.vue'

export default {
  component: CardStateSuccess,
  title: 'card/state/CardStateSuccess',
}

const Template: Story = (_, { argTypes }) =>
  defineComponent({
    components: { CardStateSuccess },
    props: Object.keys(argTypes),
    template:
      '<CardStateSuccess v-bind="$props">CardStateSuccess</CardStateSuccess>',
  })

export const Default = Template.bind({})
