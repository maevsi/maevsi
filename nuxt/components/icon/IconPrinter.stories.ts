import { Story } from '@storybook/vue3'
import { defineComponent } from 'vue'

import IconPrinter from './IconPrinter.vue'

const argTypes = { click: { action: 'click' } }

export default {
  component: IconPrinter,
  title: 'icon/IconPrinter',
  argTypes,
}

const Template: Story = (_, { argTypes }) =>
  defineComponent({
    components: { IconPrinter },
    props: Object.keys(argTypes),
    template:
      '<IconPrinter v-bind="$props" @click="click">IconPrinter</IconPrinter>',
  })

export const Default = Template.bind({})
