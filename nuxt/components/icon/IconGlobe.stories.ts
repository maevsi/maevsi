import { defineComponent } from 'vue'
import IconGlobe from './IconGlobe.vue'

const argTypes = { click: { action: 'click' } }
type ArgTypesType = { argTypes: typeof argTypes }

export default {
  component: IconGlobe,
  title: 'icon/IconGlobe',
  argTypes,
}

const Template = (_: never, { argTypes }: ArgTypesType) =>
  defineComponent({
    components: { IconGlobe },
    props: Object.keys(argTypes),
    template: '<IconGlobe v-bind="$props" @click="click">IconGlobe</IconGlobe>',
  })

export const Default = Template.bind({})
