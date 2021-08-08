import { defineComponent } from '@nuxtjs/composition-api'
import EventIconVisibility from './EventIconVisibility.vue'

export default {
  component: EventIconVisibility,
  title: 'event/EventIconVisibility',
}

const Template = (_: never, { argTypes }: any) =>
  defineComponent({
    components: { EventIconVisibility },
    props: Object.keys(argTypes),
    template:
      // eslint-disable-next-line @intlify/vue-i18n/no-raw-text
      '<EventIconVisibility v-bind="$props">EventIconVisibility</EventIconVisibility>',
  })

export const Default = Template.bind({})
// @ts-ignore
Default.args = {
  event: {
    visibility: 'PUBLIC',
  },
}
