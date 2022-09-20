import { defineComponent } from 'vue'
import IconItalic from './IconItalic.vue'

const argTypes = { click: { action: 'click' } }
type ArgTypesType = { argTypes: typeof argTypes }

export default {
  component: IconItalic,
  title: 'icon/IconItalic',
  argTypes,
}

const Template = (_: never, { argTypes }: ArgTypesType) =>
  defineComponent({
    components: { IconItalic },
    props: Object.keys(argTypes),
    template:
      '<IconItalic v-bind="$props" @click="click">IconItalic</IconItalic>',
  })

export const Default = Template.bind({})
