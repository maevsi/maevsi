<template>
  <div v-if="editor" class="flex flex-col gap-1">
    <div class="flex gap-4 overflow-auto">
      <div class="flex gap-1">
        <Button
          :aria-label="$t('undo')"
          :title="$t('undo')"
          @click="editor.chain().focus().undo().run()"
        >
          <template slot="prefix">
            <IconArrowRotateLeft />
          </template>
        </Button>
        <Button
          :aria-label="$t('redo')"
          :title="$t('redo')"
          @click="editor.chain().focus().redo().run()"
        >
          <template slot="prefix">
            <IconArrowRotateRight />
          </template>
        </Button>
      </div>
      <div class="flex gap-1">
        <Button
          :aria-label="$t('bold')"
          :class="{ 'is-active': editor.isActive('bold') }"
          :title="$t('bold')"
          @click="editor.chain().focus().toggleBold().run()"
        >
          <template slot="prefix">
            <IconBold />
          </template>
        </Button>
        <Button
          :aria-label="$t('italic')"
          :class="{ 'is-active': editor.isActive('italic') }"
          :title="$t('italic')"
          @click="editor.chain().focus().toggleItalic().run()"
        >
          <template slot="prefix">
            <IconItalic />
          </template>
        </Button>
        <Button
          :aria-label="$t('strike')"
          :class="{ 'is-active': editor.isActive('strike') }"
          :title="$t('strike')"
          @click="editor.chain().focus().toggleStrike().run()"
        >
          <template slot="prefix">
            <IconStrikeThrough />
          </template>
        </Button>
      </div>
      <div class="flex gap-1">
        <Button
          :aria-label="$t('paragraph')"
          :title="$t('paragraph')"
          @click="editor.chain().focus().setParagraph().run()"
        >
          <template slot="prefix">
            <IconParagraph />
          </template>
        </Button>
        <Button
          :aria-label="$t('heading')"
          :title="$t('heading')"
          @click="editor.chain().focus().toggleHeading({ level: 1 }).run()"
        >
          <template slot="prefix">
            <IconHeading />
          </template>
        </Button>
        <Button
          :aria-label="$t('heading')"
          :title="$t('heading')"
          @click="editor.chain().focus().toggleHeading({ level: 2 }).run()"
        >
          <template slot="prefix">
            <IconHeading />
          </template>
        </Button>
        <Button
          :aria-label="$t('heading')"
          :title="$t('heading')"
          @click="editor.chain().focus().toggleHeading({ level: 3 }).run()"
        >
          <template slot="prefix">
            <IconHeading />
          </template>
        </Button>
      </div>
      <div class="flex gap-1">
        <Button
          :aria-label="$t('listUl')"
          :title="$t('listUl')"
          @click="editor.chain().focus().toggleBulletList().run()"
        >
          <template slot="prefix">
            <IconListUl />
          </template>
        </Button>
        <Button
          :aria-label="$t('listOl')"
          :title="$t('listOl')"
          @click="editor.chain().focus().toggleOrderedList().run()"
        >
          <template slot="prefix">
            <IconListOl />
          </template>
        </Button>
      </div>
      <div class="flex gap-1">
        <Button :aria-label="$t('link')" :title="$t('link')" @click="setLink">
          <template slot="prefix">
            <IconLink />
          </template>
        </Button>
        <Button
          :aria-label="$t('linkRemove')"
          :disabled="!editor.isActive('link')"
          :title="$t('linkRemove')"
          @click="editor.chain().focus().unsetLink().run()"
        >
          <template slot="prefix">
            <IconLinkSlash />
          </template>
        </Button>
        <Button
          :aria-label="$t('blockquote')"
          :title="$t('blockquote')"
          @click="editor.chain().focus().toggleBlockquote().run()"
        >
          <template slot="prefix">
            <IconQuoteLeft />
          </template>
        </Button>
        <Button
          :aria-label="$t('code')"
          :title="$t('code')"
          @click="editor.chain().focus().toggleCode().run()"
        >
          <template slot="prefix">
            <IconCode />
          </template>
        </Button>
      </div>
      <div class="flex gap-1">
        <IconMinus
          :aria-label="$t('horizontalRule')"
          :title="$t('horizontalRule')"
          @click="editor.chain().focus().setHorizontalRule().run()"
        />
      </div>
      <!--
      <Button
        :class="{ 'is-active': editor.isActive('codeBlock') }"
        @click="editor.chain().focus().toggleCodeBlock().run()"
      >
        code block
      </Button> -->
    </div>
    <EditorContent :editor="editor" />
  </div>
</template>

<script lang="ts">
import { Editor, EditorContent } from '@tiptap/vue-2'
import { Link } from '@tiptap/extension-link'
import StarterKit from '@tiptap/starter-kit'

import { defineComponent } from '#app'

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
  data() {
    return {
      editor: null as Editor | null,
    }
  },
  watch: {
    value(value) {
      if (!this.editor) return

      const isSame = this.editor.getHTML() === value

      if (isSame) {
        return
      }

      this.editor.commands.setContent(value, false)
    },
  },
  mounted() {
    this.editor = new Editor({
      content: this.value,
      editorProps: {
        attributes: {
          class: 'form-input',
        },
      },
      extensions: [StarterKit, Link],
      onUpdate: () => {
        if (!this.editor) return
        this.$emit('input', this.editor.getHTML())
      },
    })
  },
  beforeDestroy() {
    if (this.editor) {
      this.editor.destroy()
    }
  },
  methods: {
    setLink() {
      if (!this.editor) return

      const previousUrl = this.editor.getAttributes('link').href
      const url = window.prompt('URL', previousUrl)

      // cancelled
      if (url === null) {
        return
      }

      // empty
      if (url === '') {
        this.editor.chain().focus().extendMarkRange('link').unsetLink().run()

        return
      }

      // update link
      this.editor
        .chain()
        .focus()
        .extendMarkRange('link')
        .setLink({ href: url, target: '_blank' })
        .run()
    },
  },
})
</script>

<i18n lang="yml">
de:
  blockquote: Anführungszeichen
  bold: Fett
  code: Code
  heading: Überschrift
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
  blockquote: Blockquote
  bold: Bold
  code: Code
  heading: Heading
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
