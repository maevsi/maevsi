import { Story } from '@storybook/vue3'
import { defineComponent } from 'vue'

import IconEnvelope from './IconEnvelope.vue'

const argTypes = { click: { action: 'click' } }

export default {
  component: IconEnvelope,
  title: 'icon/IconEnvelope',
  argTypes,
}

const Template: Story = (_, { argTypes }) =>
  defineComponent({
    components: { IconEnvelope },
    props: Object.keys(argTypes),
    template:
      '<IconEnvelope v-bind="$props" @click="click">IconEnvelope</IconEnvelope>',
  })

export const Default = Template.bind({})
