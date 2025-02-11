<template>
  <div v-if="editor" class="flex flex-col gap-2">
    <div class="flex flex-wrap gap-x-4 gap-y-2 xl:gap-6">
      <div class="flex gap-1">
        <ButtonIcon
          :aria-label="t('undo')"
          class="rounded-sm p-1"
          :title="t('undo')"
          @click="editor.chain().focus().undo().run()"
        >
          <IFa6SolidArrowRotateLeft />
        </ButtonIcon>
        <ButtonIcon
          :aria-label="t('redo')"
          class="rounded-sm p-1"
          :title="t('redo')"
          @click="editor.chain().focus().redo().run()"
        >
          <IFa6SolidArrowRotateRight />
        </ButtonIcon>
      </div>
      <div class="flex gap-1">
        <!-- <ButtonIcon
          :aria-label="t('paragraph')"
          :title="t('paragraph')"
          @click="editor.chain().focus().setParagraph().run()"
        >
          <IFa6SolidParagraph />
        </ButtonIcon /> -->
        <ButtonIcon
          :aria-label="t('heading1')"
          class="rounded-sm p-1"
          :class="{
            'bg-background-bright dark:bg-background-dark': isActive.heading1,
          }"
          :title="t('heading1')"
          @click="editor.chain().focus().toggleHeading({ level: 1 }).run()"
        >
          <div class="align-end flex">
            <IFa6SolidHeading />
            <span>{{ t('number1') }}</span>
          </div>
        </ButtonIcon>
        <ButtonIcon
          :aria-label="t('heading2')"
          class="rounded-sm p-1"
          :class="{
            'bg-background-bright dark:bg-background-dark': isActive.heading2,
          }"
          :title="t('heading2')"
          @click="editor.chain().focus().toggleHeading({ level: 2 }).run()"
        >
          <div class="align-end flex">
            <IFa6SolidHeading />
            <span>{{ t('number2') }}</span>
          </div>
        </ButtonIcon>
        <ButtonIcon
          :aria-label="t('heading3')"
          class="rounded-sm p-1"
          :class="{
            'bg-background-bright dark:bg-background-dark': isActive.heading3,
          }"
          :title="t('heading3')"
          @click="editor.chain().focus().toggleHeading({ level: 3 }).run()"
        >
          <div class="align-end flex">
            <IFa6SolidHeading />
            <span>{{ t('number3') }}</span>
          </div>
        </ButtonIcon>
      </div>
      <div class="flex gap-1">
        <ButtonIcon
          :aria-label="t('bold')"
          class="rounded-sm p-1"
          :class="{
            'bg-background-bright dark:bg-background-dark': isActive.bold,
          }"
          :title="t('bold')"
          @click="editor.chain().focus().toggleBold().run()"
        >
          <IFa6SolidBold />
        </ButtonIcon>
        <ButtonIcon
          :aria-label="t('italic')"
          class="rounded-sm p-1"
          :class="{
            'bg-background-bright dark:bg-background-dark': isActive.italic,
          }"
          :title="t('italic')"
          @click="editor.chain().focus().toggleItalic().run()"
        >
          <IFa6SolidItalic />
        </ButtonIcon>
        <ButtonIcon
          :aria-label="t('strike')"
          class="rounded-sm p-1"
          :class="{
            'bg-background-bright dark:bg-background-dark': isActive.strike,
          }"
          :title="t('strike')"
          @click="editor.chain().focus().toggleStrike().run()"
        >
          <IFa6SolidStrikethrough />
        </ButtonIcon>
      </div>
      <div class="flex gap-1">
        <ButtonIcon
          :aria-label="t('formatAlignLeft')"
          class="rounded-sm p-1"
          :class="{
            'bg-background-bright dark:bg-background-dark':
              isActive.textAlignLeft,
          }"
          :title="t('formatAlignLeft')"
          @click="editor.chain().focus().setTextAlign('left').run()"
        >
          <IFa6SolidAlignLeft />
        </ButtonIcon>
        <ButtonIcon
          :aria-label="t('formatAlignCenter')"
          class="rounded-sm p-1"
          :class="{
            'bg-background-bright dark:bg-background-dark':
              isActive.textAlignCenter,
          }"
          :title="t('formatAlignCenter')"
          @click="editor.chain().focus().setTextAlign('center').run()"
        >
          <IFa6SolidAlignJustify />
        </ButtonIcon>
        <ButtonIcon
          :aria-label="t('formatAlignRight')"
          class="rounded-sm p-1"
          :class="{
            'bg-background-bright dark:bg-background-dark':
              isActive.textAlignRight,
          }"
          :title="t('formatAlignRight')"
          @click="editor.chain().focus().setTextAlign('right').run()"
        >
          <IFa6SolidAlignRight />
        </ButtonIcon>
      </div>
      <div class="flex gap-1">
        <ButtonIcon
          :aria-label="t('listUl')"
          class="rounded-sm p-1"
          :class="{
            'bg-background-bright dark:bg-background-dark': isActive.bulletList,
          }"
          :title="t('listUl')"
          @click="editor.chain().focus().toggleBulletList().run()"
        >
          <IFa6SolidListUl />
        </ButtonIcon>
        <ButtonIcon
          :aria-label="t('listOl')"
          class="rounded-sm p-1"
          :class="{
            'bg-background-bright dark:bg-background-dark':
              isActive.orderedList,
          }"
          :title="t('listOl')"
          @click="editor.chain().focus().toggleOrderedList().run()"
        >
          <IFa6SolidListOl />
        </ButtonIcon>
      </div>
      <div class="flex gap-1">
        <ButtonIcon
          :aria-label="t('link')"
          class="rounded-sm p-1"
          :class="{
            'bg-background-bright dark:bg-background-dark': isActive.link,
          }"
          :title="t('link')"
          @click="setLink"
        >
          <IFa6SolidLink />
        </ButtonIcon>
        <ButtonIcon
          :aria-label="t('linkRemove')"
          class="rounded-sm p-1"
          :disabled="!isActive.link"
          :title="t('linkRemove')"
          @click="editor.chain().focus().unsetLink().run()"
        >
          <IFa6SolidLinkSlash />
        </ButtonIcon>
        <ButtonIcon
          :aria-label="t('blockquote')"
          class="rounded-sm p-1"
          :class="{
            'bg-background-bright dark:bg-background-dark': isActive.blockquote,
          }"
          :title="t('blockquote')"
          @click="editor.chain().focus().toggleBlockquote().run()"
        >
          <IFa6SolidQuoteLeft />
        </ButtonIcon>
        <ButtonIcon
          :aria-label="t('code')"
          class="rounded-sm p-1"
          :class="{
            'bg-background-bright dark:bg-background-dark': isActive.code,
          }"
          :title="t('code')"
          @click="editor.chain().focus().toggleCode().run()"
        >
          <IFa6SolidCode />
        </ButtonIcon>
      </div>
      <div class="flex gap-1">
        <ButtonIcon
          :aria-label="t('horizontalRule')"
          class="rounded-sm p-1"
          :class="{
            'bg-background-bright dark:bg-background-dark':
              isActive.horizontalRule,
          }"
          :title="t('horizontalRule')"
          @click="editor.chain().focus().setHorizontalRule().run()"
        >
          <IFa6SolidMinus />
        </ButtonIcon>
      </div>
      <!--
      <Button
        :class="{ 'bg-background-bright dark:bg-background-dark': isActive.codeBlock }"
        @click="editor.chain().focus().toggleCodeBlock().run()"
      >
        code block
      </Button> -->
    </div>
    <EditorContent :editor="editor" />
  </div>
</template>

<script setup lang="ts">
import { useEditor, EditorContent } from '@tiptap/vue-3'
import { Link } from '@tiptap/extension-link'
import { TextAlign } from '@tiptap/extension-text-align'
import { StarterKit } from '@tiptap/starter-kit'
import type { BaseValidation } from '@vuelidate/core'
import { debounce } from 'lodash-es'

export interface Props {
  value: BaseValidation<string | undefined>
}
const props = withDefaults(defineProps<Props>(), {})

const emit = defineEmits<{
  input: [input: string]
}>()

const host = useHost()
const { t } = useI18n()
const editor = useEditor({
  content: props.value.$model,
  editorProps: {
    attributes: {
      class: 'form-input min-h-[100px]',
    },
  },
  extensions: [
    StarterKit,
    Link,
    TextAlign.configure({ types: ['heading', 'paragraph'] }),
  ],
  onUpdate: () => {
    updateIsActive()
    updateDebounced()
  },
  onSelectionUpdate: () => {
    updateIsActive()
  },
})

// data
const isActive = reactive({
  heading1: false,
  heading2: false,
  heading3: false,
  bold: false,
  italic: false,
  strike: false,
  textAlignLeft: false,
  textAlignRight: false,
  textAlignCenter: false,
  bulletList: false,
  orderedList: false,
  link: false,
  blockquote: false,
  code: false,
  horizontalRule: false,
})

// methods
const getLocation = (href: string) => {
  const link = document.createElement('a')
  link.href = href
  return link
}
const updateIsActive = debounce(
  () => {
    isActive.heading1 = editor.value?.isActive('heading', { level: 1 }) || false
    isActive.heading2 = editor.value?.isActive('heading', { level: 2 }) || false
    isActive.heading3 = editor.value?.isActive('heading', { level: 3 }) || false
    isActive.bold = editor.value?.isActive('bold') || false
    isActive.italic = editor.value?.isActive('italic') || false
    isActive.strike = editor.value?.isActive('strike') || false
    isActive.textAlignLeft =
      editor.value?.isActive({ textAlign: 'left' }) || false
    isActive.textAlignCenter =
      editor.value?.isActive({ textAlign: 'center' }) || false
    isActive.textAlignRight =
      editor.value?.isActive({ textAlign: 'right' }) || false
    isActive.bulletList = editor.value?.isActive('bulletList') || false
    isActive.orderedList = editor.value?.isActive('orderedList') || false
    isActive.link = editor.value?.isActive('link') || false
    isActive.blockquote = editor.value?.isActive('blockquote') || false
    isActive.code = editor.value?.isActive('code') || false
    isActive.horizontalRule = editor.value?.isActive('horizontalRule') || false
  },
  100,
  {
    leading: true,
    maxWait: 100,
  },
)
const setLink = () => {
  if (!editor.value) return

  const previousUrl = editor.value.getAttributes('link').href
  const url = window.prompt('URL', previousUrl)

  // cancelled
  if (url === null) {
    return
  }

  // empty
  if (url === '') {
    editor.value.chain().focus().extendMarkRange('link').unsetLink().run()

    return
  }

  const location = getLocation(url)
  const urlHost = `${location.hostname}:${location.port}`

  // update link
  editor.value
    .chain()
    .focus()
    .extendMarkRange('link')
    .setLink({ href: url, target: urlHost !== host ? '_blank' : null })
    .run()
}
const updateDebounced = debounce(
  () => {
    if (!editor.value) return
    emit('input', editor.value?.getHTML())
  },
  1000,
  { leading: true },
)

// lifecycle
onBeforeUnmount(() => editor.value?.destroy())
</script>

<i18n lang="yaml">
de:
  blockquote: Zitat
  bold: Fett
  code: Code
  formatAlignCenter: Mittig ausrichten
  formatAlignLeft: Links ausrichten
  formatAlignRight: Rechts ausrichten
  heading1: Überschrift (groß)
  heading2: Überschrift (mittelgroß)
  heading3: Überschrift (klein)
  horizontalRule: Horizontaler Trennstrich
  italic: Kursiv
  link: Link
  linkRemove: Link entfernen
  listOl: Aufzählung
  listUl: Liste
  number1: '1'
  number2: '2'
  number3: '3'
  # paragraph: Absatz
  redo: Wiederholen
  strike: Durchgestrichen
  undo: Rückgängig machen
en:
  blockquote: Blockquote
  bold: Bold
  code: Code
  formatAlignCenter: Align center
  formatAlignLeft: Align left
  formatAlignRight: Align right
  heading1: Heading (large)
  heading2: Heading (medium)
  heading3: Heading (small)
  horizontalRule: Horizontal rule
  italic: Italic
  link: Link
  linkRemove: Remove link
  listOl: Enumeration
  listUl: List
  number1: '1'
  number2: '2'
  number3: '3'
  # paragraph: Paragraph
  redo: Redo
  strike: Strikethrough
  undo: Undo
</i18n>
