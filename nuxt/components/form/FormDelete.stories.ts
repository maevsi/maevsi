import { Story } from '@storybook/vue3'
import { defineComponent } from 'vue'

import FormDelete from './FormDelete.vue'

export default {
  component: FormDelete,
  title: 'form/FormDelete',
}

const Template: Story = (_, { argTypes }) =>
  defineComponent({
    components: { FormDelete },
    props: Object.keys(argTypes),
    template: '<FormDelete v-bind="$props">FormDelete</FormDelete>',
  })

export const Default = Template.bind({})
