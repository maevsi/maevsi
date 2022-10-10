import { Story } from '@storybook/vue3'
import { defineComponent } from 'vue'

import EventDashletLink from './EventDashletLink.vue'

export default {
  component: EventDashletLink,
  title: 'event/dashlet/EventDashletLink',
}

const Template: Story = (_, { argTypes }) =>
  defineComponent({
    components: { EventDashletLink },
    props: Object.keys(argTypes),
    template:
      '<EventDashletLink v-bind="$props">EventDashletLink</EventDashletLink>',
  })

export const Default = Template.bind({})
Default.args = {
  event: {
    isInPerson: true,
    isRemote: true,
    location: 'Place',
    url: 'https://example.com',
  },
}
