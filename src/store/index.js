import Vue from 'vue'
import Vuex from 'vuex'


Vue.use(Vuex);

const state = {
  url: 'http:127.0.0.1:8000/',

  //用户数据
  name: '游客',
  identity: '游客',
  avatar: '',

}

const getDefaultState = () => {
  return {
    url: 'http:127.0.0.1:8000/',

    //用户数据
    name: '游客',
    identity: '游客',
    avatar: '',

  }
}

const mutations = {
  resetState (state) {
    Object.assign(state, getDefaultState())
  }
}

export default new Vuex.Store({
  state,
  mutations
})

