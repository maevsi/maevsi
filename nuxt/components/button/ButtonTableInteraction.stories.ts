import { defineComponent } from '@nuxtjs/composition-api'
import ButtonTableInteraction from './ButtonTableInteraction.vue'

const argTypes = { click: { action: 'click' } }
type ArgTypesType = { argTypes: typeof argTypes }

export default {
  component: ButtonTableInteraction,
  title: 'button/ButtonTableInteraction',
  argTypes,
}

const Template = (_: never, { argTypes }: ArgTypesType) =>
  defineComponent({
    components: { ButtonTableInteraction },
    props: Object.keys(argTypes),
    template:
      // eslint-disable-next-line @intlify/vue-i18n/no-raw-text
      '<ButtonTableInteraction v-bind="$props" @click="click">ButtonTableInteraction</ButtonTableInteraction>',
  })

export const Default = Template.bind({})
// @ts-ignore
Default.args = {
  iconId: ['fas', 'home'],
}
