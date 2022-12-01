<template>
    <div>
      <template x-if="editor" id="menu">
        <div>
            <div>
                <button @click="editor.chain().focus().toggleBold().run()" :class="{ 'is-active': editor.isActive('bold') }">
                    bold
                </button>
            </div>
        </div>
    </template>
    <editor-content :editor="editor" />
</div>
  </template>
  
  <script>
 // import { Editor, EditorContent } from '@tiptap/vue-2'
 // import StarterKit from '@tiptap/starter-kit'
 // import BubbleMenu from '@tiptap/extension-bubble-menu'

  
  export default {
    /*
    components: {
      EditorContent,
    },
    */
  
    data() {
      return {
        editor: null,
        isActive:'',
      }
    },
  
    mounted() {
      this.editor = new Editor({
        content: '<p>Enter body of your article here</p>',
        extensions: [
          StarterKit,
          BubbleMenu.configure({
            element: document.querySelector('#menu'),
          }),
        ],
      })
    },
  
    beforeDestroy() {
      this.editor.destroy()
    },
  }
  </script>
