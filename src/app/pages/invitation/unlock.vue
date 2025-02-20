<template>
  <div class="m-auto max-w-xl">
    <h1>{{ title }}</h1>
    <Form
      :errors="api.errors"
      :errors-pg-ids="{
        postgresP0002: t('postgresP0002'),
      }"
      :form="v$"
      :is-form-sent="isFormSent"
      :submit-name="t('submit')"
      @submit.prevent="submit"
    >
      <!-- TODO: move id-label suffix to FormInput (https://github.com/maevsi/maevsi/issues/955) -->
      <!-- The id's suffix `-maevsi` makes browser suggest inputs just for this service. -->
      <FormInput
        id-label="input-invitation-id-maevsi"
        :is-disabled="!!routeQueryIc"
        placeholder="xxxxxxxx-xxxx-xxxx-xxxx-xxxxxxxxxxxx"
        :title="t('invitationId')"
        type="text"
        :value="v$.invitationId"
        @input="form.invitationId = $event"
      >
        <template #stateInfo>
          <FormInputStateInfo v-if="routeQueryIc">
            <div>
              {{ t('invitationIdAutomatic') }}
              <AppLink :to="localePath('invitation-unlock')">
                {{ t('invitationIdManual') }}
              </AppLink>
            </div>
          </FormInputStateInfo>
        </template>
        <template #stateError>
          <FormInputStateError
            :form-input="v$.invitationId"
            validation-property="formatUuid"
          >
            {{ t('globalValidationFormat') }}
          </FormInputStateError>
          <FormInputStateError
            :form-input="v$.invitationId"
            validation-property="required"
          >
            {{ t('globalValidationRequired') }}
          </FormInputStateError>
        </template>
      </FormInput>
    </Form>
    <p class="mt-2">
      {{ t('greetingExplanation') }}
    </p>
  </div>
</template>

<script setup lang="ts">
import { useVuelidate } from '@vuelidate/core'
import { consola } from 'consola'

import {
  eventUnlockMutation as eventUnlockMutationImported,
  useEventUnlockMutation,
} from '~~/gql/documents/mutations/event/eventUnlock'

definePageMeta({
  layout: computed(() => {
    const route = useRoute()

    return 'redirect' in route.query ? 'canvas' : 'default'
  }),
  middleware: [
    // TODO: implement invitation pages, removing this middleware (https://github.com/maevsi/maevsi/issues/1266)

    // middlewares with multiple awaits that rely on the nuxt context
    // must be wrapped with `defineNuxtRouteMiddleware` (https://github.com/nuxt/nuxt/issues/14473)
    defineNuxtRouteMiddleware(async (to) => {
      const { $urql } = useNuxtApp()
      const localePath = useLocalePath()
      const { jwtStore } = await useJwtStore()

      if (
        !isQueryIcFormatValid(to.query.ic) ||
        'error' in to.query ||
        'redirect' in to.query
      )
        return

      const result = await $urql.value
        .mutation(eventUnlockMutationImported, {
          invitationId: to.query.ic,
        })
        .toPromise()

      if (result.error) {
        consola.error(result.error)
      }

      if (!result.data?.eventUnlock?.eventUnlockResponse?.jwt) {
        return await navigateTo(
          localePath({
            path: `/invitation/unlock`,
            query: {
              ...to.query,
              error: null,
            },
          }),
        )
      }

      try {
        await jwtStore(result.data.eventUnlock.eventUnlockResponse.jwt)
      } catch (error) {
        consola.error(error)
        return
      }

      if (
        !result.data.eventUnlock.eventUnlockResponse.authorAccountUsername ||
        !result.data.eventUnlock.eventUnlockResponse.eventSlug
      ) {
        throw new Error('Author account username or event slug missing!')
      }

      if ('quick' in to.query) {
        return await navigateTo(
          localePath({
            name: 'event-view-username-event_name',
            params: {
              username:
                result.data.eventUnlock.eventUnlockResponse
                  .authorAccountUsername,
              event_name: result.data.eventUnlock.eventUnlockResponse.eventSlug,
            },
          }),
        )
      } else {
        return await navigateTo(
          localePath({
            path: `/invitation/unlock`,
            query: {
              ...to.query,
              redirect: localePath({
                name: 'event-view-username-event_name',
                params: {
                  username:
                    result.data.eventUnlock.eventUnlockResponse
                      .authorAccountUsername,
                  event_name:
                    result.data.eventUnlock.eventUnlockResponse.eventSlug,
                },
              }).toString(),
            },
          }),
        )
      }
    }),
  ],
})

const { jwtStore } = await useJwtStore()
const localePath = useLocalePath()
const { t } = useI18n()
const route = useRoute()
const fireAlert = useFireAlert()

// api data
const eventUnlockMutation = useEventUnlockMutation()
const api = getApiData([eventUnlockMutation])

// data
const form = reactive({
  invitationId: ref(route.query.ic),
})
const isFormSent = ref(false)
const title = t('title')

// methods
const submit = async () => {
  if (!isFormValid({ v$, isFormSent })) return

  const result = await eventUnlockMutation.executeMutation({
    invitationId: form.invitationId,
  })

  if (!result.data?.eventUnlock?.eventUnlockResponse) {
    return
  }

  try {
    await jwtStore(result.data?.eventUnlock?.eventUnlockResponse?.jwt)
  } catch (error) {
    await fireAlert({
      error,
      level: 'error',
      text: t('jwtStoreFail'),
      title: t('globalStatusError'),
    })
    return
  }

  navigateTo(
    localePath({
      name: 'event-view-username-event_name',
      params: {
        username:
          result.data?.eventUnlock?.eventUnlockResponse?.authorAccountUsername,
        event_name: result.data?.eventUnlock?.eventUnlockResponse?.eventSlug,
      },
    }),
  )
}

// computations
const routeQueryIc = computed(() => route.query.ic)

// vuelidate
const rules = {
  invitationId: VALIDATION_UUID(),
}
const v$ = useVuelidate(rules, form)

// lifecycle
onMounted(() => {
  if (route.query.ic) {
    v$.value.invitationId?.$touch()

    if ('error' in route.query) {
      submit()
    }
  }
})

// initialization
useHeadDefault({ title })
</script>

<i18n lang="yaml">
de:
  greetingExplanation: Einladungscodes gewähren dir Zugriff auf nicht-öffentliche Veranstaltungsseiten, ohne dass du dir einen Account erstellen musst. Sie sind gültig, solange du zur Veranstaltung eingeladen bist, für die sie ausgestellt wurden.
  invitationId: Einladungscode
  invitationIdAutomatic: Der Einladungscode wurde automatisch eingegeben.
  invitationIdManual: Code selbst eingeben.
  jwtStoreFail: Fehler beim Speichern der Authentifizierungsdaten!
  postgresP0002: Zu diesem Einladungscode wurde keine Veranstaltung gefunden! Überprüfe deine Eingaben auf Schreibfehler.
  submit: Zur Veranstaltungsseite
  title: Veranstaltung freischalten
en:
  greetingExplanation: Invitation codes grant access to non-public event pages without the need to create an account. They are valid as long as you are invited to the event they were issued for.
  invitationId: Invitation code
  invitationIdAutomatic: The invitation code was entered automatically.
  invitationIdManual: Enter it yourself.
  jwtStoreFail: Failed to store the authentication data!
  postgresP0002: No event was found for this invitation code! Check your input for spelling mistakes.
  submit: Show event page
  title: Unlock event
</i18n>
