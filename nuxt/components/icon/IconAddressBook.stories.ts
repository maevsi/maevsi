import { defineComponent } from 'vue'
import IconAddressBook from './IconAddressBook.vue'

const argTypes = { click: { action: 'click' } }
type ArgTypesType = { argTypes: typeof argTypes }

export default {
  component: IconAddressBook,
  title: 'icon/IconAddressBook',
  argTypes,
}

const Template = (_: never, { argTypes }: ArgTypesType) =>
  defineComponent({
    components: { IconAddressBook },
    props: Object.keys(argTypes),
    template:
      '<IconAddressBook v-bind="$props" @click="click">IconAddressBook</IconAddressBook>',
  })

export const Default = Template.bind({})
