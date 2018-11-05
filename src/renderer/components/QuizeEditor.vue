<template>
  <div class="editor">
  <menus @save='save' v-bind:totalTime="totalTime"></menus>
  <div class="title">{{name}}</div>
  <list v-bind:questionsArray="questionsArray"></list>
  <field v-on:newQuestion='add'></field>
  </div>
</template>

<script>
import Field from "./Field/Field.vue";
import List from "./List/QuestionList.vue";
import Menu from "./Menu/Menu.vue";
import FileSistem from "../../modules/fileSistem.js";
let FS = new FileSistem();

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
      questionsArray: []
    };
  },
  created(){
    // `this` указывает на экземпляр vm
    // console.log("Значение a: " + this.a);
    // questionsArray.map()
  },
  props: {
    name: String,
    questions: {
      type: Object,
      default: () => {
        console.log("questions objec default");
        return {};
      }
    }
  },
  computed: {
    totalTime() {
      let totalTime = 0;
      let minutes = 0;
      let seconds = 0;
      let result = 0;
      this.questionsArray.forEach(element => {
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
      // console.log(this.questionsArray);
      evt.id = this.questionsArray.length;
      this.questionsArray.push(evt);
    },
    save() {
      FS.saveProject(this.questionsArray, this.name);

      // let link = document.createElement("a");
      // let blob = new Blob([xmlData], { type: "text/plain" });
      // link.href = window.URL.createObjectURL(blob);
      // link.download = "test.txt";
      // link.click();
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