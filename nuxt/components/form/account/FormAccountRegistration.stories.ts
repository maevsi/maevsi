import { Story } from '@storybook/vue3'
import { defineComponent } from 'vue'

import FormAccountRegistration from './FormAccountRegistration.vue'

export default {
  component: FormAccountRegistration,
  title: 'form/account/FormAccountRegistration',
}

const Template: Story = (_, { argTypes }) =>
  defineComponent({
    components: { FormAccountRegistration },
    props: Object.keys(argTypes),
    template:
      '<FormAccountRegistration v-bind="$props">FormAccountRegistration</FormAccountRegistration>',
  })

export const Default = Template.bind({})
