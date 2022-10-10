import { Story } from '@storybook/vue3'
import { defineComponent } from 'vue'

import EventIconVisibility from './EventIconVisibility.vue'

export default {
  component: EventIconVisibility,
  title: 'event/EventIconVisibility',
}

const Template: Story = (_, { argTypes }) =>
  defineComponent({
    components: { EventIconVisibility },
    props: Object.keys(argTypes),
    template:
      '<EventIconVisibility v-bind="$props">EventIconVisibility</EventIconVisibility>',
  })

export const Default = Template.bind({})
Default.args = {
  visibility: 'PUBLIC',
}
