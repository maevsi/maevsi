<template>
  <div class="m-auto max-w-xl">
    <h1>{{ title }}</h1>
    <Form
      :errors="api.errors"
      :errors-pg-ids="{
        postgresP0002: t('postgresP0002'),
      }"
      :form="v$.form"
      :is-form-sent="isFormSent"
      :submit-name="t('submit')"
      @submit.prevent="submit"
    >
      <!-- The id's suffix `-maevsi` makes browser suggest inputs just for this service. -->
      <FormInput
        :id-label="`input-invitation-code-maevsi-${
          config.public.isInProduction ? 'prod' : 'dev'
        }`"
        :is-disabled="!!routeQueryIc"
        placeholder="xxxxxxxx-xxxx-xxxx-xxxx-xxxxxxxxxxxx"
        :title="t('invitationCode')"
        type="text"
        :value="v$.form.invitationCode"
        @input="form.invitationCode = $event"
      >
        <template #stateInfo>
          <FormInputStateInfo v-if="routeQueryIc">
            <div>
              {{ t('invitationCodeAutomatic') }}
              <AppLink :to="localePath('/task/event/unlock')">
                {{ t('invitationCodeManual') }}
              </AppLink>
            </div>
          </FormInputStateInfo>
        </template>
        <template #stateError>
          <FormInputStateError
            :form-input="v$.form.invitationCode"
            validation-property="formatUuid"
          >
            {{ t('globalValidationFormat') }}
          </FormInputStateError>
          <FormInputStateError
            :form-input="v$.form.invitationCode"
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
import { OperationResult } from '@urql/core/dist/types/types'
import { useVuelidate } from '@vuelidate/core'
import { required } from '@vuelidate/validators'
import consola from 'consola'
import Swal from 'sweetalert2'
import { LocationQueryValue } from 'vue-router'

import { callWithNuxt } from '#app'

import EVENT_UNLOCK_MUTATION from '~/gql/mutation/event/eventUnlock.gql'
import { useEventUnlockMutation } from '~/gql/generated'

definePageMeta({
  // TODO: fix upstream https://github.com/nuxt/framework/issues/8678
  layout: computed({
    get: () => {
      const route = useRoute()

      return 'redirect' in route.query ? 'canvas' : 'default'
    },
    set: () => {},
  }),
  middleware: [
    // TODO: callWithNuxt necessary as described in https://github.com/nuxt/framework/issues/6292
    async function (_to: any, _from: any) {
      const nuxtApp = useNuxtApp()
      const { $localePath, $urql } = useNuxtApp()
      const route = useRoute()
      const { jwtStore } = useJwtStore()

      if (
        !isQueryIcFormatValid(route.query.ic) ||
        'error' in route.query ||
        'redirect' in route.query
      )
        return

      const result = (await callWithNuxt(nuxtApp, () =>
        $urql.value
          .mutation(EVENT_UNLOCK_MUTATION, {
            invitationCode: route.query.ic,
          })
          .toPromise()
      )) as OperationResult<
        {
          eventUnlock: {
            eventUnlockResponse: {
              jwt: string
              authorUsername: string
              eventSlug: string
            }
          }
        },
        {
          invitationCode: LocationQueryValue | LocationQueryValue[]
        }
      >

      if (result.error) {
        consola.error(result.error)
      }

      if (!result.data?.eventUnlock?.eventUnlockResponse?.jwt) {
        return await callWithNuxt(nuxtApp, () =>
          navigateTo(
            $localePath({
              query: {
                ...route.query,
                error: null,
              },
            })
          )
        )
      }

      try {
        await jwtStore(result.data.eventUnlock.eventUnlockResponse.jwt)
      } catch (error) {
        consola.error(error)
        // TODO: t not available
        // await Swal.fire({
        //   icon: 'error',
        //   text: t('jwtStoreFail') as string,
        //   title: t('globalStatusError'),
        // })
        return
      }

      const eventPath = `/event/${result.data.eventUnlock.eventUnlockResponse.authorUsername}/${result.data.eventUnlock.eventUnlockResponse.eventSlug}`

      if ('quick' in route.query) {
        return await callWithNuxt(nuxtApp, () =>
          navigateTo($localePath(eventPath))
        )
      } else {
        return await callWithNuxt(nuxtApp, () =>
          navigateTo(
            $localePath({
              query: {
                ...route.query,
                redirect: $localePath(eventPath),
              },
            })
          )
        )
      }
    },
  ],
})

const { jwtStore } = useJwtStore()
const localePath = useLocalePath()
const { t } = useI18n()
const route = useRoute()
const eventUnlockMutation = useEventUnlockMutation()
const config = useRuntimeConfig()

// api data
const api = computed(() =>
  reactive({
    data: {
      ...eventUnlockMutation.data.value,
    },
    ...getApiMeta([eventUnlockMutation]),
  })
)

// data
const form = computed(() =>
  reactive({
    invitationCode: ref(route.query.ic),
  })
)
const isFormSent = ref(false)
const title = t('title')

// methods
async function submit() {
  try {
    await formPreSubmit(api, v$, isFormSent)
  } catch (error) {
    consola.error(error)
    return
  }

  const result = await eventUnlockMutation.executeMutation({
    invitationCode: form.value.invitationCode,
  })

  if (!result.data?.eventUnlock?.eventUnlockResponse) {
    return
  }

  try {
    await jwtStore(result.data?.eventUnlock?.eventUnlockResponse?.jwt)
  } catch (error) {
    consola.error(error)
    await Swal.fire({
      icon: 'error',
      text: t('jwtStoreFail') as string,
      title: t('globalStatusError'),
    })
    return
  }

  navigateTo(
    localePath(
      `/event/${result.data?.eventUnlock?.eventUnlockResponse?.authorUsername}/${result.data?.eventUnlock?.eventUnlockResponse?.eventSlug}`
    )
  )
}

// computations
const routeQueryIc = computed(() => route.query.ic)

// vuelidate
const rules = {
  form: {
    invitationCode: {
      required,
      formatUuid: VALIDATION_FORMAT_UUID,
    },
  },
}
const v$ = useVuelidate(rules, { form })

// lifecycle
onMounted(() => {
  if (route.query.ic) {
    v$.value.form.invitationCode?.$touch()

    if ('error' in route.query) {
      submit()
    }
  }
})
watch(eventUnlockMutation.error, (currentValue, _oldValue) => {
  if (currentValue) consola.error(currentValue)
})

// initialization
useHeadDefault(title)
</script>

<script lang="ts">
export default {
  name: 'IndexPage',
}
</script>

<i18n lang="yaml">
de:
  greetingExplanation: Einladungscodes gewähren dir Zugriff auf nicht-öffentliche Veranstaltungsseiten, ohne dass du dir einen Account erstellen musst. Sie sind gültig, solange du zur Veranstaltung eingeladen bist, für die sie ausgestellt wurden.
  invitationCode: Einladungscode
  invitationCodeAutomatic: Der Einladungscode wurde automatisch eingegeben.
  invitationCodeManual: Code selbst eingeben.
  jwtStoreFail: Fehler beim Speichern der Authentifizierungsdaten!
  postgresP0002: Zu diesem Einladungscode wurde keine Veranstaltung gefunden! Überprüfe deine Eingaben auf Schreibfehler.
  submit: Zur Veranstaltungsseite
  title: Veranstaltung freischalten
en:
  greetingExplanation: Invitation codes grant access to non-public event pages without the need to create an account. They are valid as long as you are invited to the event they were issued for.
  invitationCode: Invitation code
  invitationCodeAutomatic: The invitation code was entered automatically.
  invitationCodeManual: Enter it yourself.
  jwtStoreFail: Failed to store the authentication data!
  postgresP0002: No event was found for this invitation code! Check your input for spelling mistakes.
  submit: Show event page
  title: Unlock event
</i18n>
