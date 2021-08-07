import { defineComponent } from '@nuxtjs/composition-api'
import FormEvent from './FormEvent.vue'

export default {
  component: FormEvent,
  title: 'form/event/FormEvent',
}

const Template = (_: never, { argTypes }: any) =>
  defineComponent({
    components: { FormEvent },
    props: Object.keys(argTypes),
    // eslint-disable-next-line @intlify/vue-i18n/no-raw-text
    template: '<FormEvent v-bind="$props">FormEvent</FormEvent>',
  })

export const Default = Template.bind({})
