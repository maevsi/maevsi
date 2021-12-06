import FooterCategory from './FooterCategory.vue'

import { defineComponent } from '#app'

export default {
  component: FooterCategory,
  title: 'FooterCategory',
}

const Template = (_: never, { argTypes }: any) =>
  defineComponent({
    components: { FooterCategory },
    props: Object.keys(argTypes),
    // eslint-disable-next-line @intlify/vue-i18n/no-raw-text
    template: '<FooterCategory v-bind="$props">FooterCategory</FooterCategory>',
  })

export const Default = Template.bind({})
// @ts-ignore
Default.args = {
  heading: 'Heading',
}
