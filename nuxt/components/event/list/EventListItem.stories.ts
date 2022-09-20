import MockDate from 'mockdate'

import { defineComponent } from 'vue'
import EventListItem from './EventListItem.vue'

MockDate.set('1970-01-01 00:00:00')

export default {
  component: EventListItem,
  title: 'event/list/EventListItem',
}

const Template = (_: never, { argTypes }: any) =>
  defineComponent({
    components: { EventListItem },
    props: Object.keys(argTypes),
    template: '<EventListItem v-bind="$props">EventListItem</EventListItem>',
  })

export const Default = Template.bind({})
// @ts-ignore
Default.args = {
  event: {
    authorUsername: 'authorUsername',
    description: 'description',
    name: 'name',
    visibility: 'PUBLIC',
  },
}
