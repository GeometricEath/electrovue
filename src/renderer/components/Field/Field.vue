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
            <input class="slider" type="range" value="20" min="10" max="60" v-model='field_data.timeout'>
            <p class="timeout_value">{{field_data.timeout}}</p>
            <p class="timeout_value">Время чтения {{reading_time}}</p>
            <p class="timeout_value">Скорость чтения <input type="number" v-model="spead_reading"></p>

        </div>
        <div class="field_control">
        <button type="button" class="field_button" @click="save_Question">Добавить</button>
        <button type="reset" class="field_button" v-if="field_data.type == 'new' ">Очистить</button>
        <button type="button" class="field_button" v-else @click="cansel">Отмена</button>

        </div>
    </form>
</template>

<style>
.timeout_value {
  color: black;
  padding-right: 10px;
}
input[type=number] {
  width: 35px;
	font-size: 13px;
	padding: 6px 0 4px 10px;
	border: 1px solid #cecece;
	background: #F6F6f6;
  border-radius: 8px;
  margin-top: -7px;
}

input[type=range].slider {
  -webkit-appearance: none;
  width: 150px;
  margin: 0 10px;
}
input[type=range].slider:focus {
  outline: none;
}
input[type=range].slider::-webkit-slider-runnable-track {
  width: 100%;
  height: 6px;
  cursor: pointer;
  background: rgba(69, 179, 252, 0.281);
  border-radius: 3px;
}
input[type=range].slider::-webkit-slider-thumb {
  border: 1px solid rgb(30, 82, 151);
  height: 18px;
  width: 18px;
  border-radius: 9px;
  background: #2a77db;
  cursor: pointer;
  -webkit-appearance: none;
  margin-top: -6.4px;
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
        return {
          type: "new",
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
      delete this.field_data.type;
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
    },
    reading_time: function() {
      let question_reading_time = this.field_data.question.length / this.spead_reading;
      let answers_reading_time = 0;
      this.field_data.answers.forEach(element => {
        answers_reading_time += element.length / this.spead_reading;
      });
      return Math.ceil(question_reading_time + answers_reading_time);
    }
  },

  data() {
    return {
      field_data: this.question_data,
      noIconPng: "static/assets/no-image-icon.png",
      spead_reading: 15,
    };
  }
};
</script>
