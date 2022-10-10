import { Story } from '@storybook/vue3'
import { defineComponent } from 'vue'

import IconQuoteLeft from './IconQuoteLeft.vue'

const argTypes = { click: { action: 'click' } }

export default {
  component: IconQuoteLeft,
  title: 'icon/IconQuoteLeft',
  argTypes,
}

const Template: Story = (_, { argTypes }) =>
  defineComponent({
    components: { IconQuoteLeft },
    props: Object.keys(argTypes),
    template:
      '<IconQuoteLeft v-bind="$props" @click="click">IconQuoteLeft</IconQuoteLeft>',
  })

export const Default = Template.bind({})
