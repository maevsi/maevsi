import { defineComponent } from 'vue'
import IconPlus from './IconPlus.vue'

const argTypes = { click: { action: 'click' } }
type ArgTypesType = { argTypes: typeof argTypes }

export default {
  component: IconPlus,
  title: 'icon/IconPlus',
  argTypes,
}

const Template = (_: never, { argTypes }: ArgTypesType) =>
  defineComponent({
    components: { IconPlus },
    props: Object.keys(argTypes),
    template: '<IconPlus v-bind="$props" @click="click">IconPlus</IconPlus>',
  })

export const Default = Template.bind({})
