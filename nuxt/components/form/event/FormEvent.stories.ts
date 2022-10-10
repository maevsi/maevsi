import { defineComponent } from 'vue'
import FormEvent from './FormEvent.vue'

export default {
  component: FormEvent,
  title: 'form/event/FormEvent',
}

const Template = (_: never, { argTypes }: any) =>
  defineComponent({
    components: { FormEvent },
    props: Object.keys(argTypes),
    template: '<FormEvent v-bind="$props">FormEvent</FormEvent>',
  })

export const Default = Template.bind({})
