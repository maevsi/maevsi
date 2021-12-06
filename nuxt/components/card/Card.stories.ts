import Card from './Card.vue'

import { defineComponent } from '#app'

export default {
  component: Card,
  title: 'card/Card',
}

const Template = (_: never, { argTypes }: any) =>
  defineComponent({
    components: { Card },
    props: Object.keys(argTypes),
    // eslint-disable-next-line @intlify/vue-i18n/no-raw-text
    template: '<Card v-bind="$props">Card</Card>',
  })

export const Default = Template.bind({})
