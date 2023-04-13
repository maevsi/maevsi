<template>
  <Loader
    :api="api"
    :error-pg-ids="{
      postgres53100: t('postgres53100'),
    }"
  >
    <Card>
      <ul class="flex flex-wrap items-center justify-center">
        <template v-if="uploads?.length">
          <li
            v-for="upload in uploads"
            :id="upload.id"
            :key="upload.id"
            :class="[
              ...(pending.deletions.includes(upload.id)
                ? ['animate-pulse']
                : []),
              ...(selectable && upload === selectedItem
                ? ['border-red-600']
                : ['border-transparent']),
            ]"
            class="relative box-border border-4"
            :disabled="pending.deletions.includes(upload.id)"
            @click="toggleSelect(upload)"
          >
            <LoaderImage
              :alt="upload.storageKey ? t('uploadAlt') : t('uploadAltFailed')"
              aspect="aspect-square"
              class="h-32 w-32"
              height="128"
              :src="getUploadImageSrc(upload.storageKey || '')"
              :title="t('uploadSize', { size: bytesToString(upload.sizeByte) })"
              width="128"
            />
            <div v-if="allowDeletion">
              <div
                class="absolute right-0 top-0 rounded-bl-lg bg-red-600 bg-opacity-75"
                @click="deleteImageUpload(upload.id)"
              >
                <Button
                  :aria-label="t('iconTrashLabel')"
                  class="flex h-full justify-center"
                >
                  <IconTrash
                    class="m-1 text-text-bright"
                    :title="t('iconTrash')"
                  />
                </Button>
              </div>
            </div>
          </li>
        </template>
        <li class="relative box-border border-4 border-transparent">
          <Button
            :aria-label="
              t('iconAdd', {
                sizeUsed: bytesToString(sizeByteTotal),
                sizeTotal: bytesToString(accountUploadQuotaBytes),
              })
            "
            class="flex h-32 w-32 justify-center bg-gray-300 dark:bg-gray-200"
            :title="
              t('iconAdd', {
                sizeUsed: bytesToString(sizeByteTotal),
                sizeTotal: bytesToString(accountUploadQuotaBytes),
              })
            "
            @click="selectProfilePicture"
          >
            <IconPlus classes="h-12 text-gray-500 w-12" />
          </Button>
          <input
            ref="inputProfilePictureRef"
            accept="image/*"
            hidden
            name="input-profile-picture"
            type="file"
            @change="loadProfilePicture"
          />
        </li>
      </ul>
      <div
        v-if="api.data.allUploads?.pageInfo.hasNextPage"
        class="flex justify-center"
      >
        <ButtonColored
          :aria-label="t('globalShowMore')"
          @click="after = api.data.allUploads?.pageInfo.endCursor"
        >
          {{ t('globalShowMore') }}
        </ButtonColored>
      </div>
    </Card>
    <Modal
      id="ModalImageUploadGallery"
      :submit-name="t('upload')"
      :submit-task-provider="getUploadBlobPromise"
    >
      <Cropper
        ref="cropperRef"
        :init-stretcher="initStretcher"
        :src="fileSelectedUrl"
        :stencil-props="{
          aspectRatio: 1,
        }"
      />
      <template #header>{{ t('uploadNew') }}</template>
      <template #submit-icon><IconUpload /></template>
    </Modal>
  </Loader>
</template>

<script setup lang="ts">
import { Uppy, UploadResult, UppyFile } from '@uppy/core'
import Tus from '@uppy/tus'
import { consola } from 'consola'
import prettyBytes from 'pretty-bytes'
import { UnwrapRef } from 'vue'
import { Cropper, CropperResult, Size } from 'vue-advanced-cropper'

import { useMaevsiStore } from '~/store'
import { useUploadCreateMutation } from '~/gql/documents/mutations/upload/uploadCreate'
import { useAccountUploadQuotaBytesQuery } from '~/gql/documents/queries/account/accountUploadQuotaBytes'
import { useAllUploadsQuery } from '~/gql/documents/queries/upload/uploadsAll'
import { getUploadItem } from '~/gql/documents/fragments/uploadItem'

export interface Props {
  allowDeletion?: boolean
  selectable?: boolean
  username?: string
}
const props = withDefaults(defineProps<Props>(), {
  allowDeletion: true,
  selectable: false,
  username: undefined,
})

const emit = defineEmits<{
  (e: 'selection', storageKey?: string | null): void
}>()

const { t } = useI18n()
const route = useRoute()
const store = useMaevsiStore()
const config = useRuntimeConfig()
const TUSD_FILES_URL = useTusdFilesUrl()
const localePath = useLocalePath()
const fireAlert = useFireAlert()

// refs
const after = ref<string>()
const cropperRef = ref()
const inputProfilePictureRef = ref()

// api data
const accountUploadQuotaBytesQuery = await useAccountUploadQuotaBytesQuery()
const allUploadsQuery = await useAllUploadsQuery({
  after,
  username: props.username,
  first: ITEMS_PER_PAGE,
})
const uploadCreateMutation = useUploadCreateMutation()
const api = getApiData([
  accountUploadQuotaBytesQuery,
  allUploadsQuery,
  uploadCreateMutation,
])
const uploads = computed(
  () =>
    allUploadsQuery.data.value?.allUploads?.nodes
      .map((x) => getUploadItem(x))
      .filter(isNeitherNullNorUndefined) || []
)
const accountUploadQuotaBytes = computed(
  () => accountUploadQuotaBytesQuery.data.value?.accountUploadQuotaBytes
)

// data
const fileSelectedUrl = ref<string>()
const fileSelectedMimeType = ref<string>()
const pending = reactive({
  deletions: ref<string[]>([]),
})
const selectedItem = ref<{
  storageKey?: string | null
}>()
const uppy = ref<Uppy>()

// computations
const sizeByteTotal = computed(
  () => uploads.value?.reduce((p, c) => p + +c.sizeByte, 0) || 0
)

// methods
const bytesToString = (bytes?: number | string | null) =>
  bytes ? prettyBytes(+bytes) : undefined
const initStretcher = ({
  cropper,
  stretcher,
  imageSize,
}: {
  cropper: HTMLElement
  stretcher: HTMLElement
  imageSize: Size
}) => {
  stretcher.style.width = `${imageSize.width}px`
  stretcher.style.height = `${imageSize.height}px`

  stretcher.style.height = `${cropper.parentElement?.clientHeight}px`
  stretcher.style.width = `${cropper.parentElement?.clientWidth}px`
}
const selectProfilePicture = async () => {
  const pathUpload = localePath('/upload')

  if (route.path === pathUpload) {
    inputProfilePictureRef.value.click()
  } else {
    await navigateTo(pathUpload)
  }
}
const deleteImageUpload = (uploadId: string) => {
  pending.deletions.push(uploadId)

  const xhr = new XMLHttpRequest()
  const host = config.public.stagingHost
    ? `https://${config.public.stagingHost}`
    : ''

  xhr.open('DELETE', `${host}/api/tusd?uploadId=${uploadId}`, true)
  xhr.setRequestHeader('Hook-Name', 'maevsi/pre-terminate')
  xhr.setRequestHeader('Authorization', 'Bearer ' + store.jwt)
  xhr.onreadystatechange = async () => {
    if (xhr.readyState === 4) {
      pending.deletions.splice(pending.deletions.indexOf(uploadId), 1)

      switch (xhr.status) {
        case 204:
          allUploadsQuery.executeQuery()
          break
        case 500:
          await fireAlert({ level: 'error', text: t('uploadDeleteFailed') })
          break
        default:
          await fireAlert({
            level: 'warning',
            text: t('uploadDeleteUnexpectedStatusCode'),
          })
      }
    }
  }
  xhr.send()
}
const getMimeType = (file: ArrayBuffer, fallback?: string) => {
  const byteArray = new Uint8Array(file).subarray(0, 4)
  const header = byteArray.reduce((p, c) => p + c.toString(16), '')

  switch (header) {
    case '89504e47':
      return 'image/png'
    case '47494638':
      return 'image/gif'
    case 'ffd8ffe0':
    case 'ffd8ffe1':
    case 'ffd8ffe2':
    case 'ffd8ffe3':
    case 'ffd8ffe8':
      return 'image/jpeg'
    default:
      return fallback
  }
}
const getUploadImageSrc = (uploadStorageKey: string) =>
  TUSD_FILES_URL + uploadStorageKey
const loadProfilePicture = (event: Event) => {
  const target = event.target as HTMLInputElement
  const files = Array.from(target.files ?? [])

  if (files.length !== 1) return

  const file = files[0]

  if (fileSelectedUrl.value) {
    URL.revokeObjectURL(fileSelectedUrl.value)
  }

  try {
    const fileReader = new FileReader()

    fileReader.onload = (e) => {
      fileSelectedUrl.value = e.target?.result as string
      fileSelectedMimeType.value = getMimeType(
        e.target?.result as ArrayBuffer,
        file.type
      )
      store.modals.push({ id: 'ModalImageUploadGallery' })
    }
    fileReader.readAsDataURL(file)
  } catch (err: any) {
    consola.error(err)
  }
}
const toggleSelect = (upload: UnwrapRef<typeof selectedItem>) => {
  if (selectedItem === upload) {
    selectedItem.value = undefined
    emit('selection', undefined)
  } else {
    selectedItem.value = upload
    emit('selection', selectedItem.value?.storageKey)
  }
}
const getUploadBlobPromise = () =>
  new Promise<void>((resolve, reject) => {
    ;(cropperRef.value?.getResult() as CropperResult).canvas?.toBlob(
      async (blob) => {
        if (!blob) return

        const result = await uploadCreateMutation.executeMutation({
          uploadCreateInput: {
            sizeByte: blob.size,
          },
        })

        if (result.error) return reject(result.error)
        if (!result.data) return

        uppy.value = new Uppy({
          id: 'profile-picture',
          debug: !config.public.isInProduction,
          restrictions: {
            maxFileSize: 1048576,
            maxNumberOfFiles: 1,
            minNumberOfFiles: 1,
            allowedFileTypes: ['image/*'],
          },
          meta: {
            maevsiUploadUuid: result.data.uploadCreate?.uuid,
          },
          onBeforeUpload: (files: { [key: string]: UppyFile }) =>
            Object.keys(files).reduce(
              (p, c) => ({
                ...p,
                [c]: {
                  ...files[c],
                  name: '/profile-pictures/' + files[c].name,
                },
              }),
              {}
            ),
        })

        uppy.value.use(Tus, {
          endpoint: TUSD_FILES_URL,
          limit: 1,
          removeFingerprintOnSuccess: true,
        })

        uppy.value.addFile({
          source: 'cropper',
          name: inputProfilePictureRef.value.files![0]!.name,
          type: blob.type,
          data: blob,
        })

        uppy.value.upload().then((value: UploadResult) => {
          allUploadsQuery.executeQuery()

          if (value.failed.length > 0) {
            reject(t('uploadError'))
          } else {
            resolve()
          }
        })
      },
      'image/jpeg'
    )
  })

// lifecycle
onBeforeUnmount(() => uppy.value?.close())
</script>

<style>
@import url('~/node_modules/vue-advanced-cropper/dist/style.css');
</style>

<i18n lang="yaml">
de:
  iconAdd: 'Ein neues Bild hochladen. Genutzter Speicherplatz: {sizeUsed}/{sizeTotal}.'
  iconTrash: löschen
  iconTrashLabel: Dieses hochgeladene Bild löschen.
  postgres53100: Der Speicherplatz deines Accounts ist aufgebraucht!
  upload: Hochladen
  uploadAlt: Ein hochgeladenes Bild.
  uploadAltFailed: Ein Bild, das nicht vollständig hochgeladen wurde.
  uploadDeleteFailed: Das Löschen des Elements ist fehlgeschlagen!
  uploadDeleteUnexpectedStatusCode: Beim Löschen des Elements trat ein unerwarteter Statuscode auf.
  uploadError: 'Fehler: Dateien wurden nicht erfolgreich hochgeladen!'
  uploadNew: Lade ein neues Bild hoch
  uploadSize: 'Größe: {size}'
en:
  iconAdd: 'Upload a new image. Used storage space: {sizeUsed}/{sizeTotal}.'
  iconTrash: trash
  iconTrashLabel: Delete this image upload.
  postgres53100: Your account storage space has been used up!
  upload: Upload
  uploadAlt: An uploaded image.
  uploadAltFailed: "An image which hasn't been fully uploaded."
  uploadDeleteFailed: Deleting upload failed!
  uploadDeleteUnexpectedStatusCode: Deleting upload returned an unexpected status code.
  uploadError: 'Error: Upload failed!'
  uploadNew: Upload a new image
  uploadSize: 'Size: {size}'
</i18n>
