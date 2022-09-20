import { defineComponent } from 'vue'
import IconArrowRight from './IconArrowRight.vue'

const argTypes = { click: { action: 'click' } }
type ArgTypesType = { argTypes: typeof argTypes }

export default {
  component: IconArrowRight,
  title: 'icon/IconArrowRight',
  argTypes,
}

const Template = (_: never, { argTypes }: ArgTypesType) =>
  defineComponent({
    components: { IconArrowRight },
    props: Object.keys(argTypes),
    template:
      '<IconArrowRight v-bind="$props" @click="click">IconArrowRight</IconArrowRight>',
  })

export const Default = Template.bind({})
