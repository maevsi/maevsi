import { Story } from '@storybook/vue3'
import { defineComponent } from 'vue'

import Loader from './Loader.vue'

export default {
  component: Loader,
  title: 'loader/Loader',
}

const Template: Story = (_, { argTypes }) =>
  defineComponent({
    components: { Loader },
    props: Object.keys(argTypes),
    template: '<Loader v-bind="$props">Loader</Loader>',
  })

export const Default = Template.bind({})
Default.args = {
  errorMessage: undefined,
}
