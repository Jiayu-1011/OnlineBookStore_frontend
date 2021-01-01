import Vue from 'vue'
import Vuex from 'vuex'


Vue.use(Vuex);

const state = {
  url: 'http://119.29.24.77/',

  //用户数据
  userName: '游客',
  identity: 'visitor',
  avatar: '',

  bookClass: '',
  pageNum: '',

}

const getDefaultState = () => {
  return {
    url: 'http://119.29.24.77/',

    //用户数据
    userName: '游客',
    identity: 'visitor',
    avatar: '',


    bookClass: '',
    pageNum: '',

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
  setBookClass(state, bookClass){
    state.bookClass = bookClass;
  },
  setPageNum(state, pageNum){
    state.pageNum = pageNum;
  },


}

export default new Vuex.Store({
  state,
  mutations
})

