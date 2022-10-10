import { Story } from '@storybook/vue3'
import { defineComponent } from 'vue'

import EventDashletVisibility from './EventDashletVisibility.vue'

export default {
  component: EventDashletVisibility,
  title: 'event/dashlet/EventDashletVisibility',
}

const Template: Story = (_, { argTypes }) =>
  defineComponent({
    components: { EventDashletVisibility },
    props: Object.keys(argTypes),
    template:
      '<EventDashletVisibility v-bind="$props">EventDashletVisibility</EventDashletVisibility>',
  })

export const Default = Template.bind({})
Default.args = {
  event: {
    visibility: 'PUBLIC',
  },
}
