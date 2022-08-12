import { defineComponent } from '#app'
import Tag from './Tag.vue'

export default {
  component: Tag,
  title: 'Tag',
}

const Template = (_: never, { argTypes }: any) =>
  defineComponent({
    components: { Tag },
    props: Object.keys(argTypes),
    // eslint-disable-next-line @intlify/vue-i18n/no-raw-text
    template: '<Tag v-bind="$props">Tag</Tag>',
  })

export const Default = Template.bind({})
// @ts-ignore
Default.args = {
  tabs: [
    ['Tag1', 'Tag'],
    ['Tag2', 'Tag'],
  ],
}
