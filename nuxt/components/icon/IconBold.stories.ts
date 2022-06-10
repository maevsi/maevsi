import { defineComponent } from '#app'
import IconBold from './IconBold.vue'

const argTypes = { click: { action: 'click' } }
type ArgTypesType = { argTypes: typeof argTypes }

export default {
  component: IconBold,
  title: 'icon/IconBold',
  argTypes,
}

const Template = (_: never, { argTypes }: ArgTypesType) =>
  defineComponent({
    components: { IconBold },
    props: Object.keys(argTypes),
    template:
      // eslint-disable-next-line @intlify/vue-i18n/no-raw-text
      '<IconBold v-bind="$props" @click="click">IconBold</IconBold>',
  })

export const Default = Template.bind({})
