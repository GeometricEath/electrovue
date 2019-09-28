<script>
import Vue from "vue";
// let store = "test";
let _storage = {
  questions: []
};

export default {
  

  install(Vue, options) {
    Vue.prototype.$myStorage = {};
    Object.defineProperty(Vue.prototype.$myStorage, "add", {
      get() {
        return _storage.questions;
      }
    });
  }
};
</script>
