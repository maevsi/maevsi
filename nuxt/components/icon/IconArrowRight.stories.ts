import { Story } from '@storybook/vue3'
import { defineComponent } from 'vue'

import IconArrowRight from './IconArrowRight.vue'

const argTypes = { click: { action: 'click' } }

export default {
  component: IconArrowRight,
  title: 'icon/IconArrowRight',
  argTypes,
}

const Template: Story = (_, { argTypes }) =>
  defineComponent({
    components: { IconArrowRight },
    props: Object.keys(argTypes),
    template:
      '<IconArrowRight v-bind="$props" @click="click">IconArrowRight</IconArrowRight>',
  })

export const Default = Template.bind({})
