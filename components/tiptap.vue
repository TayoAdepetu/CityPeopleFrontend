<template>
    <div>
        <div v-if="editor" class="mb-2">
    <v-row no-gutters>
      <v-col cols="12">
        <v-btn-toggle dense>
          <v-btn
            :disabled="disabled"
            small
            :class="{
              'v-btn v-item--active v-btn--active': editor.isActive('bold'),
            }"
            @click="editor.chain().focus().toggleBold().run()"
          >
            <v-icon small>$bold</v-icon>
          </v-btn>
          <v-btn
            :disabled="disabled"
            small
            :class="{
              'v-btn v-item--active v-btn--active': editor.isActive('italic'),
            }"
            @click="editor.chain().focus().toggleItalic().run()"
          >
            <v-icon small>$italic</v-icon>
          </v-btn>
          <v-btn
            :disabled="disabled"
            small
            :class="{
              'v-btn v-item--active v-btn--active':
                editor.isActive('underline'),
            }"
          >
            <v-icon small>$underline</v-icon>
          </v-btn>
        </v-btn-toggle>
      </v-col>
    </v-row>
        </div>
        <editor-content :editor="editor" />
</div>
  </template>
  
  <script>
import { Editor, EditorContent } from "@tiptap/vue-2";
import StarterKit from "@tiptap/starter-kit";
import { debounce } from "lodash";
  
  export default {
    components: {
      EditorContent,
    },
  
    data() {
      return {
        editor: null,
        debounceInput: null,
      }
    },

created() {
  this.debounceInput = debounce(() => {
    this.$emit("input", this.editor.getHTML());
  }, 300);
},
  
    mounted() {
        this.editor = new Editor({
    content: this.value,
    // injectCSS: true,
    editable: !this.disabled,
    onUpdate: () => {
      // this.$emit('input', this.editor.getHTML())
      this.debounceInput();
    },
    extensions: [StarterKit],
  });
    },
  
    beforeDestroy() {
  this.editor.destroy();
}
  }
  </script>
