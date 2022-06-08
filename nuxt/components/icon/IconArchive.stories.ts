import { defineComponent } from '#app'
import IconArchive from './IconArchive.vue'

const argTypes = { click: { action: 'click' } }
type ArgTypesType = { argTypes: typeof argTypes }

export default {
  component: IconArchive,
  title: 'icon/IconArchive',
  argTypes,
}

const Template = (_: never, { argTypes }: ArgTypesType) =>
  defineComponent({
    components: { IconArchive },
    props: Object.keys(argTypes),
    template:
      // eslint-disable-next-line @intlify/vue-i18n/no-raw-text
      '<IconArchive v-bind="$props" @click="click">IconArchive</IconArchive>',
  })

export const Default = Template.bind({})
