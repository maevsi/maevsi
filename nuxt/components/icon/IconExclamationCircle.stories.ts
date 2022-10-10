import { Story } from '@storybook/vue3'
import { defineComponent } from 'vue'

import IconExclamationCircle from './IconExclamationCircle.vue'

const argTypes = { click: { action: 'click' } }

export default {
  component: IconExclamationCircle,
  title: 'icon/IconExclamationCircle',
  argTypes,
}

const Template: Story = (_, { argTypes }) =>
  defineComponent({
    components: { IconExclamationCircle },
    props: Object.keys(argTypes),
    template:
      '<IconExclamationCircle v-bind="$props" @click="click">IconExclamationCircle</IconExclamationCircle>',
  })

export const Default = Template.bind({})
