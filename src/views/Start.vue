<template>
  <div>
    <div>欢迎来到网上书店!</div>
    <div>我们是：{{team}}</div>
    <button type="button" @click="$router.push('home/')">进入网上书店</button>
  </div>
</template>

<script>
export default {
  data(){
    return{
      team: '',

    }
  },
  methods: {
    getTeam(){
      this.$axios.post('http://127.0.0.1:8000/getTeam/')
      .then(res => {
        console.log(res);
        this.team = res.data.team;
      })
    }


  },

  created() {
    this.getTeam();

  }
}
</script>

<style scoped>

</style>
