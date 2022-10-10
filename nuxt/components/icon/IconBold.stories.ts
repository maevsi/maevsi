import { Story } from '@storybook/vue3'
import { defineComponent } from 'vue'

import IconBold from './IconBold.vue'

const argTypes = { click: { action: 'click' } }

export default {
  component: IconBold,
  title: 'icon/IconBold',
  argTypes,
}

const Template: Story = (_, { argTypes }) =>
  defineComponent({
    components: { IconBold },
    props: Object.keys(argTypes),
    template: '<IconBold v-bind="$props" @click="click">IconBold</IconBold>',
  })

export const Default = Template.bind({})
