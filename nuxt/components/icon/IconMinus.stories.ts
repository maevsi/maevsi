import { Story } from '@storybook/vue3'
import { defineComponent } from 'vue'

import IconMinus from './IconMinus.vue'

const argTypes = { click: { action: 'click' } }

export default {
  component: IconMinus,
  title: 'icon/IconMinus',
  argTypes,
}

const Template: Story = (_, { argTypes }) =>
  defineComponent({
    components: { IconMinus },
    props: Object.keys(argTypes),
    template: '<IconMinus v-bind="$props" @click="click">IconMinus</IconMinus>',
  })

export const Default = Template.bind({})
