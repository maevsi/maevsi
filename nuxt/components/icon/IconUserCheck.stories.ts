import { defineComponent } from 'vue'
import IconUserCheck from './IconUserCheck.vue'

const argTypes = { click: { action: 'click' } }
type ArgTypesType = { argTypes: typeof argTypes }

export default {
  component: IconUserCheck,
  title: 'icon/IconUserCheck',
  argTypes,
}

const Template = (_: never, { argTypes }: ArgTypesType) =>
  defineComponent({
    components: { IconUserCheck },
    props: Object.keys(argTypes),
    template:
      '<IconUserCheck v-bind="$props" @click="click">IconUserCheck</IconUserCheck>',
  })

export const Default = Template.bind({})
