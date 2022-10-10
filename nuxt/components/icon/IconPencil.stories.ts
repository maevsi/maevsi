import { Story } from '@storybook/vue3'
import { defineComponent } from 'vue'

import IconPencil from './IconPencil.vue'

const argTypes = { click: { action: 'click' } }

export default {
  component: IconPencil,
  title: 'icon/IconPencil',
  argTypes,
}

const Template: Story = (_, { argTypes }) =>
  defineComponent({
    components: { IconPencil },
    props: Object.keys(argTypes),
    template:
      '<IconPencil v-bind="$props" @click="click">IconPencil</IconPencil>',
  })

export const Default = Template.bind({})
