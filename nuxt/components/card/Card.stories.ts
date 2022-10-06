import { defineComponent } from 'vue'
import Card from './Card.vue'

export default {
  component: Card,
  title: 'card/Card',
}

const Template = (_: never, { argTypes }: any) =>
  defineComponent({
    components: { Card },
    props: Object.keys(argTypes),
    template: '<Card v-bind="$props">Card</Card>',
  })

export const Default = Template.bind({})
