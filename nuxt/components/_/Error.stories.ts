import { Story } from '@storybook/vue3'
import { defineComponent } from 'vue'

import Error from './Error.vue'

export default {
  component: Error,
  title: 'Error',
}

const Template: Story = (_, { argTypes }) =>
  defineComponent({
    components: { Error },
    props: Object.keys(argTypes),
    template: '<Error v-bind="$props">Error</Error>',
  })

export const Default = Template.bind({})
Default.args = {
  statusCode: 400,
}
