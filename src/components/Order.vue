<template>
  <div>
    <Header></Header>

    <div style="padding: 20px;">

      <el-breadcrumb separator="/" style="padding: 20px;">
        <el-breadcrumb-item>首页</el-breadcrumb-item>
        <el-breadcrumb-item>我的订单</el-breadcrumb-item>
      </el-breadcrumb>

      <el-row style="">

        <el-col :span="5" :offset="2">

          <el-select v-model="selectedId" placeholder="请选择订单号">
            <el-option
              v-for="item in orderList"
              :key="item.orderId"
              :label="item.orderId"
              :value="item.orderId"
            ></el-option>
          </el-select>


        </el-col>

        <el-col :span="12">
          <el-card>
            <div slot="header">
              <span>订单编号&emsp;&emsp;{{selectedId}}</span>
            </div>

            <div>
              <div style="margin: 20px 0 0 0;">订单时间&emsp;&emsp;{{selectedOrder.orderTime}}</div>
              <div style="margin: 20px 0 0 0;">订单金额&emsp;&emsp;{{selectedOrder.orderPrice}}</div>
              <div style="margin: 20px 0 0 0;display: flex;">
                <div>订单书目</div>
                <div style="width:80%;display: flex;flex-direction: column;align-items: flex-end;">
                  <div v-for="item in goodsArr" :key="item" style="display: flex;align-items: center;margin: 10px;">
                    <div
                      @click="openEBook" :id="item" style="color: #3a8ee6;text-decoration-line: underline;cursor: pointer;"
                    >{{item}}</div>
                    <el-button
                      :id="item" type="primary" circle size="small" @click.native="downloadBook"
                      style="margin: 0 0 0 10px;"
                    >
                      <i class="el-icon-download" ></i>
                    </el-button>
                  </div>

                </div>
              </div>
            </div>

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
import FileSaver from 'file-saver'
export default {
  name: "Order",
  components: {Footer, Header},
  data(){
    return{
      selectedId: '',
      orderList: [],
      selectedOrder: {

      },
      goodsArr: [],
      fileName: '',



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
      this.orderList.forEach(order => {
        if(order.orderId === this.selectedId){
          this.selectedOrder = order;
        }
      })
      this.goodsArr = this.selectedOrder.goods.split(',')
      console.log(this.goodsArr)

    },
    downloadBook(e){
      this.fileName = e.currentTarget.id.split(':').join('') + '.pdf';
      this.$axios({
        url: this.$store.state.url + 'downloadBook/',
        method: 'GET',
        params: {
          bookId: e.currentTarget.id,
        },
        //类型选择blob而不是arraybuffer
        responseType: 'blob',
      }).then(res => {
        console.log('下载文件:', res);
        FileSaver.saveAs(res.data, this.fileName);
      })

    },
    openEBook(e){
      let id = e.currentTarget.id;
      let url = 'http://119.29.24.77/sources/bookstore/eBook/' + id.split(':').join('') + '.pdf';
      window.open(url);
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
