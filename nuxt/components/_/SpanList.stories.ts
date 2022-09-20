import { defineComponent } from 'vue'
import SpanList from './SpanList.vue'

export default {
  component: SpanList,
  title: 'SpanList',
}

const Template = (_: never, { argTypes }: any) =>
  defineComponent({
    components: { SpanList },
    props: Object.keys(argTypes),
    template: '<SpanList v-bind="$props">SpanList</SpanList>',
  })

export const Default = Template.bind({})
// @ts-ignore
Default.args = {
  span: 'Span',
}

export const Multiple = Template.bind({})
// @ts-ignore
Multiple.args = {
  span: ['Uno', 'Dos', 'Tres'],
}
