<template>
    <div class="select_wrapper">
        <button @click="$router.push({name: 'landing'})">Назад</button>
        <div class="select__file">
            <h1>Выберете XML файл викторины</h1>
            <button @click="open">Открыть</button>
        </div>
    </div>
</template>
<script>
import FileSistem from "../../modules/fileSistem.js";
const FS = new FileSistem();
export default {
  data() {
    return {};
  },
  methods: {
    open() {
      FS.openQuiz()
        .then((quiz) => {
          console.log('Open quiz data after parse: ' + quiz);
          this.$router.push({
            name: "editor",
            params: quiz,
          });
        })
        .then(() => console.log("Переход в QizeEditor"))
        .catch(err => {
          console.error("Ошибка чтения xml " + err);
        });
    }
  }
};
</script>