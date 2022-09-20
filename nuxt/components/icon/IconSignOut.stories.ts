import { defineComponent } from 'vue'
import IconSignOut from './IconSignOut.vue'

const argTypes = { click: { action: 'click' } }
type ArgTypesType = { argTypes: typeof argTypes }

export default {
  component: IconSignOut,
  title: 'icon/IconSignOut',
  argTypes,
}

const Template = (_: never, { argTypes }: ArgTypesType) =>
  defineComponent({
    components: { IconSignOut },
    props: Object.keys(argTypes),
    template:
      '<IconSignOut v-bind="$props" @click="click">IconSignOut</IconSignOut>',
  })

export const Default = Template.bind({})
