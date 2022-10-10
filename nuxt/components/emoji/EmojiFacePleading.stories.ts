import { Story } from '@storybook/vue3'
import { defineComponent } from 'vue'

import EmojiFacePleading from './EmojiFacePleading.vue'

const argTypes = { click: { action: 'click' } }

export default {
  component: EmojiFacePleading,
  title: 'icon/EmojiFacePleading',
  argTypes,
}

const Template: Story = (_, { argTypes }) =>
  defineComponent({
    components: { EmojiFacePleading },
    props: Object.keys(argTypes),
    template:
      '<EmojiFacePleading v-bind="$props" @click="click">EmojiFacePleading</EmojiFacePleading>',
  })

export const Default = Template.bind({})
