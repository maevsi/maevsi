import { Story } from '@storybook/vue3'
import { defineComponent } from 'vue'

import TipTap from './TipTap.vue'

export default {
  component: TipTap,
  title: 'TipTap',
}

const Template: Story = (_, { argTypes }) =>
  defineComponent({
    components: { TipTap },
    props: Object.keys(argTypes),
    template: '<TipTap v-bind="$props">TipTap</TipTap>',
  })

export const Default = Template.bind({})
Default.args = {
  value:
    '<p>Test <strong>strong</strong> <a href="https://example.com" target="_blank" rel="noopener noreferrer nofollow">link</a></p>',
}
