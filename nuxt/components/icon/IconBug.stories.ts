import { Story } from '@storybook/vue3'
import { defineComponent } from 'vue'

import IconBug from './IconBug.vue'

const argTypes = { click: { action: 'click' } }

export default {
  component: IconBug,
  title: 'icon/IconBug',
  argTypes,
}

const Template: Story = (_, { argTypes }) =>
  defineComponent({
    components: { IconBug },
    props: Object.keys(argTypes),
    template: '<IconBug v-bind="$props" @click="click">IconBug</IconBug>',
  })

export const Default = Template.bind({})
