import { defineComponent } from '#app'
import IconArrowRotateRight from './IconArrowRotateRight.vue'

const argTypes = { click: { action: 'click' } }
type ArgTypesType = { argTypes: typeof argTypes }

export default {
  component: IconArrowRotateRight,
  title: 'icon/IconArrowRotateRight',
  argTypes,
}

const Template = (_: never, { argTypes }: ArgTypesType) =>
  defineComponent({
    components: { IconArrowRotateRight },
    props: Object.keys(argTypes),
    template:
      // eslint-disable-next-line @intlify/vue-i18n/no-raw-text
      '<IconArrowRotateRight v-bind="$props" @click="click">IconArrowRotateRight</IconArrowRotateRight>',
  })

export const Default = Template.bind({})
