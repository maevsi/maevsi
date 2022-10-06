import { defineComponent } from 'vue'
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
      '<ScrollContainer v-bind="$props">ScrollContainer</ScrollContainer>',
  })

export const Default = Template.bind({})
// @ts-ignore
Default.args = {
  hasNextPage: false,
}
