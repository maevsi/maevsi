import { defineComponent } from 'vue'
import IconX from './IconX.vue'

const argTypes = { click: { action: 'click' } }
type ArgTypesType = { argTypes: typeof argTypes }

export default {
  component: IconX,
  title: 'icon/IconX',
  argTypes,
}

const Template = (_: never, { argTypes }: ArgTypesType) =>
  defineComponent({
    components: { IconX },
    props: Object.keys(argTypes),
    template: '<IconX v-bind="$props" @click="click">IconX</IconX>',
  })

export const Default = Template.bind({})
