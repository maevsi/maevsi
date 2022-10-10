import { defineComponent } from 'vue'
import IconEye from './IconEye.vue'

const argTypes = { click: { action: 'click' } }
type ArgTypesType = { argTypes: typeof argTypes }

export default {
  component: IconEye,
  title: 'icon/IconEye',
  argTypes,
}

const Template = (_: never, { argTypes }: ArgTypesType) =>
  defineComponent({
    components: { IconEye },
    props: Object.keys(argTypes),
    template: '<IconEye v-bind="$props" @click="click">IconEye</IconEye>',
  })

export const Default = Template.bind({})
