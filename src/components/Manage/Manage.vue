<template>
  <div>
    <Header></Header>
    <div style="padding: 40px;">

      <el-container>
        <el-aside style="width: 30%;">
          <el-menu
            mode="vertical" style="width:60%;border-radius: 10px;border: 0.6px solid gray;" :router="true"
            default-active="0"
          >
            <el-menu-item
              index="/manage/addBook"
              class="menuItem"
              style="border-top-left-radius: 10px;border-top-right-radius: 10px;"
            >添加图书</el-menu-item>
            <el-menu-item
              index="/manage/modifyBook"
              class="menuItem"
            >修改图书信息</el-menu-item>
            <el-menu-item
              index="/manage/bookStats"
              class="menuItem"
            >统计图书信息</el-menu-item>
            <el-menu-item
              index="/manage/recharge"
              class="menuItem"
              style="border-bottom-left-radius: 10px;border-bottom-right-radius: 10px;"
            >账号充值</el-menu-item>
          </el-menu>
        </el-aside>

        <el-main>
          <router-view/>
        </el-main>

      </el-container>




    </div>
    <Footer></Footer>
  </div>
</template>

<script>
import Header from "../Header";
import Footer from "../Footer";
export default {
  name: "Manage",
  components: {Header,Footer}
}
</script>

<style scoped>
.menuItem{

}

.menuItem:focus {
  border-left: 2px solid orange;
  border-radius: 0;
}
</style>
