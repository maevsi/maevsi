import { Story } from '@storybook/vue3'
import { defineComponent } from 'vue'

import IconExclamation from './IconExclamation.vue'

const argTypes = { click: { action: 'click' } }

export default {
  component: IconExclamation,
  title: 'icon/IconExclamation',
  argTypes,
}

const Template: Story = (_, { argTypes }) =>
  defineComponent({
    components: { IconExclamation },
    props: Object.keys(argTypes),
    template:
      '<IconExclamation v-bind="$props" @click="click">IconExclamation</IconExclamation>',
  })

export const Default = Template.bind({})
