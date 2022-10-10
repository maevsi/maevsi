import { Story } from '@storybook/vue3'
import { defineComponent } from 'vue'

import IconArchive from './IconArchive.vue'

const argTypes = { click: { action: 'click' } }

export default {
  component: IconArchive,
  title: 'icon/IconArchive',
  argTypes,
}

const Template: Story = (_, { argTypes }) =>
  defineComponent({
    components: { IconArchive },
    props: Object.keys(argTypes),
    template:
      '<IconArchive v-bind="$props" @click="click">IconArchive</IconArchive>',
  })

export const Default = Template.bind({})
