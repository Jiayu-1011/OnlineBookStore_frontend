<template>
  <div style="padding-top: 50px;">
    <div>

    </div>

    <el-carousel height="500px" >

      <center>
      <el-carousel-item v-for="item in posterArr" :key="item">
        <img :src="item" width="80%" height=""/>
      </el-carousel-item>
      </center>

    </el-carousel>

  </div>

</template>

<script>
export default {
  name: "Welcome",
  data(){
    return{
      posterArr: [],


    }
  },
  methods:{
    getPoster(){
      this.$axios.get(this.$store.state.url + 'poster/').then(res => {
        console.log(res);
        this.posterArr = res.data.posterArr;

      })
    },

  },
  created() {
    this.getPoster();

  }
}
</script>

<style scoped>

</style>
