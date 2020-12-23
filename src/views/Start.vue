<template>
  <div>
    <div>欢迎来到网上书店!</div>
    <div>我们是：{{team}}</div>
    <button type="button" @click="$router.push('home/')">进入网上书店</button>
    <div>接口测试:{{api_test}}</div>
    <button type="button" @click="GETTest">GET测试</button>
    <button type="button" @click="POSTTest">POST测试</button>
  </div>
</template>

<script>
export default {
  data(){
    return{
      team: '',
      api_test: '空',


    }
  },
  methods: {
    getTeam(){
      this.$axios.post('http://127.0.0.1:8000/getTeam/')
      .then(res => {
        console.log(res);
        this.team = res.data.team;
      })
    },
    GETTest(){
      this.$axios.get(this.$store.state.url + 'GETTest/?method=GET').then(res => {
        console.log('GETTest', res);
        this.api_test = res.data;

      })
    },
    POSTTest(){
      let data = new FormData();
      data.append('method', 'POST');
      this.$axios.post(this.$store.state.url + 'POSTTest/', data).then(res => {
        console.log('POSTTest', res);
        this.api_test = res.data;

      })
    },


  },

  created() {
    this.getTeam();

  }
}
</script>

<style scoped>

</style>
