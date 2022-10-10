import { Story } from '@storybook/vue3'
import { defineComponent } from 'vue'

import IconMapMarker from './IconMapMarker.vue'

const argTypes = { click: { action: 'click' } }

export default {
  component: IconMapMarker,
  title: 'icon/IconMapMarker',
  argTypes,
}

const Template: Story = (_, { argTypes }) =>
  defineComponent({
    components: { IconMapMarker },
    props: Object.keys(argTypes),
    template:
      '<IconMapMarker v-bind="$props" @click="click">IconMapMarker</IconMapMarker>',
  })

export const Default = Template.bind({})
