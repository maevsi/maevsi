import { Story } from '@storybook/vue3'
import { defineComponent } from 'vue'

import IconUserTag from './IconUserTag.vue'

const argTypes = { click: { action: 'click' } }

export default {
  component: IconUserTag,
  title: 'icon/IconUserTag',
  argTypes,
}

const Template: Story = (_, { argTypes }) =>
  defineComponent({
    components: { IconUserTag },
    props: Object.keys(argTypes),
    template:
      '<IconUserTag v-bind="$props" @click="click">IconUserTag</IconUserTag>',
  })

export const Default = Template.bind({})
