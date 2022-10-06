import { defineComponent } from 'vue'
import ButtonHome from './ButtonHome.vue'

const argTypes = { click: { action: 'click' } }
type ArgTypesType = { argTypes: typeof argTypes }

export default {
  component: ButtonHome,
  title: 'button/ButtonHome',
  argTypes,
}

const Template = (_: never, { argTypes }: ArgTypesType) =>
  defineComponent({
    components: { ButtonHome },
    props: Object.keys(argTypes),
    template:
      '<ButtonHome v-bind="$props" @click="click">ButtonHome</ButtonHome>',
  })

export const Default = Template.bind({})
