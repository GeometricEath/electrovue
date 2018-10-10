<template>
    <div class="select_wrapper">
        <button>Назад</button>
        <div class="select__title" v-if="step==1">
            <h1>Придумайте короткое название для викторины</h1>
            <input type="text" name="title" v-model="title">
            <button @click.prevent="next">Продолжить</button>
        </div>
        <div class="select__folder" v-if="step==2">
            <h1>Выберете папку для сохранения проекта</h1>
            <p>Новая папка с файлами проекта будет создана в выбранном каталоге автоматически</p>
            <p>Название: {{title}}</p>
            <button @click.prevent="editFolder">Выбрать</button>
            <button @click="$router.push({name: 'editor', params: {name: title}})">Начать props</button>
            <router-link to='/editor/{{}}' class="button">Начать</router-link>
        </div>
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
    next() {
      this.step += 1;
    },
    editFolder() {
      dialog.showOpenDialog({ properties: ['openDirectory'] }, filepath => {
          this.folder = filepath;
        console.log(filepath);
      });
    }
  }
};
</script>

<style>
.button{
    -webkit-appearance: button;
    text-decoration: none;
    color: black;
}
</style>
