import { Story } from '@storybook/vue3'
import { defineComponent } from 'vue'

import CardStateInfo from './CardStateInfo.vue'

export default {
  component: CardStateInfo,
  title: 'card/state/CardStateInfo',
}

const Template: Story = (_, { argTypes }) =>
  defineComponent({
    components: { CardStateInfo },
    props: Object.keys(argTypes),
    template: '<CardStateInfo v-bind="$props">CardStateInfo</CardStateInfo>',
  })

export const Default = Template.bind({})
