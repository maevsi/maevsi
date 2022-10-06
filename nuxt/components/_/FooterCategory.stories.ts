import { defineComponent } from 'vue'
import FooterCategory from './FooterCategory.vue'

export default {
  component: FooterCategory,
  title: 'FooterCategory',
}

const Template = (_: never, { argTypes }: any) =>
  defineComponent({
    components: { FooterCategory },
    props: Object.keys(argTypes),
    template: '<FooterCategory v-bind="$props">FooterCategory</FooterCategory>',
  })

export const Default = Template.bind({})
// @ts-ignore
Default.args = {
  heading: 'Heading',
}
