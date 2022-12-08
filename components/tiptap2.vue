<template>
    <div>
     <div id="editorjs"></div>
</div>
  </template>


  <script scoped>
import EditorJS from '@editorjs/editorjs';
import Header from '@editorjs/header';
import List from '@editorjs/list';
import Embed from '@editorjs/embed';
import Quote from '@editorjs/quote';
import Checklist from '@editorjs/checklist';
import SimpleImage from '@editorjs/simple-image';
import ImageTool from '@editorjs/image';


export default{
  data(){
    return{
      editor:null,
    }
  },

  mounted(){
    const editor = new EditorJS({
      holder: 'editorjs',
      tools:{
        header: {
          class: Header,
          inlineToolbar:['link']
        },

        list: {
          class: List,
          inlineToolbar:[
            'link',
            'bold'
          ]},

        embed: {
          class: Embed, 
          inlineToolbar:true,
        },
        quote: {
          class: Quote,
          inlineToolbar: true,
          config: {
            quotePlaceholder: 'Enter a quote',
            captionPlaceholder: 'Quote\'s author',
      },
    },

        checklist: {
          class: Checklist,
          inlineToolbar: true,
    },
    //https://github.com/editor-js/simple-image/issues/13
        image: {
          class: SimpleImage,
      },

      image: {
        class: ImageTool,
        config: {
         endpoints: {
           byFile: 'http://localhost:8008/uploadFile', // Your backend file uploader endpoint
           byUrl: 'http://localhost:8008/fetchUrl', // Your endpoint that provides uploading by Url
        }
      }
    }
  }
  //read for rendering: https://github.com/codex-team/editor.js/issues/676
  //
    });

  }
}
</script>
  