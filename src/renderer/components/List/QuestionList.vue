<template>
    <div class="list">
        <div class="question" 
            v-for="(item, index) in questions" 
            v-bind:key="item.id"
           
        >
          <div class="viev" v-if="item!=editedQuestion">
            <button class="question-accordion" @click="expand">
                <span class="question-num">{{index+1}}</span>
                <span class="question-button">{{item.question}}</span>
            </button>
            <div class="question-panel">
                <img class="question-icon" v-bind:src="item.img">
                <p
                    v-for="(answer, index) in item.answers"
                    v-bind:key="index"
                >
                    <span 
                        class="question-answer-num"
                        v-bind:class="{questionRightAnswer: (index+1) == item.true_answer}">{{index+1}}</span>
                    <span class="question-answer">{{answer}}</span>
                </p>
                <div class="question-control" >
                    <button class="field_button" @click.stop="edit(index)">Редактировать</button>
                    <button class="field_button" @click.stop="delite(index)">Удалить</button>
                </div>
            </div>
          </div>
          <div class="edit" v-if="item==editedQuestion">
              <p>Режим редактирования</p>
              <field v-bind:question_data="item" @cansel="canselEdit(index)"></field>
             
          </div>
          
        </div>
    </div>    
</template>

<script>
import style from "./question__list.css";
// import Field from "../Field/Field.vue"

// TODO: Подготовить два css класса focus и edit. Реализовать подстановку классов
// для проигрывания времени и редактирования

// TODO: Реализовать круглый SVG таймер со слайдером выбора времени отображения вопроса

// console.dir(this.$root)

export default {
  // components: {
  //   field: Field,
  // },
  data() {
    return {
      editedQuestion: null,
      beforeEditCache: null
    };
  },
  props: ["questions"],
  computed: {},
  methods: {
    expand(event) {
      if (event.target) {
        let target = event.target.closest(
          ".question-accordion" || event.target
        );
        target.classList.toggle("active");
        let panel = target.nextElementSibling;
        if (panel.style.maxHeight) {
          panel.style.maxHeight = null;
        } else {
          panel.style.maxHeight = panel.scrollHeight + "px";
        }
      }
    },
    edit(id) {
      console.log("hoocked " + id);
      this.beforeEditCache = this.questions[id];
      this.editedQuestion = this.questions[id];
    },
    doneEdit(id) {
      this.questions[id] = this.editedQuestion;
      this.editedQuestion = null;
      this.beforeEditCache = null;
    },
    canselEdit(id) {
      this.questions[id] = this.beforeEditCache;
      this.editedQuestion = null;
      this.beforeEditCache = null;
    },
    delite(id) {
      this.questions.splice(id, 1);
    }
  }
};
</script>
