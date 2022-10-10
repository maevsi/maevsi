import { Story } from '@storybook/vue3'
import { defineComponent } from 'vue'

import FormContact from './FormContact.vue'

export default {
  component: FormContact,
  title: 'form/contact/FormContact',
}

const Template: Story = (_, { argTypes }) =>
  defineComponent({
    components: { FormContact },
    props: Object.keys(argTypes),
    template: '<FormContact v-bind="$props">FormContact</FormContact>',
  })

export const Default = Template.bind({})
Default.args = {
  contact: {},
}
