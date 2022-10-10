import { Story } from '@storybook/vue3'
import { defineComponent } from 'vue'

import IconSearch from './IconSearch.vue'

const argTypes = { click: { action: 'click' } }

export default {
  component: IconSearch,
  title: 'icon/IconSearch',
  argTypes,
}

const Template: Story = (_, { argTypes }) =>
  defineComponent({
    components: { IconSearch },
    props: Object.keys(argTypes),
    template:
      '<IconSearch v-bind="$props" @click="click">IconSearch</IconSearch>',
  })

export const Default = Template.bind({})
