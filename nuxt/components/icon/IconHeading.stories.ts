import { Story } from '@storybook/vue3'
import { defineComponent } from 'vue'

import IconHeading from './IconHeading.vue'

const argTypes = { click: { action: 'click' } }

export default {
  component: IconHeading,
  title: 'icon/IconHeading',
  argTypes,
}

const Template: Story = (_, { argTypes }) =>
  defineComponent({
    components: { IconHeading },
    props: Object.keys(argTypes),
    template:
      '<IconHeading v-bind="$props" @click="click">IconHeading</IconHeading>',
  })

export const Default = Template.bind({})
