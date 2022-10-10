import { Story } from '@storybook/vue3'
import { defineComponent } from 'vue'

import IconX from './IconX.vue'

const argTypes = { click: { action: 'click' } }

export default {
  component: IconX,
  title: 'icon/IconX',
  argTypes,
}

const Template: Story = (_, { argTypes }) =>
  defineComponent({
    components: { IconX },
    props: Object.keys(argTypes),
    template: '<IconX v-bind="$props" @click="click">IconX</IconX>',
  })

export const Default = Template.bind({})
