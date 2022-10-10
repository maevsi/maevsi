import { Story } from '@storybook/vue3'
import { defineComponent } from 'vue'

import IconCheckCircle from './IconCheckCircle.vue'

const argTypes = { click: { action: 'click' } }

export default {
  component: IconCheckCircle,
  title: 'icon/IconCheckCircle',
  argTypes,
}

const Template: Story = (_, { argTypes }) =>
  defineComponent({
    components: { IconCheckCircle },
    props: Object.keys(argTypes),
    template:
      '<IconCheckCircle v-bind="$props" @click="click">IconCheckCircle</IconCheckCircle>',
  })

export const Default = Template.bind({})
