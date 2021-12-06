import Loader from './Loader.vue'

import { defineComponent } from '#app'

export default {
  component: Loader,
  title: 'loader/Loader',
}

const Template = (_: never, { argTypes }: any) =>
  defineComponent({
    components: { Loader },
    props: Object.keys(argTypes),
    // eslint-disable-next-line @intlify/vue-i18n/no-raw-text
    template: '<Loader v-bind="$props">Loader</Loader>',
  })

export const Default = Template.bind({})
// @ts-ignore
Default.args = {
  errorMessage: undefined,
}
