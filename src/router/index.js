import Vue from 'vue'
import Router from 'vue-router'
import Home from "../views/Home";
import Start from "../views/Start";
import Main from "../components/Home/Main";
import Manage from "../components/Manage";
import Login from "../components/Login/Login";
import Register from "../components/Login/Register";
import Login_view from "../views/Login_view";
import BookList from "../components/Home/Book/BookList";
import Poster from "../components/Home/Poster";
import Book from "../components/Home/Book/Book";
import BookInfo from "../components/Home/Book/BookInfo";
import ShoppingCart from "../components/ShoppingCart";
import Order from "../components/Order";



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
          children:[
            {
              path: '',
              component: Poster
            },
            {
              path: 'bookList/:bookClass',
              component: Book,
              children: [
                {
                  path: ':pageNum',
                  component: BookList,
                }
              ]
            },
            {
              path: 'bookInfo/:bookId',
              component: BookInfo,

            },

          ]

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
    //购物车页面
    {
      path: '/shoppingCart',
      component: ShoppingCart,
    },
    //订单详情页面
    {
      path: '/order',
      component: Order,
    },
    //后台管理页面
    {
      path: '/manage',
      component: Manage,
    }

  ]
})
