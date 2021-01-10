<template>
  <div>
    <div>统计图书信息</div>
    <div>
      <div style="margin-top: 20px;color: #6084ff;">根据图书类别：</div>
      <div v-for="item in classStats" :key="item.class" style="margin-top: 20px;">
        <span>{{item.class}}:</span>
        <span>{{item.quantity}}本</span>
      </div>
    </div>

  </div>
</template>

<script>
import util from "../../utils/util";

export default {
  name: "BookStats",
  data(){
    return{
      classStats: {
        class: '',
        quantity: 0,
      }

    }
  },
  methods: {
    getBookStats(){
      this.$axios({
        url: this.$store.state.url + 'bookStats/',
        method: 'GET',
        params: {

        }
      }).then(res => {
        console.log('图书统计信息：', res);
        this.classStats = res.data.classStats;
        for(let i=0;i<this.classStats.length; i++){
          if(this.classStats[i].class === ''){
            this.classStats[i].class = '未知类型';
          } else {
            this.classStats[i].class = util.hashBookClass(this.classStats[i].class);
          }
        }
      })
    },


  },
  created() {
    this.getBookStats();

  }
}
</script>

<style scoped>

</style>
