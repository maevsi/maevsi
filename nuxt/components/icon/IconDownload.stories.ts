import { Story } from '@storybook/vue3'
import { defineComponent } from 'vue'

import IconDownload from './IconDownload.vue'

const argTypes = { click: { action: 'click' } }

export default {
  component: IconDownload,
  title: 'icon/IconDownload',
  argTypes,
}

const Template: Story = (_, { argTypes }) =>
  defineComponent({
    components: { IconDownload },
    props: Object.keys(argTypes),
    template:
      '<IconDownload v-bind="$props" @click="click">IconDownload</IconDownload>',
  })

export const Default = Template.bind({})
