import { Story } from '@storybook/vue3'
import { defineComponent } from 'vue'

import IconTelescope from './IconTelescope.vue'

const argTypes = { click: { action: 'click' } }

export default {
  component: IconTelescope,
  title: 'icon/IconTelescope',
  argTypes,
}

const Template: Story = (_, { argTypes }) =>
  defineComponent({
    components: { IconTelescope },
    props: Object.keys(argTypes),
    template:
      '<IconTelescope v-bind="$props" @click="click">IconTelescope</IconTelescope>',
  })

export const Default = Template.bind({})
