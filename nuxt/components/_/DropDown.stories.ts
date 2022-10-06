import { defineComponent } from 'vue'
import DropDown from './DropDown.vue'

export default {
  component: DropDown,
  title: 'DropDown',
}

const Template = (_: never, { argTypes }: any) =>
  defineComponent({
    components: { DropDown },
    props: Object.keys(argTypes),
    template: '<DropDown v-bind="$props">DropDown</DropDown>',
  })

export const Default = Template.bind({})
