import { Story } from '@storybook/vue3'
import { defineComponent } from 'vue'

import FormInputStateSuccess from './FormInputStateSuccess.vue'

export default {
  component: FormInputStateSuccess,
  title: 'form/input/state/FormInputStateSuccess',
}

const Template: Story = (_, { argTypes }) =>
  defineComponent({
    components: { FormInputStateSuccess },
    props: Object.keys(argTypes),
    template:
      '<FormInputStateSuccess v-bind="$props">FormInputStateSuccess</FormInputStateSuccess>',
  })

export const Default = Template.bind({})
Default.args = {
  formInput: {
    $model: 'x',
    $invalid: false,
  },
}
