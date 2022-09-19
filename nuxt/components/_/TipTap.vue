<template>
  <div v-if="editor" class="flex flex-col gap-1">
    <div class="flex gap-4 overflow-auto">
      <div class="flex gap-1">
        <ButtonIcon
          :aria-label="t('undo')"
          :title="t('undo')"
          @click="editor?.chain().focus().undo().run()"
        >
          <IconArrowRotateLeft />
        </ButtonIcon>
        <ButtonIcon
          :aria-label="t('redo')"
          :title="t('redo')"
          @click="editor?.chain().focus().redo().run()"
        >
          <IconArrowRotateRight />
        </ButtonIcon>
      </div>
      <div class="flex gap-1">
        <ButtonIcon
          :aria-label="t('bold')"
          :class="{ 'is-active': editor.isActive('bold') }"
          :title="t('bold')"
          @click="editor?.chain().focus().toggleBold().run()"
        >
          <IconBold />
        </ButtonIcon>
        <ButtonIcon
          :aria-label="t('italic')"
          :class="{ 'is-active': editor.isActive('italic') }"
          :title="t('italic')"
          @click="editor?.chain().focus().toggleItalic().run()"
        >
          <IconItalic />
        </ButtonIcon>
        <ButtonIcon
          :aria-label="t('strike')"
          :class="{ 'is-active': editor.isActive('strike') }"
          :title="t('strike')"
          @click="editor?.chain().focus().toggleStrike().run()"
        >
          <IconStrikeThrough />
        </ButtonIcon>
      </div>
      <div class="flex gap-1">
        <!-- <ButtonIcon
          :aria-label="t('paragraph')"
          :title="t('paragraph')"
          @click="editor?.chain().focus().setParagraph().run()"
        >
          <IconParagraph />
        </ButtonIcon /> -->
        <ButtonIcon
          :aria-label="t('heading1')"
          :title="t('heading1')"
          @click="editor?.chain().focus().toggleHeading({ level: 1 }).run()"
        >
          <div class="flex align-end">
            <IconHeading />
            <span>{{ t('1') }}</span>
          </div>
        </ButtonIcon>
        <ButtonIcon
          :aria-label="t('heading2')"
          :title="t('heading2')"
          @click="editor?.chain().focus().toggleHeading({ level: 2 }).run()"
        >
          <div class="flex align-end">
            <IconHeading />
            <span>{{ t('2') }}</span>
          </div>
        </ButtonIcon>
        <ButtonIcon
          :aria-label="t('heading3')"
          :title="t('heading3')"
          @click="editor?.chain().focus().toggleHeading({ level: 3 }).run()"
        >
          <div class="flex align-end">
            <IconHeading />
            <span>{{ t('3') }}</span>
          </div>
        </ButtonIcon>
      </div>
      <div class="flex gap-1">
        <ButtonIcon
          :aria-label="t('listUl')"
          :title="t('listUl')"
          @click="editor?.chain().focus().toggleBulletList().run()"
        >
          <IconListUl />
        </ButtonIcon>
        <ButtonIcon
          :aria-label="t('listOl')"
          :title="t('listOl')"
          @click="editor?.chain().focus().toggleOrderedList().run()"
        >
          <IconListOl />
        </ButtonIcon>
      </div>
      <div class="flex gap-1">
        <ButtonIcon :aria-label="t('link')" :title="t('link')" @click="setLink">
          <IconLink />
        </ButtonIcon>
        <ButtonIcon
          :aria-label="t('linkRemove')"
          :disabled="!editor.isActive('link')"
          :title="t('linkRemove')"
          @click="editor?.chain().focus().unsetLink().run()"
        >
          <IconLinkSlash />
        </ButtonIcon>
        <ButtonIcon
          :aria-label="t('blockquote')"
          :title="t('blockquote')"
          @click="editor?.chain().focus().toggleBlockquote().run()"
        >
          <IconQuoteLeft />
        </ButtonIcon>
        <ButtonIcon
          :aria-label="t('code')"
          :title="t('code')"
          @click="editor?.chain().focus().toggleCode().run()"
        >
          <IconCode />
        </ButtonIcon>
      </div>
      <div class="flex gap-1">
        <ButtonIcon
          :aria-label="t('horizontalRule')"
          :title="t('horizontalRule')"
          @click="editor?.chain().focus().setHorizontalRule().run()"
        >
          <IconMinus />
        </ButtonIcon>
      </div>
      <!--
      <Button
        :class="{ 'is-active': editor.isActive('codeBlock') }"
        @click="editor?.chain().focus().toggleCodeBlock().run()"
      >
        code block
      </Button> -->
    </div>
    <EditorContent :editor="editor" />
  </div>
</template>

<script lang="ts">
import { useEditor, EditorContent } from '@tiptap/vue-3'
import { Link } from '@tiptap/extension-link'
import { StarterKit } from '@tiptap/starter-kit'
import { defineComponent, reactive, watch } from 'vue'

Link.configure({
  HTMLAttributes: {
    rel: 'nofollow noopener noreferrer',
  },
})

export default defineComponent({
  components: {
    EditorContent,
  },
  props: {
    value: {
      default: '',
      type: String,
    },
  },
  setup(props, { emit }) {
    const { t } = useI18n()
    const editor = useEditor({
      content: props.value,
      editorProps: {
        attributes: {
          class: 'form-input min-h-[100px]',
        },
      },
      extensions: [StarterKit, Link],
      onUpdate: () => {
        if (!data.editor) return
        emit('input', data.editor.getHTML())
      },
    })

    const data = reactive({
      editor,
    })
    const methods = {
      setLink() {
        if (!data.editor) return

        const previousUrl = data.editor.getAttributes('link').href
        const url = window.prompt('URL', previousUrl)

        // cancelled
        if (url === null) {
          return
        }

        // empty
        if (url === '') {
          data.editor.chain().focus().extendMarkRange('link').unsetLink().run()

          return
        }

        // update link
        data.editor
          .chain()
          .focus()
          .extendMarkRange('link')
          .setLink({ href: url, target: '_blank' })
          .run()
      },
      t,
    }

    watch(
      () => props.value,
      (currentValue, _oldValue) => {
        if (!data.editor) return

        const isSame = data.editor.getHTML() === currentValue

        if (isSame) {
          return
        }

        data.editor.commands.setContent(currentValue, false)
      }
    )

    return {
      ...data,
      ...methods,
    }
  },
})
</script>

<i18n lang="yml">
de:
  1: '1'
  2: '2'
  3: '3'
  blockquote: Anführungszeichen
  bold: Fett
  code: Code
  heading1: Überschrift (groß)
  heading2: Überschrift (mittelgroß)
  heading3: Überschrift (klein)
  horizontalRule: Horizontaler Trennstrich
  italic: Kursiv
  link: Link
  linkRemove: Link entfernen
  listOl: Geordnete Liste
  listUl: Ungeordnete Liste
  paragraph: Absatz
  redo: Wiederholen
  strike: Durchgestrichen
  undo: Rückgängig machen
en:
  1: '1'
  2: '2'
  3: '3'
  blockquote: Blockquote
  bold: Bold
  code: Code
  heading1: Heading (large)
  heading2: Heading (medium)
  heading3: Heading (small)
  horizontalRule: Horizontal rule
  link: Link
  linkRemove: Unlink
  listOl: Urdered list
  listUl: Unordered list
  italic: Italic
  paragraph: Paragraph
  redo: Redo
  strike: Strikethrough
  undo: Undo
</i18n>
