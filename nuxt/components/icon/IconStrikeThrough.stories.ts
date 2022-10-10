import { defineComponent } from 'vue'
import IconStrikeThrough from './IconStrikeThrough.vue'

const argTypes = { click: { action: 'click' } }
type ArgTypesType = { argTypes: typeof argTypes }

export default {
  component: IconStrikeThrough,
  title: 'icon/IconStrikeThrough',
  argTypes,
}

const Template = (_: never, { argTypes }: ArgTypesType) =>
  defineComponent({
    components: { IconStrikeThrough },
    props: Object.keys(argTypes),
    template:
      '<IconStrikeThrough v-bind="$props" @click="click">IconStrikeThrough</IconStrikeThrough>',
  })

export const Default = Template.bind({})
