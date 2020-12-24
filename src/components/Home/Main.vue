<template>
  <div style="width: 100%;">
    <div style="width: 100%;display: flex;">



      <div style="width:80%;display: flex;align-items: center;">

        <div style="width:100%;display: flex;align-items: center;flex-direction: column;">
          <el-input
            @focus="focus"
            @blur="blur"
            @keyup.enter.native="searchHandler"
            style="width: 40%;"
          ></el-input>
          <el-button type="primary" icon="el-icon-search"></el-button>
          <el-card v-if="isSearch"></el-card>
        </div>


      </div>


    </div>
  </div>
</template>

<script>
export default {
  name: "Main",
  methods:{
    searchHandler(){

    },


  },
  computed:{
    isSearch(){
      return this.isFocus;
    }
  }
}
</script>

<style scoped>

</style>
