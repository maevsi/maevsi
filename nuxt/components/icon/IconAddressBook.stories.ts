import { Story } from '@storybook/vue3'
import { defineComponent } from 'vue'

import IconAddressBook from './IconAddressBook.vue'

const argTypes = { click: { action: 'click' } }

export default {
  component: IconAddressBook,
  title: 'icon/IconAddressBook',
  argTypes,
}

const Template: Story = (_, { argTypes }) =>
  defineComponent({
    components: { IconAddressBook },
    props: Object.keys(argTypes),
    template:
      '<IconAddressBook v-bind="$props" @click="click">IconAddressBook</IconAddressBook>',
  })

export const Default = Template.bind({})
