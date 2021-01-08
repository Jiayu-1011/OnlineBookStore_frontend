<template>
  <div>
    <Header></Header>

    <div style="padding: 20px;">

      <el-breadcrumb separator="/" style="padding: 20px;">
        <el-breadcrumb-item>首页</el-breadcrumb-item>
        <el-breadcrumb-item>我的订单</el-breadcrumb-item>
      </el-breadcrumb>

      <el-row style="">

        <el-col :span="9" :offset="2">

          <el-select v-model="selectedId" placeholder="请选择订单号">
            <el-option
              v-for="item in orderList"
              :key="item.orderId"
              :label="item.orderId"
              :value="item.orderId"
            ></el-option>
          </el-select>


        </el-col>

        <el-col :span="6" :offset="4">
          <el-card>
            <template slot="header">订单编号{{selectedId}}</template>

          </el-card>

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
  name: "Order",
  components: {Footer, Header},
  data(){
    return{
      selectedId: '',
      orderList: [],


    }
  },
  methods: {
    getOrderList(){
      this.$axios({
        url: this.$store.state.url + 'orderList/',
        method: 'GET',
        params: {
          account: this.$store.state.account,
        },
      }).then(res => {
        console.log('订单列表:', res);
        this.orderList = res.data.orderList;
      })
    },
    showOrderInfo(){
      console.log(this.selectedId);

    },

  },
  watch: {
    selectedId: function (){
      this.showOrderInfo();
    }
  },
  created() {
    this.getOrderList();
  },


}
</script>

<style scoped>

</style>
