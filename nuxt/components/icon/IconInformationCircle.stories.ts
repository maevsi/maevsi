import { Story } from '@storybook/vue3'
import { defineComponent } from 'vue'

import IconInformationCircle from './IconInformationCircle.vue'

const argTypes = { click: { action: 'click' } }

export default {
  component: IconInformationCircle,
  title: 'icon/IconInformationCircle',
  argTypes,
}

const Template: Story = (_, { argTypes }) =>
  defineComponent({
    components: { IconInformationCircle },
    props: Object.keys(argTypes),
    template:
      '<IconInformationCircle v-bind="$props" @click="click">IconInformationCircle</IconInformationCircle>',
  })

export const Default = Template.bind({})
