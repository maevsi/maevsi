import { defineComponent } from 'vue'
import ButtonColored from './ButtonColored.vue'

const argTypes = { click: { action: 'click' } }
type ArgTypesType = { argTypes: typeof argTypes }

export default {
  component: ButtonColored,
  title: 'button/ButtonColored',
  argTypes,
}

const Template = (_: never, { argTypes }: ArgTypesType) =>
  defineComponent({
    components: { ButtonColored },
    props: Object.keys(argTypes),
    template:
      '<ButtonColored v-bind="$props" @click="click">ButtonColored</ButtonColored>',
  })

export const Default = Template.bind({})
// @ts-ignore
Default.args = {
  ariaLabel: 'ButtonColored',
}
