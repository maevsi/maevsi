import { Story } from '@storybook/vue3'
import { defineComponent } from 'vue'

import IconCog from './IconCog.vue'

const argTypes = { click: { action: 'click' } }

export default {
  component: IconCog,
  title: 'icon/IconCog',
  argTypes,
}

const Template: Story = (_, { argTypes }) =>
  defineComponent({
    components: { IconCog },
    props: Object.keys(argTypes),
    template: '<IconCog v-bind="$props" @click="click">IconCog</IconCog>',
  })

export const Default = Template.bind({})
