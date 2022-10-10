import { Story } from '@storybook/vue3'
import { defineComponent } from 'vue'

import MaevsiForm from './Form.vue'

export default {
  component: MaevsiForm,
  title: 'form/Form',
}

const Template: Story = (_, { argTypes }) =>
  defineComponent({
    components: { MaevsiForm },
    props: Object.keys(argTypes),
    template: '<Form v-bind="$props">Form</Form>',
  })

export const Default = Template.bind({})
Default.args = {
  form: {},
  isFormSent: false,
  submitName: 'submitName',
}
