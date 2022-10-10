import { Story } from '@storybook/vue3'
import { defineComponent } from 'vue'

import CardState from './CardState.vue'

export default {
  component: CardState,
  title: 'card/state/CardState',
}

const Template: Story = (_, { argTypes }) =>
  defineComponent({
    components: { CardState },
    props: Object.keys(argTypes),
    template: '<CardState v-bind="$props">CardState</CardState>',
  })

export const Default = Template.bind({})
