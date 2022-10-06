import { defineComponent } from 'vue'
import IconCheckCircle from './IconCheckCircle.vue'

const argTypes = { click: { action: 'click' } }
type ArgTypesType = { argTypes: typeof argTypes }

export default {
  component: IconCheckCircle,
  title: 'icon/IconCheckCircle',
  argTypes,
}

const Template = (_: never, { argTypes }: ArgTypesType) =>
  defineComponent({
    components: { IconCheckCircle },
    props: Object.keys(argTypes),
    template:
      '<IconCheckCircle v-bind="$props" @click="click">IconCheckCircle</IconCheckCircle>',
  })

export const Default = Template.bind({})
