import { Story } from '@storybook/vue3'
import { defineComponent } from 'vue'

import IconHome from './IconHome.vue'

const argTypes = { click: { action: 'click' } }

export default {
  component: IconHome,
  title: 'icon/IconHome',
  argTypes,
}

const Template: Story = (_, { argTypes }) =>
  defineComponent({
    components: { IconHome },
    props: Object.keys(argTypes),
    template: '<IconHome v-bind="$props" @click="click">IconHome</IconHome>',
  })

export const Default = Template.bind({})
