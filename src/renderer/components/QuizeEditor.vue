<template>
  <div class="app">
  <menus @save='save'></menus>
  <list v-bind:questions="questions"></list>
  <field v-on:newQuestion='add'></field>
  </div>
</template>

<script>
import Field from "./Field/Field.vue";
import List from "./List/QuestionList.vue";
import Menu from "./Menu/Menu.vue";
import {createQuize} from "../../modules/QuizeBuilder.js";
import {saveFile} from "../../modules/fileSistem.js";

// TODO: Реализовать окно входа в режим создания викторины с вводом названия викторины

// this.$on('newQuestion', add);

export default {
  name: "app",
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
  methods: {
    add(evt) {
      // console.log(this.questions);
      evt.id = this.questions.length;
      this.questions.push(evt);
    },
    save() {
      let xmlData = createQuize(this.questions);
      saveFile(xmlData);
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
.app {
  margin: 0 auto;
  padding-top: 48px;
  width: 800px;
  /* display: flex; */
  /* flex-direction: row; */
}
</style>