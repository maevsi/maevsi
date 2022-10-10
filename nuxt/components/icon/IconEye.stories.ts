import { Story } from '@storybook/vue3'
import { defineComponent } from 'vue'

import IconEye from './IconEye.vue'

const argTypes = { click: { action: 'click' } }

export default {
  component: IconEye,
  title: 'icon/IconEye',
  argTypes,
}

const Template: Story = (_, { argTypes }) =>
  defineComponent({
    components: { IconEye },
    props: Object.keys(argTypes),
    template: '<IconEye v-bind="$props" @click="click">IconEye</IconEye>',
  })

export const Default = Template.bind({})
