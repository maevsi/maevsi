import { Story } from '@storybook/vue3'
import { defineComponent } from 'vue'

import Steps from './Steps.vue'

export default {
  component: Steps,
  title: 'Steps',
}

const Template: Story = (_, { argTypes }) =>
  defineComponent({
    components: { Steps },
    props: Object.keys(argTypes),
    template: '<Steps v-bind="$props">Steps</Steps>',
  })

export const Default = Template.bind({})
Default.args = {}
