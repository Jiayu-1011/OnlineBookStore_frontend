import Vue from 'vue'
import Vuex from 'vuex'


Vue.use(Vuex);

const state = {
  url: 'http://119.29.24.77/',

  //用户数据
  name: '游客',
  identity: 'visitor',
  avatar: '',

}

const getDefaultState = () => {
  return {
    url: 'http://119.29.24.77/',

    //用户数据
    name: '游客',
    identity: 'visitor',
    avatar: '',

  }
}

const mutations = {
  resetState (state) {
    Object.assign(state, getDefaultState())
  },
  setIdentity(state, identity){
    state.identity = identity;
  },
  setName(state, name){
    state.name = name;
  }

}

export default new Vuex.Store({
  state,
  mutations
})

