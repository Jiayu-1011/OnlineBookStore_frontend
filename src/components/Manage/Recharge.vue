<template>
  <div style="display: flex;">
    <div>

      <div>账户充值</div>
      <el-select
        v-model="selectedName" placeholder="请选择用户"
        style="margin-top: 15px;"
      >
        <el-option v-for="item in userList" :label="item.name" :value="item.name" :key="item.name"></el-option>
      </el-select>
    </div>

    <div style="margin-left: 20px;">
      <el-form
        :model="userInfo" style="display: flex;flex-direction: column;"
      >
        <el-form-item label="姓名">
          <el-input v-model="userInfo.name" disabled></el-input>
        </el-form-item>
        <el-form-item label="账户余额">
          <el-input v-model="userInfo.balance" disabled></el-input>
        </el-form-item>
        <el-form :model="rechargeOption" :rules="rules" v-if="selectedName!==''">
          <el-form-item label="充值数额" prop="recharge">
            <el-input v-model="rechargeOption.recharge"></el-input>
          </el-form-item>

        </el-form>

        <el-form-item v-if="selectedName!==''">
          <el-button type="danger" @click="submitRecharge">确认充值</el-button>
        </el-form-item>
        <div v-if="submitted" style="color: red;font-weight: 600;margin: 20px 0 0 0;">页面会在{{countDown}}秒后自动刷新</div>
      </el-form>
    </div>

  </div>
</template>

<script>
export default {
  name: "Recharge",
  data(){
    return{
      selectedName: '',
      userList: [],
      userInfo: {
        name: '',
        account: '',
        balance: 0,
      },
      rechargeOption: {
        recharge: '',
      },
      rules: {
        recharge: [{
          required: true,
          message: '充值数额不能为空',
          trigger: 'blur',
        }]
      },
      submitted: false,
      countDown: 5,


    }
  },
  methods: {
    getUserList(){
      this.$axios({
        url: this.$store.state.url + 'userList/',
        method: 'GET',
        params: {

        },

      }).then(res => {
        console.log('用户列表：', res);
        this.userList = res.data.userList;

      })
    },
    showUserInfo(){
      this.userList.forEach(user => {
        if(user.name === this.selectedName){
          this.userInfo = user;
        }
      })

    },
    submitRecharge(){
      if(this.recharge === '') {
        this.$message.warning('请填写充值数额');
        return;
      }

      let data = new FormData()
      for(let key in this.userInfo){
        if(key === 'balance') {
          data.append(key, this.rechargeOption.recharge);
        } else {
          data.append(key, this.userInfo[key]);
        }
      }
      this.$axios({
        url: this.$store.state.url + 'recharge/',
        method: 'POST',
        data: data,

      }).then(res => {
        console.log('充值：', res);

        if(res.status === 200){
          this.$message.success('充值成功!');
          this.submitted = true;
          setTimeout(() => {
            location.reload();
          }, 5000);
          setInterval(() => {
            this.countDown--;
          }, 1000)
        } else {
          this.$message.error('充值失败');
        }

      })
    },

  },
  watch: {
    selectedName: function (){
      this.showUserInfo();
    }
  },
  created() {
    this.getUserList();
  }
}
</script>

<style scoped>

</style>
