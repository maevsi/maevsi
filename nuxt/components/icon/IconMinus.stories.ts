import { defineComponent } from 'vue'
import IconMinus from './IconMinus.vue'

const argTypes = { click: { action: 'click' } }
type ArgTypesType = { argTypes: typeof argTypes }

export default {
  component: IconMinus,
  title: 'icon/IconMinus',
  argTypes,
}

const Template = (_: never, { argTypes }: ArgTypesType) =>
  defineComponent({
    components: { IconMinus },
    props: Object.keys(argTypes),
    template: '<IconMinus v-bind="$props" @click="click">IconMinus</IconMinus>',
  })

export const Default = Template.bind({})
