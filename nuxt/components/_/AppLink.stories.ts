import { defineComponent } from 'vue'
import AppLink from './AppLink.vue'

const argTypes = { click: { action: 'click' } }
type ArgTypesType = { argTypes: typeof argTypes }

export default {
  component: AppLink,
  title: 'AppLink',
  argTypes,
}

const Template = (_: never, { argTypes }: ArgTypesType) =>
  defineComponent({
    components: { AppLink },
    props: Object.keys(argTypes),
    template: '<AppLink v-bind="$props" @click="click">AppLink</AppLink>',
  })

export const Default = Template.bind({})
// @ts-ignore
Default.args = {
  to: '/',
}

export const External = Template.bind({})
// @ts-ignore
External.args = {
  to: 'https://example.com',
}
