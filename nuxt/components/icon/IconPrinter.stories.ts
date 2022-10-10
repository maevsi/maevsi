import { defineComponent } from 'vue'
import IconPrinter from './IconPrinter.vue'

const argTypes = { click: { action: 'click' } }
type ArgTypesType = { argTypes: typeof argTypes }

export default {
  component: IconPrinter,
  title: 'icon/IconPrinter',
  argTypes,
}

const Template = (_: never, { argTypes }: ArgTypesType) =>
  defineComponent({
    components: { IconPrinter },
    props: Object.keys(argTypes),
    template:
      '<IconPrinter v-bind="$props" @click="click">IconPrinter</IconPrinter>',
  })

export const Default = Template.bind({})
