import { Story } from '@storybook/vue3'
import { defineComponent } from 'vue'

import AppLink from './AppLink.vue'

const argTypes = { click: { action: 'click' } }

export default {
  component: AppLink,
  title: 'AppLink',
  argTypes,
}

const Template: Story = (_, { argTypes }) =>
  defineComponent({
    components: { AppLink },
    props: Object.keys(argTypes),
    template: '<AppLink v-bind="$props" @click="click">AppLink</AppLink>',
  })

export const Default = Template.bind({})
Default.args = {
  to: '/',
}

export const External = Template.bind({})
External.args = {
  to: 'https://example.com',
}
