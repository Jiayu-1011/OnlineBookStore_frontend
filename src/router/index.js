import Vue from 'vue'
import Router from 'vue-router'
import Index from "../views/Home";
import Start from "../views/Start";
import Login from "../views/Login";
import Main from "../components/Home/Main";



Vue.use(Router)

export default new Router({
  mode: 'history',
  routes: [
    //欢迎页面
    {
      path: '/',
      component: Start,
      children: [

      ]
    },
    //主页面
    {
      path: '/home',
      component: Index,
      children: [
        {
          path: '/',
          component: Main,

        }


      ]
    },
    //登录页面
    {
      path: '/login',
      component: Login,
      children: [

      ]
    }
  ]
})
