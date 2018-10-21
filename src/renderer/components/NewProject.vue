<template>
    <div class="select_wrapper">
        <button @click="$router.push({name: 'landing'})">Назад</button>
        <div class="select__title" v-if="step==1">
            <h1>Придумайте короткое название для викторины</h1>
            <input type="text" name="title" v-model="title">
            <button @click="$router.push({name: 'editor', params: {name: title}})">Продолжить</button>
        </div>
        <!-- <div class="select__folder" v-if="step==2">
            <button @click="$router.push({name: 'editor', params: {name: title}})">Начать props</button>
        </div> -->
    </div>
</template>

<script>
const { dialog } = require("electron").remote;

export default {
  data() {
    return {
      title: "",
      step: 1,
      folder: ""
    };
  },
  methods: {
    // next() {
    //   this.step += 1;
    // },
    // editFolder() {
    //   dialog.showOpenDialog({ properties: ["openDirectory"] }, filepath => {
    //     this.folder = filepath;
    //     console.log(filepath);
    //   });
    // }
  }
};
</script>

<style>
.button {
  -webkit-appearance: button;
  text-decoration: none;
  color: black;
}
</style>
