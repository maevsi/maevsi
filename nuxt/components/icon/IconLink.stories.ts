import { defineComponent } from '#app'
import IconLink from './IconLink.vue'

const argTypes = { click: { action: 'click' } }
type ArgTypesType = { argTypes: typeof argTypes }

export default {
  component: IconLink,
  title: 'icon/IconLink',
  argTypes,
}

const Template = (_: never, { argTypes }: ArgTypesType) =>
  defineComponent({
    components: { IconLink },
    props: Object.keys(argTypes),
    template:
      // eslint-disable-next-line @intlify/vue-i18n/no-raw-text
      '<IconLink v-bind="$props" @click="click">IconLink</IconLink>',
  })

export const Default = Template.bind({})
