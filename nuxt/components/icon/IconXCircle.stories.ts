import { defineComponent } from 'vue'
import IconXCircle from './IconXCircle.vue'

const argTypes = { click: { action: 'click' } }
type ArgTypesType = { argTypes: typeof argTypes }

export default {
  component: IconXCircle,
  title: 'icon/IconXCircle',
  argTypes,
}

const Template = (_: never, { argTypes }: ArgTypesType) =>
  defineComponent({
    components: { IconXCircle },
    props: Object.keys(argTypes),
    template:
      '<IconXCircle v-bind="$props" @click="click">IconXCircle</IconXCircle>',
  })

export const Default = Template.bind({})
