import { defineComponent } from 'vue'
import IconPaperPlane from './IconPaperPlane.vue'

const argTypes = { click: { action: 'click' } }
type ArgTypesType = { argTypes: typeof argTypes }

export default {
  component: IconPaperPlane,
  title: 'icon/IconPaperPlane',
  argTypes,
}

const Template = (_: never, { argTypes }: ArgTypesType) =>
  defineComponent({
    components: { IconPaperPlane },
    props: Object.keys(argTypes),
    template:
      '<IconPaperPlane v-bind="$props" @click="click">IconPaperPlane</IconPaperPlane>',
  })

export const Default = Template.bind({})
