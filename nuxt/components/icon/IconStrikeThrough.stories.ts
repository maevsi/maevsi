import { Story } from '@storybook/vue3'
import { defineComponent } from 'vue'

import IconStrikeThrough from './IconStrikeThrough.vue'

const argTypes = { click: { action: 'click' } }

export default {
  component: IconStrikeThrough,
  title: 'icon/IconStrikeThrough',
  argTypes,
}

const Template: Story = (_, { argTypes }) =>
  defineComponent({
    components: { IconStrikeThrough },
    props: Object.keys(argTypes),
    template:
      '<IconStrikeThrough v-bind="$props" @click="click">IconStrikeThrough</IconStrikeThrough>',
  })

export const Default = Template.bind({})
