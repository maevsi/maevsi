import { Story } from '@storybook/vue3'
import { defineComponent } from 'vue'

import LoaderIndicatorText from './LoaderIndicatorText.vue'

export default {
  component: LoaderIndicatorText,
  title: 'loader/LoaderIndicatorText',
}

const Template: Story = (_, { argTypes }) =>
  defineComponent({
    components: { LoaderIndicatorText },
    props: Object.keys(argTypes),
    template:
      '<LoaderIndicatorText v-bind="$props">LoaderIndicatorText</LoaderIndicatorText>',
  })

export const Default = Template.bind({})
