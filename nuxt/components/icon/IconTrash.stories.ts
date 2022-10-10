import { Story } from '@storybook/vue3'
import { defineComponent } from 'vue'

import IconTrash from './IconTrash.vue'

const argTypes = { click: { action: 'click' } }

export default {
  component: IconTrash,
  title: 'icon/IconTrash',
  argTypes,
}

const Template: Story = (_, { argTypes }) =>
  defineComponent({
    components: { IconTrash },
    props: Object.keys(argTypes),
    template: '<IconTrash v-bind="$props" @click="click">IconTrash</IconTrash>',
  })

export const Default = Template.bind({})
