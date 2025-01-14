<template>
  <Loader :api="api">
    <div class="flex flex-col gap-4">
      <ScrollContainer
        v-if="event && invitations.length"
        class="max-h-[70vh]"
        :has-next-page="!!api.data.allInvitations?.pageInfo.hasNextPage"
        @load-more="after = api.data.allInvitations?.pageInfo.endCursor"
      >
        <table class="border border-neutral-300 dark:border-neutral-600">
          <LayoutThead
            class="sticky top-0 z-10 bg-background-bright dark:bg-background-dark"
          >
            <tr>
              <th scope="col">
                {{ t('contact') }}
              </th>
              <th scope="col" />
            </tr>
          </LayoutThead>
          <LayoutTbody>
            <InvitationListItem
              v-for="invitation in invitations"
              :key="invitation.id"
              :event="event"
              :invitation="invitation"
            />
          </LayoutTbody>
        </table>
      </ScrollContainer>
      <div v-else class="flex flex-col items-center gap-2">
        {{ t('invitationNone') }}
        <FormInputStateInfo>
          {{ t('hintInviteSelf') }}
        </FormInputStateInfo>
      </div>
      <div class="flex flex-col items-center gap-1">
        <ButtonColored
          :aria-label="t('invitationAdd')"
          :disabled="
            event.inviteeCountMaximum && api.data.allInvitations?.totalCount
              ? api.data.allInvitations.totalCount >= event.inviteeCountMaximum
              : false
          "
          @click="add()"
        >
          {{ t('invitationAdd') }}
          <template #prefix>
            <IHeroiconsPlus />
          </template>
        </ButtonColored>
        <p class="text-center text-gray-500 dark:text-gray-400">
          {{
            t('invitationsUsed', {
              amountCurrent: api.data.allInvitations?.totalCount,
              amountMaximum: event.inviteeCountMaximum || '∞',
            })
          }}
        </p>
      </div>
      <div v-if="api.data.allInvitations?.totalCount">
        <h2>
          {{ t('feedback') }}
        </h2>
        <div class="m-auto w-3/4 sm:w-1/2 xl:w-1/3 2xl:w-1/4">
          <Doughnut
            v-if="!runtimeConfig.public.vio.isTesting"
            ref="doughnutRef"
            :data="dataComputed"
            :options="options"
          />
        </div>
      </div>
      <Modal id="ModalInvitation" is-footer-hidden>
        <FormInvitation
          :event="event"
          :invitation-contact-ids-existing="invitations.map((i) => i.contactId)"
          @submit-success="onInvitationSubmitSuccess"
        />
        <template #header>
          {{ t('contactSelect') }}
        </template>
      </Modal>
    </div>
  </Loader>
</template>

<script setup lang="ts">
import {
  ArcElement,
  CategoryScale,
  Chart,
  DoughnutController,
  Legend,
  LinearScale,
  Title,
  Tooltip,
} from 'chart.js'
import { consola } from 'consola'
import { Doughnut } from 'vue-chartjs'

import { useAllInvitationsQuery } from '~~/gql/documents/queries/invitation/invitationsAll'
import type { EventItemFragment } from '~~/gql/generated/graphql'
import { getInvitationItem } from '~~/gql/documents/fragments/invitationItem'

export interface Props {
  event: Pick<
    EventItemFragment,
    'authorAccountId' | 'slug' | 'inviteeCountMaximum' | 'id'
  >
}
const props = withDefaults(defineProps<Props>(), {})

const colorMode = useColorMode()
const { t } = useI18n()
const store = useMaevsiStore()
const runtimeConfig = useRuntimeConfig()

// refs
const after = ref<string>()
const doughnutRef = ref<DoughnutController>()

// api data
const invitationsQuery = await useAllInvitationsQuery({
  after,
  eventId: props.event.id,
  first: ITEMS_PER_PAGE_LARGE,
})
const api = getApiData([invitationsQuery])

// data
const options = {
  plugins: {
    legend: {
      labels: {
        font: {
          fontFamily:
            'Manrope Variable, ui-sans-serif, system-ui, -apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, "Helvetica Neue", Arial, "Noto Sans", sans-serif, "Apple Color Emoji", "Segoe UI Emoji", "Segoe UI Symbol", "Noto Color Emoji"',
          size: 16,
        },
      },
      onClick: () => {},
    },
  },
}

// methods
const add = () => {
  invitationsQuery.pause()
  store.modals.push({ id: 'ModalInvitation' })
}
const onInvitationSubmitSuccess = () => {
  store.modalRemove('ModalInvitation')
  after.value = undefined
  invitationsQuery.resume()
}
const updateChart = () => {
  Chart.defaults.color = colorMode.value === 'dark' ? '#fff' : '#000'

  if (doughnutRef.value?.chart) {
    doughnutRef.value?.chart.update()
  }
}

// computations
const dataComputed = computed(() => {
  const datasetData = {
    accepted: 0,
    canceled: 0,
    none: 0,
  }

  if (invitations.value) {
    for (const invitation of invitations.value) {
      switch (invitation.feedback) {
        case 'ACCEPTED':
          datasetData.accepted += 1
          break
        case 'CANCELED':
          datasetData.canceled += 1
          break
        case null:
          datasetData.none += 1
          break
        default:
          consola.error('Unexpected invitation type.')
      }
    }
  }

  return {
    labels: [t('accepted'), t('canceled'), t('noFeedback')],
    datasets: [
      {
        data: Object.values(datasetData),
        backgroundColor: ['#00FF00', '#FF0000', '#888888'],
      },
    ],
  }
})
const invitations = computed(
  () =>
    invitationsQuery.data.value?.allInvitations?.nodes
      .map((x) => getInvitationItem(x))
      .filter(isNeitherNullNorUndefined) || [],
)

// lifecycle
watch(
  () => colorMode.value,
  (_currentValue, _oldValue) => updateChart(),
)
watch(
  () => doughnutRef.value?.chart,
  (_currentValue, _oldValue) => updateChart(),
)

// initialization
Chart.register(
  ArcElement,
  CategoryScale,
  LinearScale,
  DoughnutController,
  Title,
  Tooltip,
  Legend,
)
</script>

<i18n lang="yaml">
de:
  accepted: akzeptiert
  canceled: abgelehnt
  contact: Kontakt
  contactSelect: Kontakt auswählen
  feedback: Rückmeldungen
  hintInviteSelf: 'Tipp: du kannst dich auch zuerst selbst einladen'
  invitationAdd: Gäste hinzufügen
  invitationNone: Es wurde noch kein Gast hinzugefügt 😕
  invitationsUsed: 'Gästekontingent genutzt: {amountCurrent} / {amountMaximum}'
  noFeedback: keine Rückmeldung
en:
  accepted: accepted
  canceled: declined
  contact: Contact
  contactSelect: Select Contact
  feedback: Invitation responses
  hintInviteSelf: 'Hint: you can also invite yourself first'
  invitationAdd: Add guests
  invitationNone: No guest has been added yet 😕
  invitationsUsed: 'Guest quota used: {amountCurrent} / {amountMaximum}'
  noFeedback: no response
</i18n>
