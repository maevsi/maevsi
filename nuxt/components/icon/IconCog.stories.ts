import { defineComponent } from 'vue'
import IconCog from './IconCog.vue'

const argTypes = { click: { action: 'click' } }
type ArgTypesType = { argTypes: typeof argTypes }

export default {
  component: IconCog,
  title: 'icon/IconCog',
  argTypes,
}

const Template = (_: never, { argTypes }: ArgTypesType) =>
  defineComponent({
    components: { IconCog },
    props: Object.keys(argTypes),
    template: '<IconCog v-bind="$props" @click="click">IconCog</IconCog>',
  })

export const Default = Template.bind({})
