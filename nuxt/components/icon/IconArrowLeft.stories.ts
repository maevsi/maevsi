import { defineComponent } from 'vue'
import IconArrowLeft from './IconArrowLeft.vue'

const argTypes = { click: { action: 'click' } }
type ArgTypesType = { argTypes: typeof argTypes }

export default {
  component: IconArrowLeft,
  title: 'icon/IconArrowLeft',
  argTypes,
}

const Template = (_: never, { argTypes }: ArgTypesType) =>
  defineComponent({
    components: { IconArrowLeft },
    props: Object.keys(argTypes),
    template:
      '<IconArrowLeft v-bind="$props" @click="click">IconArrowLeft</IconArrowLeft>',
  })

export const Default = Template.bind({})
