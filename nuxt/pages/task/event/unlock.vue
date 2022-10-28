<template>
  <div class="m-auto max-w-xl">
    <h1>{{ title }}</h1>
    <Form
      :errors="api.errors"
      :form="v$.form"
      :is-form-sent="isFormSent"
      :submit-name="t('submit')"
      @submit.prevent="submit"
    >
      <!-- The id's suffix `-maevsi` makes browser suggest inputs just for this service. -->
      <FormInput
        :id-label="`input-invitation-code-maevsi-${
          isDevelopmentActive ? 'dev' : 'prod'
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
import { useVuelidate } from '@vuelidate/core'
import { required } from '@vuelidate/validators'
import consola from 'consola'
import Swal from 'sweetalert2'

import { useJwtStore } from '~/plugins/util/auth'
import {
  formPreSubmit,
  REGEX_UUID,
  VALIDATION_FORMAT_UUID,
} from '~/plugins/util/validation'
import { getApiMeta } from '~/plugins/util/util'
import { useEventUnlockMutation } from '~/gql/generated'
import { useMaevsiStore } from '~/store'

definePageMeta({
  layout:
    // TODO:
    REGEX_UUID.test('routeQueryIc') && !('error' in ['context.route.query'])
      ? 'canvas'
      : 'default',
  middleware: [
    async function (_to: any, _from: any) {
      const { $urqlReset, ssrContext } = useNuxtApp()
      const { $localePath } = useNuxtApp()
      const route = useRoute()
      const store = useMaevsiStore()

      if (
        !Array.isArray(route.query.ic) &&
        route.query.ic &&
        REGEX_UUID.test(route.query.ic)
      ) {
        const result = await useEventUnlockMutation().executeMutation({
          invitationCode: route.query.ic,
        })

        if (result.error) {
          consola.error(result.error)
        }

        if (!result.data?.eventUnlock?.eventUnlockResponse) {
          return navigateTo(
            $localePath({
              query: {
                ...route.query,
                error: null,
              },
            })
          )
        }

        try {
          await jwtStore(result.data.eventUnlock.eventUnlockResponse.jwt)
        } catch (error) {
          consola.debug(error)
          await Swal.fire({
            icon: 'error',
            text: t('jwtStoreFail') as string,
            title: t('globalStatusError'),
          })
          return
        }

        if ('quick' in route.query) {
          navigateTo(
            $localePath(
              `/event/${result.data.eventUnlock.eventUnlockResponse.authorUsername}/${result.data.eventUnlock.eventUnlockResponse.eventSlug}`
            )
          )
        } else {
          navigateTo(
            $localePath({
              query: {
                ...route.query,
                redirect: $localePath(
                  `/event/${result.data.eventUnlock.eventUnlockResponse.authorUsername}/${result.data.eventUnlock.eventUnlockResponse.eventSlug}`
                ),
              },
            })
          )
        }
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
const api = computed(() => {
  return {
    data: {
      ...eventUnlockMutation.data.value,
    },
    ...getApiMeta([eventUnlockMutation]),
  }
})

// data
const form = reactive({
  invitationCode: ref(
    route.query.ic === undefined ? undefined : route.query.ic
  ),
})
const isDevelopmentActive = config.public.isInDevelopment
const isFormSent = ref(false)
const routeQueryIc = route.query.ic
const title = t('title')

// methods
async function submit() {
  try {
    await formPreSubmit({ api }, v$, isFormSent)
  } catch (error) {
    consola.debug(error)
    return
  }

  const result = await eventUnlockMutation.executeMutation({
    invitationCode: form.invitationCode,
  })

  if (result.error) {
    api.value.errors.push(result.error)
    consola.error(result.error)
  }

  if (!result.data?.eventUnlock?.eventUnlockResponse) {
    return
  }

  try {
    await jwtStore(result.data?.eventUnlock?.eventUnlockResponse?.jwt)
  } catch (error) {
    consola.debug(error)
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

// lifecycle
onMounted(() => {
  if (route.query.ic) {
    v$.value.form.invitationCode?.$touch()

    if ('error' in route.query) {
      submit()
    }
  }
})

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

// initialization
useHeadDefault(title)
</script>

<script lang="ts">
export default {
  name: 'IndexPage',
}
</script>

<i18n lang="yml">
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
