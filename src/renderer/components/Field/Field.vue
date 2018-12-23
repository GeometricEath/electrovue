<template>
    <form class="field" @submit.stop>
        <h2 class="field_header">Добавить вопрос</h2>

        <img class="field_load_img" v-bind:src="field_data.img" @click="openImage" >

        <textarea class="field_question" 
            name="question" 
            placeholder="Текст вопроса"
            rows="4" 
            spellcheck 
            autocomplete="off"
            v-model="field_data.question">
        </textarea>
        <span v-if="questionLenght>120">Вы слишком многословны, сократите вопрос на {{questionLenght-120}} символов</span>
        <div>
            <div class="roundedOne">
                <input type="radio" id="roundedOne1" name="true" value="1" v-model="field_data.true_answer"/>
                <label for="roundedOne1"></label>
            </div>
            <input name="inp" class="field_answer" id="inp1" placeholder="Вариант ответа 1" type="text" spellcheck autocomplete="off" v-model="field_data.answers[0]">
        </div>    
        <div>  
            <div class="roundedOne">
                <input type="radio" id="roundedOne2" name="true" value="2" v-model="field_data.true_answer"/>
                <label for="roundedOne2"></label>
            </div>
            <input name="inp" class="field_answer" id="inp2" placeholder="Вариант ответа 2" type="text" spellcheck autocomplete="off" v-model="field_data.answers[1]">
        </div>
        <div>
            <div class="roundedOne">
                <input type="radio" id="roundedOne3" name="true" value="3" v-model="field_data.true_answer"/>
                <label for="roundedOne3"></label>
            </div>
            <input name="inp" class="field_answer" id="inp3" placeholder="Вариант ответа 3" type="text" spellcheck autocomplete="off" v-model="field_data.answers[2]">
        </div>
        <div>
            <div class="roundedOne">
                <input type="radio" id="roundedOne4" name="true" value="4" v-model="field_data.true_answer"/>
                <label for="roundedOne4"></label>
            </div>
            <input name="inp" class="field_answer" id="inp4" placeholder="Вариант ответа 4" type="text" spellcheck autocomplete="off" v-model="field_data.answers[3]">
        </div>
        <div>
            <input class="range-slider__range" type="range" value="20" min="10" max="60" v-model='field_data.timeout'>
            <p class="timeout_value">{{field_data.timeout}}</p>
        </div>
        <div class="field_control">
        <button type="button" class="field_button" @click="save_Question">Отправить</button>
        <button type="reset" class="field_button" v-if="type == 'new' ">Очистить</button>
        <button type="button" class="field_button" v-else @click="cansel">Отмена</button>

        </div>
    </form>
</template>

<style>
.timeout_value {
  color: black;
}
</style>


<script>
import style from "../Field/field.css";
import FileSistem from "../../../modules/fileSistem.js";
let FS = new FileSistem();


export default {
  name: "Field",
  props: {
    question_data: {
      type: Object,
      default: function() {
        console.log("questions objec default" + this.type);
        this.type = "new"
        return {
          question: "",
          true_answer: "",
          img: "static/assets/no-image-icon.png",
          answers: [],
          timeout: 20
        };
      }
    }
  },

  methods: {
    save_Question: function(event) {
      //   event.preventDefault();
      this.$emit("newQuestion", this.field_data);
      // console.dir(this.$myStore)
      this.field_data = {
        question: "",
        true_answer: "",
        img: "static/assets/no-image-icon.png",
        answers: [],
        timeout: 20
      };
      this.$el.scrollIntoView(false);
    },
    openImage() {
      FS.openImg()
        .then(blobURL => {
          this.field_data.img = blobURL;
        })
        .catch(er => console.error(er));
    },
    cansel() {
        this.$emit("cansel");
    }
  },
  computed: {
    questionLenght: function() {
      return this.field_data.question.length;
    }
  },

  data() {
    return {
      field_data: this.question_data,
      noIconPng: "static/assets/no-image-icon.png",
      type: "new",
    };
  }
};
</script>
