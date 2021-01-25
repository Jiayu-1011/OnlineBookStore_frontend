<template>
  <div id="bookList">
    <el-breadcrumb
      separator="/"
      style="margin-top: 20px;width: 100%;padding-left: 20px;display: flex;align-items: flex-end;">
      <el-breadcrumb-item>首页</el-breadcrumb-item>

      <el-breadcrumb-item v-if="$route.query.bookClass">{{ bookClass }}</el-breadcrumb-item>
      <el-breadcrumb-item v-if="$route.query.sortType">{{ sortType }}</el-breadcrumb-item>
      <el-breadcrumb-item v-if="$route.query.keyWord">
        关键词:&nbsp;
        <span style="color: red;font-weight: 600;font-size: 20px;text-decoration-line: underline">
          {{ keyWord }}
        </span>
        &nbsp;的搜索结果
      </el-breadcrumb-item>
    </el-breadcrumb>

<!--    五种排序方式&#45;&#45;comprehensive（综合）,sales（销量）,price（价格）,comment（好评）,default（默认）-->
    <center>
    <el-row type="flex" align="middle" class="row-bg" style="width:80%;height:50px;margin-top: 40px;background-color: #d0e6ff;" >
      <el-col :span="2.5" :offset="2"><el-button id="comprehensive" @click="selectSortType">综合排序</el-button></el-col>
      <el-col :span="2.5"><el-button id="sales" @click="selectSortType">销量排序</el-button></el-col>
      <el-col :span="2.5"><el-button id="price" @click="selectSortType">价格排序</el-button></el-col>
      <el-col :span="2.5"><el-button id="comment" @click="selectSortType">好评排序</el-button></el-col>
      <el-col :span="2.5" :offset="5"><el-checkbox v-model="isAvailable" @click="isAvailable=!isAvailable">只看有货</el-checkbox></el-col>

    </el-row>
    </center>

    <el-container>
      <el-main>

        <el-card v-for="(item,index) in bookArr" :key="index" style="margin-bottom: 50px;">
          <el-row>
            <el-col :span="4">
              <img :src="item.imgUrl" alt="" width="150px" height="200px"/>
            </el-col>

            <el-col id="bookInfo" :span="20" style="padding-left: 20px;">

              <el-row style="display: flex;align-items: center;">
                <el-col :span="15" id="bookName">
                  <div
                    :id="item.bookId"
                    style="font-size: 25px;font-weight: 600;display: flex;align-items: flex-end;"
                    @click="handleBookSelect"
                  >
                    {{ item.name }}（{{ item.briefIntro }}）
                  </div>
                </el-col>

              </el-row>

              <el-row>
                <el-col :span="24">
                  <div style="font-size: 20px;color: red;">¥{{ item.price }}</div>
                </el-col>
              </el-row>

              <el-row>
                <el-col :span="24">
                  <div>
                    <span>{{item.writer}}</span>/
                    <span style="font-size: 13px;font-weight: 500;color: grey;">{{item.publishTime}}</span>/
                    <span>{{item.publisher}}</span>
                  </div>
                </el-col>
              </el-row>

              <el-row>
                <el-col :span="5">
                  <img
                    src="../../../assets/icon/star.png"
                    width="20px"
                    height="20px"
                    v-for="i in item.commentLevel"
                    style="margin-right: 3px;"
                  />
                </el-col>
              </el-row>

              <el-row>
                <el-col :span="5">
                  <div>月销量：{{item.salesPerMonth}}</div>
                </el-col>
              </el-row>

            </el-col>
          </el-row>

        </el-card>

      </el-main>

      <el-aside>

        <el-card>
          图书推荐

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
      // bookClass: '',
      bookName: '',







    }
  },
  methods:{
    getBookList(){
      let params = {};
      for(let key in this.$route.query){
        params[key] = this.$route.query[key];
      }



      this.$axios.get(this.$store.state.url + 'bookList/', {
        params: params
      }).then(res => {
        console.log('bookList:', res);
        this.bookArr = res.data.bookList;

      })
    },
    selectSortType(e){
      let params = {};
      for(let key in this.$route.query){
        params[key] = this.$route.query[key];
      }
      params.sortType = e.currentTarget.id;
      this.$router.push({
        path: '/home/bookList',
        query: params,
      })
    },
    handleBookSelect(e){
      console.log(e.target.id);
      this.$router.push({
        path:'/home/bookInfo/' + e.target.id,
      });
    },



  },
  computed: {
    bookClass: function (){
      return this.$util.hashBookClass(this.$route.query.bookClass);
    },
    keyWord: function (){
      return this.$route.query.keyWord;
    },
    sortType: function (){
      return this.$util.hashSortType(this.$route.query.sortType);
    }



  },
  watch: {
    bookClass: 'getBookList',
    keyWord: 'getBookList',
    sortType: 'getBookList',

  },
  created() {
    this.getBookList();
    this.$store.commit('setPageNum', this.$route.query.pageNum);
    // console.log(this.$route.params.bookClass, this.$route.params.pageNum);

  }


}
</script>
<style scoped>
#bookList .el-main{
  padding: 20px 60px;
}

#bookList .el-aside{
  padding: 20px;
}

#bookName{
  color: #3a8ee6;
}

#bookName:hover{
  text-decoration-line: underline;
  color: red;
  cursor: pointer;
}

#bookInfo .el-row{
  margin-bottom: 15px;
}


</style>
