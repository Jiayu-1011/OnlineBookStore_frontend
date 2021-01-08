<template>
  <div>
    <Header></Header>

    <div style="width:45px;position: sticky;top: 30%;left: 90%;z-index: 99;">

      <div
        id="shoppingCart"
        style="display: flex;justify-content: center;align-items: center;"
        title="我的购物车"
        @click="enterShoppingCart"
      >

        <img
          src="../assets/icon/shoppingCart.png"
          width="32"
          height="32"
        />
        <div
          style="width: 20px;height: 20px;border-radius: 50%;background-color: rgba(227,227,227,0.7);color: red;
          position: absolute;top: 0;right: 0;display: flex;align-items: center;justify-content: center;
          border: 0.6px solid rgba(239,239,239,0.7);
        ">
          <div>{{shoppingListSize}}</div>
        </div>

      </div>

      <div
        id="myOrder"
        style="display: flex;justify-content: center;align-items: center;margin-top:20px;"
        title="我的订单"
        @click="enterOrder"
      >
        <img
          src="../assets/icon/myOrder.png"
          width="32"
          height="32"
        />

      </div>

    </div>



    <router-view></router-view>
    <Footer></Footer>

  </div>
</template>

<script>
import Header from "../components/Header";
import Footer from "../components/Footer";


export default {
  name: "Home",
  components: {Footer, Header},
  data(){
    return{

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
      })
    },
    enterShoppingCart(){
      if(this.$store.state.identity === 'visitor') {
        this.$message.info('请您先登录后操作！');
      } else {
        this.$router.push('/shoppingCart');
      }
    },
    enterOrder(){
      if(this.$store.state.identity === 'visitor') {
        this.$message.info('请您先登录后操作！');
      } else {
        this.$router.push('/order');
      }
    },

  },
  computed: {
    shoppingListSize: function (){
      return this.$store.state.shoppingList.length;
    }


  },
  created() {
    this.getShoppingList();
  }
}
</script>

<style scoped>
*{

}

#shoppingCart{
  animation: anti-clockwise 0.5s;
}

@keyframes anti-clockwise {
  from{
    transform: rotate(360deg);
  }
  to{
    transform: rotate(0deg);
  }
}

#shoppingCart:hover{
  animation: clockwise 0.5s;
  cursor: pointer;
}


@keyframes clockwise {
  from{
    transform: rotate(0deg);
  }
  to{
    transform: rotate(360deg);
  }
}


#myOrder{
  animation: anti-clockwise 0.5s;
}

#myOrder:hover{
  animation: clockwise 0.5s;
  cursor: pointer;
}





</style>
