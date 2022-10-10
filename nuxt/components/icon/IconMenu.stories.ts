import { Story } from '@storybook/vue3'
import { defineComponent } from 'vue'

import IconMenu from './IconMenu.vue'

const argTypes = { click: { action: 'click' } }

export default {
  component: IconMenu,
  title: 'icon/IconMenu',
  argTypes,
}

const Template: Story = (_, { argTypes }) =>
  defineComponent({
    components: { IconMenu },
    props: Object.keys(argTypes),
    template: '<IconMenu v-bind="$props" @click="click">IconMenu</IconMenu>',
  })

export const Default = Template.bind({})
