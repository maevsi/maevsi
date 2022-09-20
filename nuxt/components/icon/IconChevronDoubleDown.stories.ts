import { defineComponent } from 'vue'
import IconChevronDoubleDown from './IconChevronDoubleDown.vue'

const argTypes = { click: { action: 'click' } }
type ArgTypesType = { argTypes: typeof argTypes }

export default {
  component: IconChevronDoubleDown,
  title: 'icon/IconChevronDoubleDown',
  argTypes,
}

const Template = (_: never, { argTypes }: ArgTypesType) =>
  defineComponent({
    components: { IconChevronDoubleDown },
    props: Object.keys(argTypes),
    template:
      '<IconChevronDoubleDown v-bind="$props" @click="click">IconChevronDoubleDown</IconChevronDoubleDown>',
  })

export const Default = Template.bind({})
