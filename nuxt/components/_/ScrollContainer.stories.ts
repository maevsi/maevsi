import { Story } from '@storybook/vue3'
import { defineComponent } from 'vue'

import ScrollContainer from './ScrollContainer.vue'

export default {
  component: ScrollContainer,
  title: 'ScrollContainer',
}

const Template: Story = (_, { argTypes }) =>
  defineComponent({
    components: { ScrollContainer },
    props: Object.keys(argTypes),
    template:
      '<ScrollContainer v-bind="$props">ScrollContainer</ScrollContainer>',
  })

export const Default = Template.bind({})
Default.args = {
  hasNextPage: false,
}
