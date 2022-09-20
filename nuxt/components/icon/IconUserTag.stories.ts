import { defineComponent } from 'vue'
import IconUserTag from './IconUserTag.vue'

const argTypes = { click: { action: 'click' } }
type ArgTypesType = { argTypes: typeof argTypes }

export default {
  component: IconUserTag,
  title: 'icon/IconUserTag',
  argTypes,
}

const Template = (_: never, { argTypes }: ArgTypesType) =>
  defineComponent({
    components: { IconUserTag },
    props: Object.keys(argTypes),
    template:
      '<IconUserTag v-bind="$props" @click="click">IconUserTag</IconUserTag>',
  })

export const Default = Template.bind({})
