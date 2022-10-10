import { Story } from '@storybook/vue3'
import { defineComponent } from 'vue'

import IconWifi from './IconWifi.vue'

const argTypes = { click: { action: 'click' } }

export default {
  component: IconWifi,
  title: 'icon/IconWifi',
  argTypes,
}

const Template: Story = (_, { argTypes }) =>
  defineComponent({
    components: { IconWifi },
    props: Object.keys(argTypes),
    template: '<IconWifi v-bind="$props" @click="click">IconWifi</IconWifi>',
  })

export const Default = Template.bind({})
