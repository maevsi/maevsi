import { defineComponent } from 'vue'
import IconHeading from './IconHeading.vue'

const argTypes = { click: { action: 'click' } }
type ArgTypesType = { argTypes: typeof argTypes }

export default {
  component: IconHeading,
  title: 'icon/IconHeading',
  argTypes,
}

const Template = (_: never, { argTypes }: ArgTypesType) =>
  defineComponent({
    components: { IconHeading },
    props: Object.keys(argTypes),
    template:
      '<IconHeading v-bind="$props" @click="click">IconHeading</IconHeading>',
  })

export const Default = Template.bind({})
