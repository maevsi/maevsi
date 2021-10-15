<template>
  <div v-if="editor">
    <div class="flex overflow-auto space-x-4">
      <div class="flex space-x-1">
        <Button
          :aria-label="$t('undo')"
          :icon-id="['fas', 'undo']"
          :title="$t('undo')"
          @click="editor.chain().focus().undo().run()"
        />
        <Button
          :aria-label="$t('redo')"
          :icon-id="['fas', 'redo']"
          :title="$t('redo')"
          @click="editor.chain().focus().redo().run()"
        />
      </div>
      <div class="flex space-x-1">
        <Button
          :aria-label="$t('bold')"
          :class="{ 'is-active': editor.isActive('bold') }"
          :icon-id="['fas', 'bold']"
          :title="$t('bold')"
          @click="editor.chain().focus().toggleBold().run()"
        />
        <Button
          :aria-label="$t('italic')"
          :class="{ 'is-active': editor.isActive('italic') }"
          :icon-id="['fas', 'italic']"
          :title="$t('italic')"
          @click="editor.chain().focus().toggleItalic().run()"
        />
        <Button
          :aria-label="$t('strike')"
          :class="{ 'is-active': editor.isActive('strike') }"
          :icon-id="['fas', 'strikethrough']"
          :title="$t('strike')"
          @click="editor.chain().focus().toggleStrike().run()"
        />
      </div>
      <div class="flex space-x-1">
        <Button
          :aria-label="$t('paragraph')"
          :icon-id="['fas', 'paragraph']"
          :title="$t('paragraph')"
          @click="editor.chain().focus().setParagraph().run()"
        />
        <Button
          :aria-label="$t('heading')"
          :icon-id="['fas', 'heading']"
          :title="$t('heading')"
          @click="editor.chain().focus().toggleHeading({ level: 1 }).run()"
        />
        <Button
          :aria-label="$t('heading')"
          :icon-id="['fas', 'heading']"
          :title="$t('heading')"
          @click="editor.chain().focus().toggleHeading({ level: 2 }).run()"
        />
        <Button
          :aria-label="$t('heading')"
          :icon-id="['fas', 'heading']"
          :title="$t('heading')"
          @click="editor.chain().focus().toggleHeading({ level: 3 }).run()"
        />
      </div>
      <div class="flex space-x-1">
        <Button
          :aria-label="$t('listUl')"
          :icon-id="['fas', 'list-ul']"
          :title="$t('listUl')"
          @click="editor.chain().focus().toggleBulletList().run()"
        />
        <Button
          :aria-label="$t('listOl')"
          :icon-id="['fas', 'list-ol']"
          :title="$t('listOl')"
          @click="editor.chain().focus().toggleOrderedList().run()"
        />
      </div>
      <div class="flex space-x-1">
        <Button
          :aria-label="$t('link')"
          :icon-id="['fas', 'link']"
          :title="$t('link')"
          @click="setLink"
        />
        <Button
          :aria-label="$t('linkRemove')"
          :disabled="!editor.isActive('link')"
          :icon-id="['fas', 'unlink']"
          :title="$t('linkRemove')"
          @click="editor.chain().focus().unsetLink().run()"
        />
        <Button
          :aria-label="$t('blockquote')"
          :icon-id="['fas', 'quote-right']"
          :title="$t('blockquote')"
          @click="editor.chain().focus().toggleBlockquote().run()"
        />
        <Button
          :aria-label="$t('code')"
          :icon-id="['fas', 'code']"
          :title="$t('code')"
          @click="editor.chain().focus().toggleCode().run()"
        />
      </div>
      <div class="flex space-x-1">
        <Button
          :aria-label="$t('horizontalRule')"
          :icon-id="['fas', 'arrows-alt-v']"
          :title="$t('horizontalRule')"
          @click="editor.chain().focus().setHorizontalRule().run()"
        />
      </div>
      <!--
      <button
        :class="{ 'is-active': editor.isActive('codeBlock') }"
        @click="editor.chain().focus().toggleCodeBlock().run()"
      >
        code block
      </button> -->
    </div>
    <EditorContent :editor="editor" />
  </div>
</template>

<script lang="ts">
import { defineComponent } from '@nuxtjs/composition-api'
import { Editor, EditorContent } from '@tiptap/vue-2'
import { Link } from '@tiptap/extension-link'
import StarterKit from '@tiptap/starter-kit'

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
      required: true,
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
      extensions: [StarterKit, Link],
      editorProps: {
        attributes: {
          class: 'form-input',
        },
      },
      onUpdate: () => {
        if (!this.editor) return
        this.$emit('input', this.editor.getHTML())
      },
    })
  },
  beforeUnmount() {
    if (!this.editor) return

    this.editor.destroy()
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
