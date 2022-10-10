import { Story } from '@storybook/vue3'
import { defineComponent } from 'vue'

import FormInputUrl from './FormInputUrl.vue'

export default {
  component: FormInputUrl,
  title: 'form/input/FormInputUrl',
}

const Template: Story = (_, { argTypes }) =>
  defineComponent({
    components: { FormInputUrl },
    props: Object.keys(argTypes),
    template: '<FormInputUrl v-bind="$props">FormInputUrl</FormInputUrl>',
  })

export const Default = Template.bind({})
Default.args = {
  formInput: {},
}
