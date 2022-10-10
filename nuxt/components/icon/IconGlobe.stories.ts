import { Story } from '@storybook/vue3'
import { defineComponent } from 'vue'

import IconGlobe from './IconGlobe.vue'

const argTypes = { click: { action: 'click' } }

export default {
  component: IconGlobe,
  title: 'icon/IconGlobe',
  argTypes,
}

const Template: Story = (_, { argTypes }) =>
  defineComponent({
    components: { IconGlobe },
    props: Object.keys(argTypes),
    template: '<IconGlobe v-bind="$props" @click="click">IconGlobe</IconGlobe>',
  })

export const Default = Template.bind({})
