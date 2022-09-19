<template>
  <Loader :api="api" indicator="ping">
    <LoaderImage
      :alt="t('profilePictureAlt', { username })"
      :class="classComputed"
      :height="height"
      :src="imageSrc"
      :width="width"
    />
  </Loader>
</template>

<script lang="ts">
import consola from 'consola'
import { computed, defineComponent, PropType, reactive, watch } from 'vue'

import { useNuxtApp } from '#app'

import { TUSD_FILES_URL } from '~/plugins/util/validation'
import { getApiMeta } from '~/plugins/util/util'
import { useProfilePictureByUsernameQuery } from '~/gql/generated'

export default defineComponent({
  props: {
    classes: {
      default: undefined,
      type: String as PropType<string | undefined>,
    },
    height: {
      required: true,
      type: String,
    },
    rounded: {
      default: undefined,
      type: Boolean as PropType<boolean | undefined>,
    },
    username: {
      required: true,
      type: String,
    },
    width: {
      required: true,
      type: String,
    },
  },
  setup(props) {
    const { $nuxt } = useNuxtApp()
    const { t } = useI18n()

    const profilePictureQuery = useProfilePictureByUsernameQuery({
      variables: {
        username: props.username,
      },
    })

    const apiData = {
      api: computed(() => {
        return {
          data: {
            ...profilePictureQuery.data.value,
          },
          ...getApiMeta([profilePictureQuery]),
        }
      }),
      profilePicture: computed(
        () => profilePictureQuery.data.value?.profilePictureByUsername
      ),
    }
    const data = reactive({
      profilePictureUrl: apiData.profilePicture?.value?.uploadStorageKey
        ? TUSD_FILES_URL + apiData.profilePicture.value.uploadStorageKey + '+'
        : undefined,
    })
    const methods = {
      reloadProfilePicture() {
        // TODO: cache update (profilePictureByUsername, props.username)
      },
      t,
    }
    const computations = {
      classComputed: computed(() => {
        return [props.classes, ...(props.rounded ? ['rounded-full'] : [])].join(
          ' '
        )
      }),
      imageSrc: computed(() => {
        if (data.profilePictureUrl !== undefined) {
          return data.profilePictureUrl
        } else {
          return import(
            '~/public/assets/static/images/blank-profile-picture.svg'
          )
        }
      }),
    }

    $nuxt.$on('profilePictureReload', methods.reloadProfilePicture)

    watch(profilePictureQuery.error, (currentValue, _oldValue) => {
      if (currentValue) consola.error(currentValue)
    })

    return {
      ...apiData,
      ...data,
      ...methods,
      ...computations,
    }
  },
})
</script>

<i18n lang="yml">
de:
  profilePictureAlt: Das Profilbild von {username}.
en:
  profilePictureAlt: "{username}'s profile picture."
</i18n>
