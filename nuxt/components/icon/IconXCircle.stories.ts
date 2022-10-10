import { Story } from '@storybook/vue3'
import { defineComponent } from 'vue'

import IconXCircle from './IconXCircle.vue'

const argTypes = { click: { action: 'click' } }

export default {
  component: IconXCircle,
  title: 'icon/IconXCircle',
  argTypes,
}

const Template: Story = (_, { argTypes }) =>
  defineComponent({
    components: { IconXCircle },
    props: Object.keys(argTypes),
    template:
      '<IconXCircle v-bind="$props" @click="click">IconXCircle</IconXCircle>',
  })

export const Default = Template.bind({})
