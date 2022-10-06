import { defineComponent } from 'vue'
import IconListUl from './IconListUl.vue'

const argTypes = { click: { action: 'click' } }
type ArgTypesType = { argTypes: typeof argTypes }

export default {
  component: IconListUl,
  title: 'icon/IconListUl',
  argTypes,
}

const Template = (_: never, { argTypes }: ArgTypesType) =>
  defineComponent({
    components: { IconListUl },
    props: Object.keys(argTypes),
    template:
      '<IconListUl v-bind="$props" @click="click">IconListUl</IconListUl>',
  })

export const Default = Template.bind({})
