import { defineComponent } from 'vue'
import IconCalendar from './IconCalendar.vue'

const argTypes = { click: { action: 'click' } }
type ArgTypesType = { argTypes: typeof argTypes }

export default {
  component: IconCalendar,
  title: 'icon/IconCalendar',
  argTypes,
}

const Template = (_: never, { argTypes }: ArgTypesType) =>
  defineComponent({
    components: { IconCalendar },
    props: Object.keys(argTypes),
    template:
      // eslint-disable-next-line @intlify/vue-i18n/no-raw-text
      '<IconCalendar v-bind="$props" @click="click">IconCalendar</IconCalendar>',
  })

export const Default = Template.bind({})
