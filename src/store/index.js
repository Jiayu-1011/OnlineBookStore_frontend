import Vue from 'vue'
import Vuex from 'vuex'


Vue.use(Vuex);

const state = {
  url: 'http://119.29.24.77/',

  //用户数据
  userName: '游客',
  identity: 'visitor',
  avatar: '',
  account: '',
  password: '',
  balance: 0,

  bookClass: '',
  pageNum: 1,
  shoppingList: [],
  classArr: [
    '儿童类',
    '科学类',
    '英语类',
    '教材类',
  ],


}

const getDefaultState = () => {
  return {
    url: 'http://119.29.24.77/',

    //用户数据
    userName: '游客',
    identity: 'visitor',
    avatar: '',
    account: '',
    password: '',
    balance: 0,



    bookClass: '',
    pageNum: 1,
    shoppingList: [],
    classArr: [
      '儿童类',
      '科学类',
      '英语类',
      '教材类',
    ],

  }
}

const mutations = {
  resetState (state) {
    Object.assign(state, getDefaultState())
  },
  setIdentity(state, identity){
    state.identity = identity;
  },
  setUserName(state, userName){
    state.userName = userName;
  },
  setBalance(state, balance){
    state.balance = balance;
  },
  setBookClass(state, bookClass){
    state.bookClass = bookClass;
  },
  setPageNum(state, pageNum){
    state.pageNum = pageNum;
  },
  setAccount(state, account){
    state.account = account;
  },
  setShoppingList(state, shoppingList){
    state.shoppingList = shoppingList;
  },
  addToShoppingList(state, bookId){
    state.shoppingList.push(bookId);
  },
  removeFormShoppingList(state, bookId){
    state.shoppingList.splice(state.shoppingList.indexOf(bookId), 1);
  },




}

export default new Vuex.Store({
  state,
  mutations
})

