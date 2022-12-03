<template>
    <div>
        <div v-if="editor" class="mb-2 icons">
          <div class="small-button"><button
            small
            :class="{
              'v-item--active v-btn--active': editor.isActive('bold'),
            }"
            @click="editor.chain().focus().toggleBold().run()"
          >B</button></div>

          <div class="small-button"><button
            small
            :class="{
              'v-item--active v-btn--active': editor.isActive('italic'),
            }"
            @click="editor.chain().focus().toggleItalic().run()"
          >I</button></div>

          
          <div class="small-button"><button
            small
            :class="{
              'v-item--active v-btn--active':
                editor.isActive('underline'),
            }"
            @click="editor.chain().focus().toggleUnderline().run()"
          >U</button></div>
          
          <div class="small-button"><button
            small
            :class="{
              'v-item--active v-btn--active':
                editor.isActive('code'),
            }"
            @click="editor.chain().focus().toggleCodeBlock().run()"
          >Code</button></div>

          <!--
          <div class="small-button"><button
            small
            :class="{
              'v-item--active v-btn--active':
                editor.isActive('blockquote'),
            }"
            @click="editor.chain().focus().toggleBlockquote().run()"
          >Q</button></div>
-->
          <div class="small-button"><button
            small
            :class="{
              'v-item--active v-btn--active':
                editor.isActive('bulletlist'),
            }"
            @click="editor.chain().focus().toggleBulletList().run()"
          >BL</button></div>
<!--
          <div class="small-button"><button
            small
            :class="{
              'v-item--active v-btn--active':
                editor.isActive('listitem'),
            }"
            @click="editor.chain().focus().toggleListItem().run()"
          >L</button></div>
-->
          <div class="small-button"><button
            small
            :class="{
              'v-item--active v-btn--active':
                editor.isActive('orderedlist'),
            }"
            @click="editor.chain().focus().toggleOrderedList().run()"
          >OL</button></div>
<!--
          <div class="small-button"><button
            small
            :class="{
              'v-item--active v-btn--active':
                editor.isActive('hardbreak'),
            }"
            @click="editor.chain().focus().toggleHardBreak().run()"
          >Br</button></div>
        -->

          <div class="small-button"><button
            small
            :class="{
              'v-item--active v-btn--active':
                editor.isActive('heading'),
            }"
            @click="editor.chain().focus().toggleHeading({ level: 1 }).run()"
          >H1</button></div>

          <div class="small-button"><button
            small
            :class="{
              'v-item--active v-btn--active':
                editor.isActive('heading'),
            }"
            @click="editor.chain().focus().toggleHeading({ level: 2 }).run()"
          >H2</button></div>

          <div class="small-button"><button
            small
            :class="{
              'v-item--active v-btn--active':
                editor.isActive('heading'),
            }"
            @click="editor.chain().focus().toggleHeading({ level: 3 }).run()"
          >H3</button></div>

          <div class="small-button"><button
            small
            :class="{
              'v-item--active v-btn--active':
                editor.isActive('heading'),
            }"
            @click="editor.chain().focus().toggleHeading({ level: 4 }).run()"
          >H4</button></div>
<!--
          <div class="small-button"><button
            small
            :class="{
              'v-item--active v-btn--active':
                editor.isActive('horizontalrule'),
            }"
            @click="editor.chain().focus().toggleHorizontalRule().run()"
          >Hr</button></div>

          <div class="small-button"><button
            small
            :class="{
              'v-item--active v-btn--active':
                editor.isActive('strike'),
            }"
            @click="editor.chain().focus().toggleStrike().run()"
          >S</button></div>
          

          <div class="small-button"><button
            small
            :class="{
              'v-item--active v-btn--active':
                editor.isActive('undo'),
            }"
            @click="editor.chain().focus().toggleUndo().run()"
          >Ctrl+Z</button></div>

          <div class="small-button"><button
            small
            :class="{
              'v-item--active v-btn--active':
                editor.isActive('redo'),
            }"
            @click="editor.chain().focus().toggleRedo().run()"
          >Ctrl+Y</button></div>
-->
          <div class="small-button"><button
            small
            :class="{
              'v-item--active v-btn--active':
                editor.isActive('right'),
            }"
            @click="editor.chain().focus().setTextAlign('right').run()"
          >right</button></div>

          <div class="small-button"><button
            small
            :class="{
              'v-item--active v-btn--active':
                editor.isActive('left'),
            }"
            @click="editor.chain().focus().setTextAlign('left').run()"
          >left</button></div>

          <div class="small-button"><button
            small
            :class="{
              'v-item--active v-btn--active':
                editor.isActive('center'),
            }"
            @click="editor.chain().focus().setTextAlign('center').run()"
          >center</button></div>

          <div class="small-button"><button
            small
            :class="{
              'v-item--active v-btn--active':
                editor.isActive('justify'),
            }"
            @click="editor.chain().focus().setTextAlign('justify').run()"
          >justify</button></div>  

        </div>
        <hr>
        <editor-content :editor="editor" />
</div>
  </template>
  
  <script>
import { Editor, EditorContent } from "@tiptap/vue-2";
import StarterKit from "@tiptap/starter-kit";
import Underline from '@tiptap/extension-underline';
import TextAlign from '@tiptap/extension-text-align';
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
    extensions: [
      StarterKit.configure({
        Dropcursor: {
  color: '#ff0000',
  width: 2,
},

History:{
  newGroupDelay: 100000,
  depth: 20,
},
}),

Underline.configure({
  HTMLAttributes: {
    class: 'my-custom-class',
  },
}),
  
TextAlign.configure({
  types: ['heading', 'paragraph'],
  alignments: ['left', 'right', 'center', 'justify'],
})
     
  ],
  });
    },
  
  beforeDestroy() {
  this.editor.destroy();
}
  }
  </script>

  <<style scoped>
  .small-button {
  border: black;
  border-style: solid;
  border-radius: 4px;
  display: inline-flex;
  padding: 2px;
  margin: 2px;
  background-color: lightgrey;
  border-width: 1px;

}
  </style>
