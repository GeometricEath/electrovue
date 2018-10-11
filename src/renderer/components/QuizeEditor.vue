<template>
  <div class="editor">
  <menus @save='save'></menus>
  <div class="title">{{name}}</div>
  <list v-bind:questions="questions"></list>
  <field v-on:newQuestion='add'></field>
  </div>
</template>

<script>
import Field from "./Field/Field.vue";
import List from "./List/QuestionList.vue";
import Menu from "./Menu/Menu.vue";
import {createQuize} from "../../modules/QuizeBuilder.js";
import FileSistem from "../../modules/fileSistem.js";
let FS = new FileSistem;

// TODO: Реализовать окно входа в режим создания викторины с вводом названия викторины

// this.$on('newQuestion', add);

export default {
  name: "quizeEditor",
  components: {
    field: Field,
    list: List,
    menus: Menu
  },
  data() {
    return {
      questions: []
    };
  },
  props:['name'],
  methods: {
    add(evt) {
      // console.log(this.questions);
      evt.id = this.questions.length;
      this.questions.push(evt);
    },
    save() {
      let xmlData = createQuize(this.questions);
      FS.saveFile(xmlData);
      // let link = document.createElement("a");
      // let blob = new Blob([xmlData], { type: "text/plain" });
      // link.href = window.URL.createObjectURL(blob);
      // link.download = "test.txt";
      // link.click();
    },
   
  }
};
</script>

<style>
.editor {
  margin: 0 auto;
  padding-top: 48px;
  width: 800px;
  /* display: flex; */
  /* flex-direction: row; */
}
.title{
  margin-top: 50px;
}
</style>