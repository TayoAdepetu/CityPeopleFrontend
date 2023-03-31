<template>
  <div>
    <div class="container">
      <div class="dressing">
        To add a plain paragraph<button
          class="html-buttons"
          @click="plainParagraph()"
        >
          Copy
        </button>
      </div>

      <div class="dressing">
        To make some texts bold
        <button class="html-buttons" @click="paragraphwithsomeboldtexts">
          Copy
        </button>
      </div>

      <div class="dressing">
        To make some texts italic
        <button class="html-buttons" @click="makeItalic">Copy</button>
      </div>

      <div class="dressing">
        To add H2 subheading
        <button class="html-buttons" @click="addh2subheading">Copy</button>
      </div>

      <div class="dressing">
        To add H3 subheading
        <button class="html-buttons" @click="addh3subheading">Copy</button>
      </div>

      <div class="dressing">
        To add H4 subheading
        <button class="html-buttons" @click="addh4subheading">Copy</button>
      </div>

      <div class="dressing">
        To add H5 subheading
        <button class="html-buttons" @click="addh5subheading">Copy</button>
      </div>

      <div class="dressing">
        To add a link on a text
        <button class="html-buttons" @click="addlinktotext">Copy</button>
      </div>

      <div class="dressing">
        To add an image
        <button class="html-buttons" @click="addImage">Copy</button>
      </div>

      <div class="dressing">
        To add a video
        <button class="html-buttons" @click="addVideo">Copy</button>
      </div>

      <div class="dressing">
        To add unordered list
        <button class="html-buttons" @click="addUnOrderedList">Copy</button>
      </div>

      <div class="dressing">
        To add ordered list
        <button class="html-buttons" @click="addOrderedList">Copy</button>
      </div>

      <div class="dressing">
        To add a blockquote
        <button class="html-buttons" @click="addBlockQuote">Copy</button>
      </div>
    </div>
  </div>
</template>
<script>
export default {
  methods: {
    plainParagraph() {
      //let plainParagraph = document.getElementsByClassName('plain-pragraph');
      //let code = plainParagraph.innerHTML;
      navigator.clipboard.writeText("<p>ADD A PARAGRAPH HERE</p>");
    },

    paragraphwithsomeboldtexts() {
      //let plainParagraph = document.getElementsByClassName('plain-pragraph');
      //let code = plainParagraph.innerHTML;
      navigator.clipboard.writeText(
        "<span class='bold-span'>ADD BOLD TEXTS HERE</span>"
      );
    },

    makeItalic() {
      navigator.clipboard.writeText(
        "<span class='italic-span'>ADD ITALIC TEXTS HERE</span>"
      );
    },

    addh2subheading() {
      navigator.clipboard.writeText("<h2>ADD A H2 SUBHEADING HERE</h2>");
    },

    addh3subheading() {
      navigator.clipboard.writeText("<h3>ADD A H3 SUBHEADING HERE</h3>");
    },

    addh4subheading() {
      navigator.clipboard.writeText("<h4>ADD A H4 SUBHEADING HERE</h4>");
    },

    addh5subheading() {
      navigator.clipboard.writeText("<h5>ADD A H5 SUBHEADING HERE</h5>");
    },

    addlinktotext() {
      navigator.clipboard.writeText(
        "<a href='ADD THE LINK YOU WANT TO PUT ON THE TEXT HERE'>ADD TEXT YOU WANT TO PUT LINK ON HERE</a>"
      );
    },

    addImage() {
      navigator.clipboard.writeText(
        "<figure><picture><img class='image-dressing' src='ADD LINK TO THE IMAGE HERE' alt='ADD ALT TEXT TO THE IMAGE HERE'></picture><figcaption>WRITE THE CAPTION FOR YOUR IMAGE HERE</figcaption></figure>"
      );
    },

    addVideo() {
      navigator.clipboard.writeText(
        "<video class='image-dressing'><source src='ADD LINK TO IMAGE HERE'>Your browser does not support the video tag.</video>"
      );
    },

    addUnOrderedList() {
      navigator.clipboard.writeText(
        "<ul><li>ADD LIST ITEM1 HERE</li><li>ADD LIST ITEM2 HERE</li></ul>"
      );
    },

    addOrderedList() {
      navigator.clipboard.writeText(
        "<ol><li>ADD LIST ITEM1 HERE</li><li>ADD LIST ITEM2 HERE</li></ol>"
      );
    },

    addBlockQuote() {
      navigator.clipboard.writeText(
        "<blockquote cite='ADD LINK TO WHERE ONE CAN FIND QUOTE HERE'>ADD QUOTE HERE</blockquotel>"
      );
    },
  },
};
</script>
<style scoped>
.dressing {
  display: flex;
  text-align: left;
  border: cornflowerblue;
  border-style: solid;
  border-radius: 5px;
  margin-bottom: 10px;
  padding: 5px;
  justify-content: space-between;
}

.html-buttons {
  border: yellowgreen;
  border-style: solid;
  border-radius: 5px;
  margin-bottom: 10px;
  padding: 5px;
}
</style>
