import { Story } from '@storybook/vue3'
import { defineComponent } from 'vue'

import IconItalic from './IconItalic.vue'

const argTypes = { click: { action: 'click' } }

export default {
  component: IconItalic,
  title: 'icon/IconItalic',
  argTypes,
}

const Template: Story = (_, { argTypes }) =>
  defineComponent({
    components: { IconItalic },
    props: Object.keys(argTypes),
    template:
      '<IconItalic v-bind="$props" @click="click">IconItalic</IconItalic>',
  })

export const Default = Template.bind({})
