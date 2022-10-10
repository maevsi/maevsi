import { defineComponent } from 'vue'
import IconListOl from './IconListOl.vue'

const argTypes = { click: { action: 'click' } }
type ArgTypesType = { argTypes: typeof argTypes }

export default {
  component: IconListOl,
  title: 'icon/IconListOl',
  argTypes,
}

const Template = (_: never, { argTypes }: ArgTypesType) =>
  defineComponent({
    components: { IconListOl },
    props: Object.keys(argTypes),
    template:
      '<IconListOl v-bind="$props" @click="click">IconListOl</IconListOl>',
  })

export const Default = Template.bind({})
