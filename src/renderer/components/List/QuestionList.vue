<template>
    <div class="list">
        <div class="questions" 
            v-for="(item, index) in questions" 
            v-bind:key="item.id"
            @click="expand"
        >
            <button class="question-accordion">
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
                    <button class="field_button" @click.stop="edit(index, $event)">Редактировать</button>
                    <button class="field_button" @click.stop="delite(index)">Удалить</button>
                </div>
            </div>
        </div>
    </div>    
</template>

<script>
import style from "./question__list.css";

// TODO: Подготовить два css класса focus и edit. Реализовать подстановку классов 
// для проигрывания времени и редактирования

// TODO: Реализовать круглый SVG таймер со слайдером выбора времени отображения вопроса

// console.dir(this.$root)

export default {
  data() {
    return {};
  },
  props: ["questions"],
  computed: {
  
  },
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
    edit(id, evt) {
      console.log("hoocked " + id);
      let target = evt.target.closest('.questions');
      console.dir(target);
      // this.questions[id].question = 'test';
    },
    delite(id) {
      this.questions.splice(id, 1);
    }
  }
};
</script>
