<template>
  <div>
    <el-breadcrumb separator="/" style="margin-top: 20px;width: 100%;padding-left: 20px;">
      <el-breadcrumb-item>首页</el-breadcrumb-item>
      <el-breadcrumb-item>{{ book_class }}</el-breadcrumb-item>
    </el-breadcrumb>

    <center>
    <el-row type="flex" align="middle" class="row-bg" style="width:80%;height:50px;margin-top: 40px;background-color: #d0e6ff;" >
      <el-col :span="2.5" :offset="2"><el-button>综合排序</el-button></el-col>
      <el-col :span="2.5"><el-button>销量排序</el-button></el-col>
      <el-col :span="2.5"><el-button>价格排序</el-button></el-col>
      <el-col :span="2.5"><el-button>好评排序</el-button></el-col>
      <el-col :span="2.5" :offset="5"><el-checkbox v-model="isAvailable" @click="isAvailable=!isAvailable">只看有货</el-checkbox></el-col>

    </el-row>
    </center>

    <el-container>
      <el-main>

        <el-card v-for="item in bookArr" :key="item">
          <el-row>
            <el-col :span="6">
              <img :src="item.imgUrl"/>
            </el-col>
            <el-col :span="18"></el-col>
          </el-row>

        </el-card>

      </el-main>

      <el-aside>

        <el-card>

        </el-card>

      </el-aside>
    </el-container>





    <div>


    </div>


  </div>
</template>


<script>
export default {
  name: "BookList",
  data(){
    return{
      isAvailable: false,
      bookArr: [],



    }
  },
  methods:{
    getBookList(){
      this.$axios.get(this.$store.state.url + 'bookList/', {
        params:{
          bookName: this.bookName,
          bookClass: this.bookClass,
        }
      }).then(res => {
        console.log(res);

      })
    },



  },
  computed: {
    book_class: function (){
      switch (this.$route.params.book_class){
        case 'children':
          return '儿童类';
          break;
        case 'science':
          return '科学类';
        case 'english':
          return '英语类';
        case 'textbook':
          return '教材类';
      }
    },



}

}
</script>
<style scoped>


</style>
