import { defineComponent } from '#app'
import ScrollContainer from './ScrollContainer.vue'

export default {
  component: ScrollContainer,
  title: 'ScrollContainer',
}

const Template = (_: never, { argTypes }: any) =>
  defineComponent({
    components: { ScrollContainer },
    props: Object.keys(argTypes),
    template:
      // eslint-disable-next-line @intlify/vue-i18n/no-raw-text
      '<ScrollContainer v-bind="$props">ScrollContainer</ScrollContainer>',
  })

export const Default = Template.bind({})
// @ts-ignore
Default.args = {
  hasNextPage: false,
}
