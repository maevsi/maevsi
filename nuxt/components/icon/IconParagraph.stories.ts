import { defineComponent } from 'vue'
import IconParagraph from './IconParagraph.vue'

const argTypes = { click: { action: 'click' } }
type ArgTypesType = { argTypes: typeof argTypes }

export default {
  component: IconParagraph,
  title: 'icon/IconParagraph',
  argTypes,
}

const Template = (_: never, { argTypes }: ArgTypesType) =>
  defineComponent({
    components: { IconParagraph },
    props: Object.keys(argTypes),
    template:
      '<IconParagraph v-bind="$props" @click="click">IconParagraph</IconParagraph>',
  })

export const Default = Template.bind({})
