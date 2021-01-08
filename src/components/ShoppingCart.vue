<template>
  <div>

    <Header></Header>

    <div style="padding: 20px;">

      <el-breadcrumb separator="/" style="padding: 20px;">
        <el-breadcrumb-item>首页</el-breadcrumb-item>
        <el-breadcrumb-item>我的购物车清单</el-breadcrumb-item>
      </el-breadcrumb>

      <el-row>
        <el-col :span="6">
          <el-collapse style="width: 90%;margin: 20px;">

            <el-collapse-item v-for="(item, index) in shoppingList" :key="index" :title="item.name" >
              <span style="color: red;">￥{{item.price}}</span>
              <span>{{item.publishTime}}</span>
              <span>{{item.briefIntro}}</span>
            </el-collapse-item>

          </el-collapse>

        </el-col>

        <el-col :span="6" :offset="4">
          <div style="display: flex;flex-direction: column;align-items: flex-start;">

            <div style="align-self: flex-start">选中</div>

            <!--使用el-checkbox-group时必须给每个checkbox绑定作为添加进v-model的元素-->
            <el-checkbox-group v-model="checkedIds" @change="handleCheckChange">

              <div  v-for="(item, index) in shoppingList" :key="index">
                <el-checkbox :label="item.bookId" style="margin: 20px 0 7px 0;">
                  <span>{{item.name}}</span>
                </el-checkbox>
              </div>

            </el-checkbox-group>
            <div style="margin-top: 20px;">当前金额:<span style="color: red;">￥{{totalCost}}</span></div>

            <div style="display: flex;margin-top: 20px;">

              <el-button
                type="success" :disabled="isDisabled" style="align-self: flex-start;" @click="submitOrder"
              >
                提交订单
              </el-button>
              <el-button
                type="danger" circle icon="el-icon-delete" :disabled="isDisabled"
                style="align-self: flex-start;margin: 0 0 0 40px;" @click="deleteFromCart"
              >
              </el-button>
            </div>

            <div v-if="submitted" style="color: red;font-weight: 600;margin: 20px 0 0 0;">页面会在{{countDown}}秒后自动刷新</div>

          </div>
        </el-col>

      </el-row>







    </div>
    <Footer></Footer>

  </div>
</template>

<script>
import Header from "./Header";
import Footer from "./Footer";
export default {
  name: "ShoppingCart",
  components: {Footer, Header},
  data(){
    return {
      shoppingList: [],
      checkedIds: [],
      countDown: 5,
      submitted: false,


    }
  },
  computed: {
    totalCost: function (){
      let total = 0;
      this.checkedIds.forEach(bookId => {
        this.shoppingList.forEach(item => {
          if(bookId === item.bookId) {
            total += item.price;
          }
        })
      })

      return total;
    },
    isDisabled: function (){
      return this.checkedIds.length === 0;
    }
  },
  methods: {
    getShoppingList(){
      this.$axios.get(this.$store.state.url + 'shoppingList/', {
        params:{
          account: this.$store.state.account,
        }
      }).then(res => {
        console.log('购物车列表', res.data.shoppingList)
        this.$store.commit('setShoppingList', res.data.shoppingList);
        this.shoppingList = this.$store.state.shoppingList;

      })
    },
    handleCheckChange(){
      // console.log(this.checkedIds);
    },
    submitOrder(){
      this.$confirm('确认提交订单？', '提示', {
        confirmButtonText: '确认',
        cancelButtonText: '取消',
        type: 'success'
      }).then(() => {
        let data = new FormData();
        data.append('account', this.$store.state.account);
        data.append('bookId', this.checkedIds.join());
        this.$axios.post(this.$store.state.url + 'submitOrder/', data).then(res => {
          console.log('订单提交', res);
          if(res.status === 200) {
            this.$message.success('订单提交成功');
            this.submitted = true;
            setTimeout(() => {
              location.reload();
            }, 5000);
            setInterval(() => {
              this.countDown--;
            }, 1000)

          } else {
            this.$message.warning('订单提交失败');
          }
        })
      }).catch(() => {
        // this.$message.info('已取消');
      })

    },
    //从购物车中删除所选图书
    deleteFromCart(){
      this.$confirm('确认从购物车中删除？', '提示', {
        confirmButtonText: '确认',
        cancelButtonText: '取消',
        type: 'warning'
      }).then(() => {
        this.$axios({
          url: this.$store.state.url + 'deleteFromCart/',
          method: 'POST',
          data: {
            account: this.$store.state.account,
            bookId: this.checkedIds.join(),
          }
        }).then(res => {
          console.log('删除购物车图书:', res);
          this.$message.info('已删除');
          this.submitted = true;
          setTimeout(() => {
            location.reload();
          }, 5000);
          setInterval(() => {
            this.countDown--;
          }, 1000)
        })

      }).catch(() => {

      })

    }

  },
  created() {
    this.getShoppingList();
  },
}
</script>

<style scoped>

</style>
