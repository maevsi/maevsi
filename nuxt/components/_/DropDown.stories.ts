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
    // eslint-disable-next-line @intlify/vue-i18n/no-raw-text
    template: '<DropDown v-bind="$props">DropDown</DropDown>',
  })

export const Default = Template.bind({})
