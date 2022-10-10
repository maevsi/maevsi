import { Story } from '@storybook/vue3'
import { defineComponent } from 'vue'

import IconCode from './IconCode.vue'

const argTypes = { click: { action: 'click' } }

export default {
  component: IconCode,
  title: 'icon/IconCode',
  argTypes,
}

const Template: Story = (_, { argTypes }) =>
  defineComponent({
    components: { IconCode },
    props: Object.keys(argTypes),
    template: '<IconCode v-bind="$props" @click="click">IconCode</IconCode>',
  })

export const Default = Template.bind({})
