import ButtonTableInteraction from './ButtonTableInteraction.vue'

export default {
  component: ButtonTableInteraction,
  title: 'button/ButtonTableInteraction',
  argTypes: { click: { action: 'click' } },
}

const Template = (_, { argTypes }) => ({
  components: { ButtonTableInteraction },
  props: Object.keys(argTypes),
  template:
    // eslint-disable-next-line @intlify/vue-i18n/no-raw-text
    '<ButtonTableInteraction v-bind="$props" @click="click">ButtonTableInteraction</ButtonTableInteraction>',
})

export const Default = Template.bind({})
Default.args = {
  iconId: ['fas', 'home'],
}
