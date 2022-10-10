import { Story } from '@storybook/vue3'
import { defineComponent } from 'vue'

import Tag from './Tag.vue'

export default {
  component: Tag,
  title: 'Tag',
}

const Template: Story = (_, { argTypes }) =>
  defineComponent({
    components: { Tag },
    props: Object.keys(argTypes),
    template: '<Tag v-bind="$props">Tag</Tag>',
  })

export const Default = Template.bind({})
Default.args = {
  tabs: [
    ['Tag1', 'Tag'],
    ['Tag2', 'Tag'],
  ],
}
