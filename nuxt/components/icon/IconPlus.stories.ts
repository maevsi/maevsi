import { Story } from '@storybook/vue3'
import { defineComponent } from 'vue'

import IconPlus from './IconPlus.vue'

const argTypes = { click: { action: 'click' } }

export default {
  component: IconPlus,
  title: 'icon/IconPlus',
  argTypes,
}

const Template: Story = (_, { argTypes }) =>
  defineComponent({
    components: { IconPlus },
    props: Object.keys(argTypes),
    template: '<IconPlus v-bind="$props" @click="click">IconPlus</IconPlus>',
  })

export const Default = Template.bind({})
