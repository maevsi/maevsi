import { defineComponent } from 'vue'
import EmojiFacePleading from './EmojiFacePleading.vue'

const argTypes = { click: { action: 'click' } }
type ArgTypesType = { argTypes: typeof argTypes }

export default {
  component: EmojiFacePleading,
  title: 'icon/EmojiFacePleading',
  argTypes,
}

const Template = (_: never, { argTypes }: ArgTypesType) =>
  defineComponent({
    components: { EmojiFacePleading },
    props: Object.keys(argTypes),
    template:
      '<EmojiFacePleading v-bind="$props" @click="click">EmojiFacePleading</EmojiFacePleading>',
  })

export const Default = Template.bind({})
