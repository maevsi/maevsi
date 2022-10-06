import { defineComponent } from 'vue'
import IconMapMarker from './IconMapMarker.vue'

const argTypes = { click: { action: 'click' } }
type ArgTypesType = { argTypes: typeof argTypes }

export default {
  component: IconMapMarker,
  title: 'icon/IconMapMarker',
  argTypes,
}

const Template = (_: never, { argTypes }: ArgTypesType) =>
  defineComponent({
    components: { IconMapMarker },
    props: Object.keys(argTypes),
    template:
      '<IconMapMarker v-bind="$props" @click="click">IconMapMarker</IconMapMarker>',
  })

export const Default = Template.bind({})
