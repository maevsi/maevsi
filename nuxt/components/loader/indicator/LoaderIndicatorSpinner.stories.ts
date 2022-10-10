import { Story } from '@storybook/vue3'
import { defineComponent } from 'vue'

import LoaderIndicatorSpinner from './LoaderIndicatorSpinner.vue'

export default {
  component: LoaderIndicatorSpinner,
  title: 'loader/LoaderIndicatorSpinner',
}

const Template: Story = (_, { argTypes }) =>
  defineComponent({
    components: { LoaderIndicatorSpinner },
    props: Object.keys(argTypes),
    template:
      '<div class="h-8 w-8"><LoaderIndicatorSpinner v-bind="$props">LoaderIndicatorSpinner</LoaderIndicatorSpinner></div>',
  })

export const Default = Template.bind({})
