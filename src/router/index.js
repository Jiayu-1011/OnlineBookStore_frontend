import Vue from 'vue'
import Router from 'vue-router'
import Home from "../views/Home";
import Start from "../views/Start";
import Main from "../components/Home/Main";
import BookInfo from "../components/Home/BookInfo";
import Manage from "../components/Manage";
import Login from "../components/Login/Login";
import Register from "../components/Login/Register";
import Login_view from "../views/Login_view";



Vue.use(Router)

export default new Router({
  mode: 'history',
  routes: [
    //欢迎页面
    {
      path: '',
      component: Start,
      children: [

      ]
    },
    //主页面
    {
      path: '/home',
      component: Home,
      children: [
        {
          path: '',
          component: Main,

        },
        {
          path: 'bookInfo',
          component: BookInfo,
        },



      ]
    },
    //登录页面
    {
      path: '/login',
      component: Login_view,
      children: [
        {
          path: '',
          component: Login
        },
        {
          path: 'register',
          component: Register
        }

      ]
    },
    //后台管理页面
    {
      path: '/manage',
      component: Manage,
    }
  ]
})
