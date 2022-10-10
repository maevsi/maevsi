import { Story } from '@storybook/vue3'
import { defineComponent } from 'vue'

import ContactListItem from './ContactListItem.vue'

export default {
  component: ContactListItem,
  title: 'contact/ContactListItem',
}

const Template: Story = (_, { argTypes }) =>
  defineComponent({
    components: { ContactListItem },
    props: Object.keys(argTypes),
    template:
      '<ContactListItem v-bind="$props">ContactListItem</ContactListItem>',
  })

export const Default = Template.bind({})
Default.args = {
  contact: {
    firstName: 'firstName',
    lastName: 'lastName',
    nodeId: 'WyJldmVudHMiLDFd',
  },
}
