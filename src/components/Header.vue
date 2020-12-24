<template>

  <div style="width: 100%;">

    <div id="bookstore-nav" style="width: 100%;">
      <el-menu style="font-size:12px;background-color: #c2c2c2;"
        default-active="activeIndex"
        class="el-menu-demo"
        mode="horizontal"
        @select="handleSelect"
        :router="true"
      >
        <el-menu-item index="/home">
          <div @click="jump">
            网上书店
          </div>

        </el-menu-item>

        <el-menu-item index="/login" style="float: right;">
          <div v-if="this.$store.state.identity==='游客'">
            登录
          </div>


        </el-menu-item>


        <el-menu-item index="/manage" style="float: right;">
          <div v-if="this.$store.state.identity==='管理员'">
            后台管理
          </div>


        </el-menu-item>



      </el-menu>


    </div>

  </div>

</template>

<script>
export default {
  name: "Header",
  data(){
    return {
      activeIndex: 1,



    }
  },
  methods: {
    handleSelect(key, keyPath){
      console.log(key, keyPath);
    },
    jump(){
      if(this.$store.state.identity === '游客'){
        this.activeIndex = 0;
        // this.$router.replace('index/')
      } else {

      }
    }
  }
}
</script>

<style scoped>
el-menu{
  background-color: #c2c2c2;
}

</style>
