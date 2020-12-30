<template>

  <div style="width: 100%;padding: 0;margin: 0;">

    <div id="bookstore-nav" style="width: 100%;">
      <el-menu style=""
        default-active="activeIndex"
        class="el-menu-demo"
        mode="horizontal"
        @select="handleSelect"
        :router="true"
      >
        <el-menu-item>
          <div @click="toHome">
            欢迎光临商老板的网上书店
          </div>

        </el-menu-item>

        <el-menu-item index="/login" style="float: right;" v-if="this.$store.state.identity==='visitor'">
          <div>登录</div>
        </el-menu-item>


        <el-submenu index="/manage" style="float: right;" v-if="this.$store.state.identity!=='visitor'">
          <template slot="title">
            欢迎您，{{ userName }}
          </template>
          <el-menu-item @click="logout">
            退出登录
          </el-menu-item>
        </el-submenu>

        <el-menu-item index="/manage" style="float: right;" v-if="this.$store.state.identity==='admin'">
          <div>后台管理</div>
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
      userName: '',



    }
  },
  methods: {
    handleSelect(key, keyPath){
      console.log(key, keyPath);
    },
    toHome(){
      this.$router.push({path: '/home'})
    },
    logout() {
      this.$confirm('确定要登出?', '提示', {
        confirmButtonText: '确定',
        cancelButtonText: '取消',
        type: 'warning'
      }).then(() => {
        localStorage.clear();
        sessionStorage.clear();
        this.$store.commit('resetState');
        this.$router.push('/');
      }).catch(() => {
        this.$message({
          type: 'info',
          message: '已取消'
        });
      });
    },

  },
  created() {
    this.userName = this.$store.state.name;
  }
}
</script>

<style scoped>
.el-menu{
  font-size:12px;
  background-color: #e5e5e5;
}

</style>
