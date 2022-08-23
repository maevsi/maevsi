<template>
  <div class="m-auto max-w-xl">
    <h1>{{ title }}</h1>
    <Form
      :errors="api.errors"
      :form="v$.form"
      :is-form-sent="isFormSent"
      :submit-name="$t('submit')"
      @submit.prevent="submit"
    >
      <!-- The id's suffix `-maevsi` makes browser suggest inputs just for this service. -->
      <FormInput
        :id-label="`input-invitation-code-maevsi-${
          $config.dev ? 'dev' : 'prod'
        }`"
        :is-disabled="!!$route.query.ic"
        placeholder="xxxxxxxx-xxxx-xxxx-xxxx-xxxxxxxxxxxx"
        :title="$t('invitationCode')"
        type="text"
        :value="v$.form.invitationCode"
        @input="form.invitationCode = $event"
      >
        <template slot="stateInfo">
          <FormInputStateInfo v-if="$route.query.ic">
            <div>
              {{ $t('invitationCodeAutomatic') }}
              <AppLink :to="localePath('/task/event/unlock')">
                {{ $t('invitationCodeManual') }}
              </AppLink>
            </div>
          </FormInputStateInfo>
        </template>
        <template slot="stateError">
          <FormInputStateError
            :form-input="v$.form.invitationCode"
            validation-property="formatUuid"
          >
            {{ $t('globalValidationFormat') }}
          </FormInputStateError>
          <FormInputStateError
            :form-input="v$.form.invitationCode"
            validation-property="required"
          >
            {{ $t('globalValidationRequired') }}
          </FormInputStateError>
        </template>
      </FormInput>
    </Form>
    <p class="mt-2">
      {{ $t('greetingExplanation') }}
    </p>
  </div>
</template>

<script lang="ts">
import { Context } from '@nuxt/types-edge'
import { useVuelidate } from '@vuelidate/core'
import { required } from '@vuelidate/validators'
import consola from 'consola'
import { computed, onMounted, reactive, toRef } from 'vue'
import { useI18n } from 'vue-i18n-composable'

import { defineComponent, useNuxtApp, useRoute } from '#app'
import { useHead } from '#head'

import { jwtStore, useJwtStore } from '~/plugins/util/auth'
import EVENT_UNLOCK_MUTATION from '~/gql/mutation/event/eventUnlock.gql'
import {
  formPreSubmit,
  REGEX_UUID,
  VALIDATION_FORMAT_UUID,
} from '~/plugins/util/validation'
import { getApiMeta } from '~/plugins/util/util'
import { useEventUnlockMutation } from '~/gql/generated'
import { useMaevsiStore } from '~/store'

export default defineComponent({
  name: 'IndexPage',
  layout(context: Context) {
    return isQueryIcFormatValid(context) && !('error' in context.route.query)
      ? 'canvas'
      : 'default'
  },
  async middleware(context: Context): Promise<void> {
    const { app, redirect, res, route, $pinia } = context

    const store = useMaevsiStore($pinia)

    if (isQueryIcFormatValid(context)) {
      const result = await app.$urql.value
        .query(EVENT_UNLOCK_MUTATION, {
          invitationCode: route.query.ic,
        })
        .toPromise()

      if (result.error) {
        consola.error(result.error)
      }

      if (!result.data.eventUnlock.eventUnlockResponse) {
        return redirect(
          app.localePath({
            query: {
              ...route.query,
              error: null,
            },
          })
        )
      }

      await jwtStore(app.$urqlReset, store, res, result.jwt)

      if ('quick' in route.query) {
        return redirect(
          app.localePath(`/event/${result.authorUsername}/${result.eventSlug}`)
        )
      } else {
        return redirect(
          app.localePath({
            query: {
              ...route.query,
              redirect: app.localePath(
                `/event/${result.authorUsername}/${result.eventSlug}`
              ),
            },
          })
        )
      }
    }
  },
  transition: {
    name: 'layout',
  },
  setup() {
    const { jwtStore } = useJwtStore()
    const { $router, localePath } = useNuxtApp()
    const { t } = useI18n()
    const route = useRoute()
    const eventUnlockMutation = useEventUnlockMutation()

    const apiData = {
      api: computed(() => {
        return {
          data: {
            ...eventUnlockMutation.data.value,
          },
          ...getApiMeta([eventUnlockMutation]),
        }
      }),
    }
    const data = reactive({
      form: {
        invitationCode:
          route.query.ic === undefined ? undefined : route.query.ic,
      },
      isFormSent: false,
      title: t('title'),
    })
    const rules = {
      form: {
        invitationCode: {
          required,
          formatUuid: VALIDATION_FORMAT_UUID,
        },
      },
    }
    const v$ = useVuelidate(rules, data)
    const methods = {
      async submit() {
        try {
          await formPreSubmit(apiData, v$, toRef(data, 'isFormSent'))
        } catch (error) {
          consola.debug(error)
          return
        }

        const result = await eventUnlockMutation.executeMutation({
          invitationCode: data.form.invitationCode,
        })

        if (result.error) {
          apiData.api.value.errors.push(result.error)
          consola.error(result.error)
        }

        if (!result.data?.eventUnlock?.eventUnlockResponse) {
          return
        }

        await jwtStore(
          result.data?.eventUnlock?.eventUnlockResponse?.jwt,
          () => {
            $router.push(
              localePath(
                `/event/${result.data?.eventUnlock?.eventUnlockResponse?.authorUsername}/${result.data?.eventUnlock?.eventUnlockResponse?.eventSlug}`
              )
            )
          }
        )
      },
    }

    useHead({
      meta: [
        {
          hid: 'og:title',
          property: 'og:title',
          content: data.title,
        },
        {
          hid: 'og:url',
          property: 'og:url',
          content:
            'https://' +
            (process.env.NUXT_ENV_STACK_DOMAIN || 'maevsi.test') +
            $router.currentRoute.fullPath,
        },
        {
          hid: 'twitter:title',
          property: 'twitter:title',
          content: data.title,
        },
      ],
      title: data.title,
    })

    onMounted(() => {
      if (route.query.ic) {
        v$.value.form.invitationCode?.$touch()

        if ('error' in route.query) {
          methods.submit()
        }
      }
    })

    return {
      ...apiData,
      ...data,
      ...methods,
      v$,
    }
  },
})

function isQueryIcFormatValid({ route }: Context) {
  return typeof route.query.ic === 'string' && REGEX_UUID.test(route.query.ic)
}
</script>

<i18n lang="yml">
de:
  greetingExplanation: Einladungscodes gewähren dir Zugriff auf nicht-öffentliche Veranstaltungsseiten, ohne dass du dir einen Account erstellen musst. Sie sind gültig, solange du zur Veranstaltung eingeladen bist, für die sie ausgestellt wurden.
  invitationCode: Einladungscode
  invitationCodeAutomatic: Der Einladungscode wurde automatisch eingegeben.
  invitationCodeManual: Code selbst eingeben.
  postgresP0002: Zu diesem Einladungscode wurde keine Veranstaltung gefunden! Überprüfe deine Eingaben auf Schreibfehler.
  submit: Zur Veranstaltungsseite
  title: Veranstaltung freischalten
en:
  greetingExplanation: Invitation codes give you access to non-public event pages without the need to create an account. They are valid as long as you are invited to the event they were issued for.
  invitationCode: Invitation code
  invitationCodeAutomatic: The invitation code was entered automatically.
  invitationCodeManual: Enter it yourself.
  postgresP0002: No event was found for this invitation code! Check your input for spelling mistakes.
  submit: Show event page
  title: Unlock event
</i18n>
