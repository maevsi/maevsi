import { Story } from '@storybook/vue3'
import { defineComponent } from 'vue'

import CardStateAlert from './CardStateAlert.vue'

export default {
  component: CardStateAlert,
  title: 'card/state/CardStateAlert',
}

const Template: Story = (_, { argTypes }) =>
  defineComponent({
    components: { CardStateAlert },
    props: Object.keys(argTypes),
    template: '<CardStateAlert v-bind="$props">CardStateAlert</CardStateAlert>',
  })

export const Default = Template.bind({})
