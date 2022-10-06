import { defineComponent } from 'vue'
import MaevsiButton from './Button.vue'
import ButtonList from './ButtonList.vue'

const argTypes = { click: { action: 'click' } }
type ArgTypesType = { argTypes: typeof argTypes }

export default {
  component: ButtonList,
  title: 'button/ButtonList',
  argTypes,
}

const Template = (_: never, { argTypes }: ArgTypesType) =>
  defineComponent({
    components: { MaevsiButton, ButtonList },
    props: Object.keys(argTypes),
    template:
      '<ButtonList v-bind="$props" @click="click"><ButtonColored aria-label="ButtonColored">ButtonList</ButtonColored><ButtonColored aria-label="ButtonColored">ButtonList</ButtonColored><ButtonColored aria-label="ButtonColored">ButtonList</ButtonColored><ButtonColored aria-label="ButtonColored">ButtonList</ButtonColored><ButtonColored aria-label="ButtonColored">ButtonList</ButtonColored></ButtonList>',
  })

export const Default = Template.bind({})
