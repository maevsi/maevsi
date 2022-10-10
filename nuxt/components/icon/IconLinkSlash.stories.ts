import { Story } from '@storybook/vue3'
import { defineComponent } from 'vue'

import IconLinkSlash from './IconLinkSlash.vue'

const argTypes = { click: { action: 'click' } }

export default {
  component: IconLinkSlash,
  title: 'icon/IconLinkSlash',
  argTypes,
}

const Template: Story = (_, { argTypes }) =>
  defineComponent({
    components: { IconLinkSlash },
    props: Object.keys(argTypes),
    template:
      '<IconLinkSlash v-bind="$props" @click="click">IconLinkSlash</IconLinkSlash>',
  })

export const Default = Template.bind({})
