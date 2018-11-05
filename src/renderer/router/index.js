import Vue from 'vue'
import Router from 'vue-router'
import Editor from '../components/QuizeEditor.vue'
import New from '../components/NewProject.vue'
import Landing from '../components/Landing.vue'
import OpenQuiz from '../components/OpenProject.vue'

Vue.use(Router)

export default new Router({
  routes: [
    {
      path: '/',
      component: require('@/components/Landing').default
    },
    {
      path: '/editor/:name', component: Editor, props: true, name: 'editor'
    },
    {
      path: '/new_project', component: New
    },
    {
      path: '/open', component: OpenQuiz
    },
    {
      path: '/landing', component: Landing, name: 'landing'
    }
    // {
    //   path: '*',
    //   redirect: '/'
    // }
  ]
})
