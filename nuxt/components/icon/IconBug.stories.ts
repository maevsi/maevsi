import { defineComponent } from 'vue'
import IconBug from './IconBug.vue'

const argTypes = { click: { action: 'click' } }
type ArgTypesType = { argTypes: typeof argTypes }

export default {
  component: IconBug,
  title: 'icon/IconBug',
  argTypes,
}

const Template = (_: never, { argTypes }: ArgTypesType) =>
  defineComponent({
    components: { IconBug },
    props: Object.keys(argTypes),
    template: '<IconBug v-bind="$props" @click="click">IconBug</IconBug>',
  })

export const Default = Template.bind({})
