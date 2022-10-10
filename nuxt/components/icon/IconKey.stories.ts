import { defineComponent } from 'vue'
import IconKey from './IconKey.vue'

const argTypes = { click: { action: 'click' } }
type ArgTypesType = { argTypes: typeof argTypes }

export default {
  component: IconKey,
  title: 'icon/IconKey',
  argTypes,
}

const Template = (_: never, { argTypes }: ArgTypesType) =>
  defineComponent({
    components: { IconKey },
    props: Object.keys(argTypes),
    template: '<IconKey v-bind="$props" @click="click">IconKey</IconKey>',
  })

export const Default = Template.bind({})
