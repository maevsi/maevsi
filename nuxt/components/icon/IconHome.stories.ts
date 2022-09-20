import { defineComponent } from 'vue'
import IconHome from './IconHome.vue'

const argTypes = { click: { action: 'click' } }
type ArgTypesType = { argTypes: typeof argTypes }

export default {
  component: IconHome,
  title: 'icon/IconHome',
  argTypes,
}

const Template = (_: never, { argTypes }: ArgTypesType) =>
  defineComponent({
    components: { IconHome },
    props: Object.keys(argTypes),
    template: '<IconHome v-bind="$props" @click="click">IconHome</IconHome>',
  })

export const Default = Template.bind({})
