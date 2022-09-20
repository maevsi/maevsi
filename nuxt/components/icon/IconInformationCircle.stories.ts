import { defineComponent } from 'vue'
import IconInformationCircle from './IconInformationCircle.vue'

const argTypes = { click: { action: 'click' } }
type ArgTypesType = { argTypes: typeof argTypes }

export default {
  component: IconInformationCircle,
  title: 'icon/IconInformationCircle',
  argTypes,
}

const Template = (_: never, { argTypes }: ArgTypesType) =>
  defineComponent({
    components: { IconInformationCircle },
    props: Object.keys(argTypes),
    template:
      '<IconInformationCircle v-bind="$props" @click="click">IconInformationCircle</IconInformationCircle>',
  })

export const Default = Template.bind({})
