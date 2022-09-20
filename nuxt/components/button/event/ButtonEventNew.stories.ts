import { defineComponent } from 'vue'
import ButtonEventNew from './ButtonEventNew.vue'

const argTypes = { click: { action: 'click' } }
type ArgTypesType = { argTypes: typeof argTypes }

export default {
  component: ButtonEventNew,
  title: 'button/ButtonEventNew',
  argTypes,
}

const Template = (_: never, { argTypes }: ArgTypesType) =>
  defineComponent({
    components: { ButtonEventNew },
    props: Object.keys(argTypes),
    template:
      '<ButtonEventNew v-bind="$props" @click="click">ButtonEventNew</ButtonEventNew>',
  })

export const Default = Template.bind({})
