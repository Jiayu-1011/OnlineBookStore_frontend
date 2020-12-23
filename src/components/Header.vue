<template>

  <div>

    <div id="bookstore-nav">
      <el-menu
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

</style>
