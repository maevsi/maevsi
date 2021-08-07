import { defineComponent } from '@nuxtjs/composition-api'
import FormDelete from './FormDelete.vue'

export default {
  component: FormDelete,
  title: 'form/FormDelete',
}

const Template = (_: never, { argTypes }: any) =>
  defineComponent({
    components: { FormDelete },
    props: Object.keys(argTypes),
    // eslint-disable-next-line @intlify/vue-i18n/no-raw-text
    template: '<FormDelete v-bind="$props">FormDelete</FormDelete>',
  })

export const Default = Template.bind({})
