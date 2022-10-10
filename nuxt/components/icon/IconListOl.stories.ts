import { Story } from '@storybook/vue3'
import { defineComponent } from 'vue'

import IconListOl from './IconListOl.vue'

const argTypes = { click: { action: 'click' } }

export default {
  component: IconListOl,
  title: 'icon/IconListOl',
  argTypes,
}

const Template: Story = (_, { argTypes }) =>
  defineComponent({
    components: { IconListOl },
    props: Object.keys(argTypes),
    template:
      '<IconListOl v-bind="$props" @click="click">IconListOl</IconListOl>',
  })

export const Default = Template.bind({})
