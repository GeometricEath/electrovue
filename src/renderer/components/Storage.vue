<script>
import Vue from "vue";
// let store = "test";
let _storage = {
  questions: []
};

export default {
  add,

  install(Vue, options) {
    // Vue.prototype.$myStore = store;
    Object.defineProperty(Vue.prototype.$myStorage, "add", {
      get() {
        return _storage.questions;
      }
    });
  }
};
</script>
