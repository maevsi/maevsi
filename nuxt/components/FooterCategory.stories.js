import FooterCategory from './FooterCategory.vue'

export default {
  component: FooterCategory,
  title: 'FooterCategory',
}

const Template = (_, { argTypes }) => ({
  components: { FooterCategory },
  props: Object.keys(argTypes),
  // eslint-disable-next-line @intlify/vue-i18n/no-raw-text
  template: '<FooterCategory v-bind="$props">FooterCategory</FooterCategory>',
})

export const Default = Template.bind({})
Default.args = {
  heading: 'Heading',
}
