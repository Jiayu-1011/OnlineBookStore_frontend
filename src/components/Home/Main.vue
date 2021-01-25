<template>
  <div style="width: 100%;">
    <div style="width: 100%;display: flex;flex-direction: column;">



      <div style="width:100%;display: flex;align-items: center;margin-top: 50px;">

        <img src="../../assets/image/shang.jpg" height="100px" width="100px"
        style="margin-left: 100px;">


        <div style="width: 40%;height:100px;margin-left: 200px;display: flex;align-items: center;">
          <el-input
            @focus="focus"
            @blur="blur"
            @keyup.enter.native="submitSearch"
            v-model="searchInput"
            clearable
            placeholder="请输入搜索内容"
            style=""
          ></el-input>
          <el-button
            type="primary" icon="el-icon-search" @click="submitSearch"
            style=""
          ></el-button>
          <el-card v-if="isSearch"></el-card>
        </div>


      </div>


      <el-menu class="" mode="horizontal" :router="true" style="display: flex;justify-content: center;">
        <el-menu-item index="/home" style="margin-right: 200px;">
          <div>主页</div>

        </el-menu-item>

        <el-menu-item id="children" @click="selectClass">
          <div>儿童类</div>

        </el-menu-item>

        <el-menu-item id="science" @click="selectClass">
          <div>科学类</div>

        </el-menu-item>

        <el-menu-item id="english" @click="selectClass">
          <div>英语类</div>

        </el-menu-item>

        <el-menu-item id="textbook" @click="selectClass">
          <div>教材类</div>

        </el-menu-item>


      </el-menu>

      <router-view></router-view>


    </div>
  </div>
</template>

<script>
export default {
  name: "Main",
  data(){
    return{
      searchInput: '',
    }
  },
  methods:{
    focus(){

    },
    submitSearch(){
      if(!this.searchInput.match(/^[ ]*$/)){
        this.$router.push({
          path: '/home/bookList',
          query: {
            keyWord: this.searchInput,
          }
        })
      } else {
        this.$router.push('/home/bookList')
      }

    },
    selectClass(e){
      this.$router.push({
        path: '/home/bookList',
        query: {
          bookClass: e.$attrs.id,
          pageNum: '1',
          sortType: 'default'
        }
      })
    },
    blur(){

    },




  },
  computed:{
    isSearch(){
      return this.isFocus;
    }
  },
  created() {
    console.log(this.$store.state);
  }
}
</script>

<style>

.el-input__inner{

}

</style>
