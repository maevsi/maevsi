import { defineComponent } from 'vue'
import IconUser from './IconUser.vue'

const argTypes = { click: { action: 'click' } }
type ArgTypesType = { argTypes: typeof argTypes }

export default {
  component: IconUser,
  title: 'icon/IconUser',
  argTypes,
}

const Template = (_: never, { argTypes }: ArgTypesType) =>
  defineComponent({
    components: { IconUser },
    props: Object.keys(argTypes),
    template: '<IconUser v-bind="$props" @click="click">IconUser</IconUser>',
  })

export const Default = Template.bind({})
