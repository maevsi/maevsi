import { Story } from '@storybook/vue3'
import { defineComponent } from 'vue'

import ContactPreview from './ContactPreview.vue'

export default {
  component: ContactPreview,
  title: 'contact/ContactPreview',
}

const Template: Story = (_, { argTypes }) =>
  defineComponent({
    components: { ContactPreview },
    props: Object.keys(argTypes),
    template: '<ContactPreview v-bind="$props">ContactPreview</ContactPreview>',
  })

export const Default = Template.bind({})
Default.args = {
  contact: {
    firstName: 'firstName',
    lastName: 'lastName',
  },
}
