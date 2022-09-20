import { defineComponent } from 'vue'
import IconSearch from './IconSearch.vue'

const argTypes = { click: { action: 'click' } }
type ArgTypesType = { argTypes: typeof argTypes }

export default {
  component: IconSearch,
  title: 'icon/IconSearch',
  argTypes,
}

const Template = (_: never, { argTypes }: ArgTypesType) =>
  defineComponent({
    components: { IconSearch },
    props: Object.keys(argTypes),
    template:
      '<IconSearch v-bind="$props" @click="click">IconSearch</IconSearch>',
  })

export const Default = Template.bind({})
