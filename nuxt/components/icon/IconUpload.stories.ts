import { Story } from '@storybook/vue3'
import { defineComponent } from 'vue'

import IconUpload from './IconUpload.vue'

const argTypes = { click: { action: 'click' } }

export default {
  component: IconUpload,
  title: 'icon/IconUpload',
  argTypes,
}

const Template: Story = (_, { argTypes }) =>
  defineComponent({
    components: { IconUpload },
    props: Object.keys(argTypes),
    template:
      '<IconUpload v-bind="$props" @click="click">IconUpload</IconUpload>',
  })

export const Default = Template.bind({})
