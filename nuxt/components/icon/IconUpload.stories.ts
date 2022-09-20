import { defineComponent } from 'vue'
import IconUpload from './IconUpload.vue'

const argTypes = { click: { action: 'click' } }
type ArgTypesType = { argTypes: typeof argTypes }

export default {
  component: IconUpload,
  title: 'icon/IconUpload',
  argTypes,
}

const Template = (_: never, { argTypes }: ArgTypesType) =>
  defineComponent({
    components: { IconUpload },
    props: Object.keys(argTypes),
    template:
      '<IconUpload v-bind="$props" @click="click">IconUpload</IconUpload>',
  })

export const Default = Template.bind({})
