import { Story } from '@storybook/vue3'
import { defineComponent } from 'vue'

import IconPaperPlane from './IconPaperPlane.vue'

const argTypes = { click: { action: 'click' } }

export default {
  component: IconPaperPlane,
  title: 'icon/IconPaperPlane',
  argTypes,
}

const Template: Story = (_, { argTypes }) =>
  defineComponent({
    components: { IconPaperPlane },
    props: Object.keys(argTypes),
    template:
      '<IconPaperPlane v-bind="$props" @click="click">IconPaperPlane</IconPaperPlane>',
  })

export const Default = Template.bind({})
