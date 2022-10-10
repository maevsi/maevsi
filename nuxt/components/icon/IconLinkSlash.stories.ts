import { defineComponent } from 'vue'
import IconLinkSlash from './IconLinkSlash.vue'

const argTypes = { click: { action: 'click' } }
type ArgTypesType = { argTypes: typeof argTypes }

export default {
  component: IconLinkSlash,
  title: 'icon/IconLinkSlash',
  argTypes,
}

const Template = (_: never, { argTypes }: ArgTypesType) =>
  defineComponent({
    components: { IconLinkSlash },
    props: Object.keys(argTypes),
    template:
      '<IconLinkSlash v-bind="$props" @click="click">IconLinkSlash</IconLinkSlash>',
  })

export const Default = Template.bind({})
