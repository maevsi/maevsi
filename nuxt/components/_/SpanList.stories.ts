import { Story } from '@storybook/vue3'
import { defineComponent } from 'vue'

import SpanList from './SpanList.vue'

export default {
  component: SpanList,
  title: 'SpanList',
}

const Template: Story = (_, { argTypes }) =>
  defineComponent({
    components: { SpanList },
    props: Object.keys(argTypes),
    template: '<SpanList v-bind="$props">SpanList</SpanList>',
  })

export const Default = Template.bind({})
Default.args = {
  span: 'Span',
}

export const Multiple = Template.bind({})
Multiple.args = {
  span: ['Uno', 'Dos', 'Tres'],
}
