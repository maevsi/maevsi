import { Story } from '@storybook/vue3'
import { defineComponent } from 'vue'

import IconListUl from './IconListUl.vue'

const argTypes = { click: { action: 'click' } }

export default {
  component: IconListUl,
  title: 'icon/IconListUl',
  argTypes,
}

const Template: Story = (_, { argTypes }) =>
  defineComponent({
    components: { IconListUl },
    props: Object.keys(argTypes),
    template:
      '<IconListUl v-bind="$props" @click="click">IconListUl</IconListUl>',
  })

export const Default = Template.bind({})
