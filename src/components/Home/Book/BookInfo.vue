<template>
  <div>

    <el-container>

      <el-main>

        <el-breadcrumb separator="/" style="margin: 0 0 20px 0;width: 100%;padding-left: 20px;">
          <el-breadcrumb-item>首页</el-breadcrumb-item>
          <el-breadcrumb-item>{{ bookClass }}</el-breadcrumb-item>
          <el-breadcrumb-item>图书详情</el-breadcrumb-item>
        </el-breadcrumb>

        <el-card style="margin-bottom: 50px;">
          <el-row>
            <el-col :span="4">
              <img :src="bookInfo.imgUrl" alt="" width="150px" height="200px"/>
            </el-col>

            <el-col id="bookInfo" :span="20" style="padding-left: 20px;">

              <el-row style="display: flex;align-items: center;">
                <el-col :span="15" id="bookName">
                  <div
                    :id="bookInfo.bookId"
                    style="font-size: 25px;font-weight: 600;display: flex;align-bookInfos: flex-end;"
                  >
                    {{ bookInfo.name }}（{{ bookInfo.briefIntro }}）
                  </div>
                </el-col>

              </el-row>

              <el-row>
                <el-col :span="24">
                  <div style="font-size: 20px;color: red;">¥{{ bookInfo.price }}</div>
                </el-col>
              </el-row>

              <el-row>
                <el-col :span="24">
                  <div>
                    <span>{{bookInfo.writer}}</span>/
                    <span style="font-size: 13px;font-weight: 500;color: grey;">{{bookInfo.publishTime}}</span>/
                    <span>{{bookInfo.publisher}}</span>
                  </div>
                </el-col>
              </el-row>

              <el-row>
                <el-col :span="5">
                  <img
                    src="../../../assets/icon/star.png"
                    width="20px"
                    height="20px"
                    v-for="i in bookInfo.commentLevel"
                    style="margin-right: 3px;"
                  />
                </el-col>
              </el-row>

              <el-row style="margin-top: 30px;">
                <el-col :offset="12">
                  <el-button type="danger" @click="addToCart" :disabled="isDisabled">加入购物车</el-button>
                </el-col>
              </el-row>

            </el-col>
          </el-row>

        </el-card>

      </el-main>

      <el-aside>

      </el-aside>

    </el-container>


  </div>

</template>

<script>
import util from "../../../utils/util";

export default {
  name: "BookInfo",
  data() {
    return{
      isDisabled: false,
      bookInfo: {
        bookId: '',
        imgUrl: '',
        name: '',
        briefIntro: '',
        price: '',
        writer: '',
        publishTime: '',
        publisher: '',
        commentLevel: '',
        bookClass: '',



      },
      bookClass: '',

    }
  },
  methods: {
    //获取单本书信息
    getBookInfo(){
      let data = new FormData();
      data.append('bookId', this.$route.params.bookId);
      this.$axios.post(this.$store.state.url + 'bookInfo/',data).then(res => {
        console.log(res);
        this.bookInfo = res.data.bookInfo[0];
        this.isDisabled = this.$store.state.shoppingList.includes(this.$route.params.bookId);
        this.bookClass = util.hashBookClass(this.bookInfo.bookClass);
      })


    },
    //商品添加至购物车
    addToCart(){
      if(this.$store.state.identity === 'visitor'){
        this.$message.info('请先登录后再操作！');
      } else {
        let data = new FormData()
        data.append('account', this.$store.state.account);
        data.append('bookId', this.$route.params.bookId);
        this.$axios.post(this.$store.state.url + 'addToCart/', data).then(res => {
          console.log('添加购物车', res);
          if(res.status == 200){
            this.$message.success('添加购物车成功！');
            this.$store.commit('addToShoppingList', this.$route.params.bookId);
            console.log(!this.$store.state.shoppingList.includes(this.$route.params.bookId));
            this.isDisabled = this.$store.state.shoppingList.includes(this.$route.params.bookId);
            console.log('购物车列表:', this.$store.state.shoppingList);
          } else{
            this.$message.error('添加购物车失败');
          }
        })
      }


    },


  },
  computed: {

  },
  created() {
    this.getBookInfo();

  }
}
</script>

<style scoped>
#bookInfo .el-row{
  margin-bottom: 15px;
}

</style>
