import { defineComponent } from 'vue'
import IconExclamation from './IconExclamation.vue'

const argTypes = { click: { action: 'click' } }
type ArgTypesType = { argTypes: typeof argTypes }

export default {
  component: IconExclamation,
  title: 'icon/IconExclamation',
  argTypes,
}

const Template = (_: never, { argTypes }: ArgTypesType) =>
  defineComponent({
    components: { IconExclamation },
    props: Object.keys(argTypes),
    template:
      '<IconExclamation v-bind="$props" @click="click">IconExclamation</IconExclamation>',
  })

export const Default = Template.bind({})
