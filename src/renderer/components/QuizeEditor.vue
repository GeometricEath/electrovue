<template>
  <div class="editor">
    <menus @save="save" v-bind:totalTime="totalTime"></menus>
    <div class="title">{{name}}</div>
    <list v-bind:questions="questions_array" @editing="state" @doneEdit="state" @canselEdit="state"></list>
    <field v-on:newQuestion="add" v-if="!editing"></field>
  </div>
</template>

<script>
import Field from "./Field/Field.vue";
import List from "./List/QuestionList.vue";
import Menu from "./Menu/Menu.vue";
import FileSistem from "../../modules/fileSistem.js";
import Vue from "vue";
let FS = new FileSistem();

Vue.component("field", Field);
export default {
  name: "quizeEditor",
  components: {
    list: List,
    menus: Menu
  },
  data() {
    return {
      questions_array: this.questions,
      editing: false
    };
  },
  created() {
 },
  props: {
    name: String,
    questions: {
      type: Array,
      default: () => {
        console.log("questions objec default");
        return [];
      }
    }
  },
  computed: {
    totalTime() {
      let totalTime = 0;
      let minutes = 0;
      let seconds = 0;
      let result = 0;
      this.questions_array.forEach(element => {
        totalTime = totalTime + parseInt(element.timeout);
      });
      result = totalTime + " сек";
      if (totalTime > 60) {
        minutes = Math.floor(totalTime / 60);
        seconds = totalTime % 60;
        result = `${minutes} мин ${seconds} сек`;
      }
      return result;
    }
  },
  methods: {
    add(evt) {
      evt.id = this.questions_array.length;
      this.questions_array.push(evt);
    },
    save() {
      FS.saveProject(this.questions_array, this.name);

      // let link = document.createElement("a");
      // let blob = new Blob([xmlData], { type: "text/plain" });
      // link.href = window.URL.createObjectURL(blob);
      // link.download = "test.txt";
      // link.click();
    },
    state() {
      console.log("editing " + this.editing);
      return this.editing ? this.editing = false : this.editing = true;
    }
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
.title {
  margin-top: 50px;
}
</style>