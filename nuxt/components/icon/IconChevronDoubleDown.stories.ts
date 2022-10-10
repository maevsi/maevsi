import { Story } from '@storybook/vue3'
import { defineComponent } from 'vue'

import IconChevronDoubleDown from './IconChevronDoubleDown.vue'

const argTypes = { click: { action: 'click' } }

export default {
  component: IconChevronDoubleDown,
  title: 'icon/IconChevronDoubleDown',
  argTypes,
}

const Template: Story = (_, { argTypes }) =>
  defineComponent({
    components: { IconChevronDoubleDown },
    props: Object.keys(argTypes),
    template:
      '<IconChevronDoubleDown v-bind="$props" @click="click">IconChevronDoubleDown</IconChevronDoubleDown>',
  })

export const Default = Template.bind({})
