import { defineComponent } from 'vue'
import IconArrowRotateLeft from './IconArrowRotateLeft.vue'

const argTypes = { click: { action: 'click' } }
type ArgTypesType = { argTypes: typeof argTypes }

export default {
  component: IconArrowRotateLeft,
  title: 'icon/IconArrowRotateLeft',
  argTypes,
}

const Template = (_: never, { argTypes }: ArgTypesType) =>
  defineComponent({
    components: { IconArrowRotateLeft },
    props: Object.keys(argTypes),
    template:
      '<IconArrowRotateLeft v-bind="$props" @click="click">IconArrowRotateLeft</IconArrowRotateLeft>',
  })

export const Default = Template.bind({})
