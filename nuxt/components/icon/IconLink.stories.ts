import { Story } from '@storybook/vue3'
import { defineComponent } from 'vue'

import IconLink from './IconLink.vue'

const argTypes = { click: { action: 'click' } }

export default {
  component: IconLink,
  title: 'icon/IconLink',
  argTypes,
}

const Template: Story = (_, { argTypes }) =>
  defineComponent({
    components: { IconLink },
    props: Object.keys(argTypes),
    template: '<IconLink v-bind="$props" @click="click">IconLink</IconLink>',
  })

export const Default = Template.bind({})
