import { Story } from '@storybook/vue3'
import { defineComponent } from 'vue'

import IconQrCode from './IconQrCode.vue'

const argTypes = { click: { action: 'click' } }

export default {
  component: IconQrCode,
  title: 'icon/IconQrCode',
  argTypes,
}

const Template: Story = (_, { argTypes }) =>
  defineComponent({
    components: { IconQrCode },
    props: Object.keys(argTypes),
    template:
      '<IconQrCode v-bind="$props" @click="click">IconQrCode</IconQrCode>',
  })

export const Default = Template.bind({})
