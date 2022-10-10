import { Story } from '@storybook/vue3'
import { defineComponent } from 'vue'

import Step from './Step.vue'

export default {
  component: Step,
  title: 'Step',
}

const Template: Story = (_, { argTypes }) =>
  defineComponent({
    components: { Step },
    props: Object.keys(argTypes),
    template: '<Step v-bind="$props">Description</Step>',
  })

export const Default = Template.bind({})
Default.args = {
  title: 'Title',
  number: '1',
}
