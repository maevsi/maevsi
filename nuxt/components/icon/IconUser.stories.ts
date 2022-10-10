import { Story } from '@storybook/vue3'
import { defineComponent } from 'vue'

import IconUser from './IconUser.vue'

const argTypes = { click: { action: 'click' } }

export default {
  component: IconUser,
  title: 'icon/IconUser',
  argTypes,
}

const Template: Story = (_, { argTypes }) =>
  defineComponent({
    components: { IconUser },
    props: Object.keys(argTypes),
    template: '<IconUser v-bind="$props" @click="click">IconUser</IconUser>',
  })

export const Default = Template.bind({})
