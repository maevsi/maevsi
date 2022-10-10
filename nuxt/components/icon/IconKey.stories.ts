import { Story } from '@storybook/vue3'
import { defineComponent } from 'vue'

import IconKey from './IconKey.vue'

const argTypes = { click: { action: 'click' } }

export default {
  component: IconKey,
  title: 'icon/IconKey',
  argTypes,
}

const Template: Story = (_, { argTypes }) =>
  defineComponent({
    components: { IconKey },
    props: Object.keys(argTypes),
    template: '<IconKey v-bind="$props" @click="click">IconKey</IconKey>',
  })

export const Default = Template.bind({})
