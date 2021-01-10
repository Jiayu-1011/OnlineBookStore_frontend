<template>
  <div style="width: 90%;">

    <div style="display: flex;">
      <div>
        <div>
          <span>修改图书信息</span>
          <span style="font-size: 15px;color: red;">(带*的为必填项)</span>
        </div>
        <el-select
          v-model="selectedId" placeholder="请选择图书编号" @change="showBookInfo"
          style="margin-top: 15px;"
        >
          <el-option v-for="item in bookList" :label="item.bookId" :value="item.bookId" :key="item.bookId"></el-option>
        </el-select>
        <div
          style="color: #6084ff;text-decoration-line: underline;cursor: pointer;margin-top: 15px;"
          @click="isDisabled=false" v-if="selectedId!==''"
        >开始编辑</div>
      </div>

      <div style="margin-left: 60px;">
        <el-form
          style="margin-top: 20px;width: 100%;display: flex;flex-direction: column;" :model="bookInfo"
          :disabled="isDisabled" :rules="rules"
        >

          <el-form-item prop="name" label="书名">
            <el-input v-model="bookInfo.name"></el-input>
            <!--          <span style="color: red;">*</span>-->
          </el-form-item>
          <el-form-item prop="price" label="价格">
            <el-input v-model="bookInfo.price"></el-input>
            <!--          <span style="color: red;">*</span>-->
          </el-form-item>
          <el-form-item prop="inventory" label="库存量">
            <el-input v-model="bookInfo.inventory"></el-input>
            <!--          <span style="color: red;">*</span>-->
          </el-form-item>
          <el-form-item label="种类">
            <el-select v-model="bookInfo.bookClass">
              <el-option v-for="item in classArr" :label="item" :value="item" :key="item"></el-option>
            </el-select>
            <!--        <span style="color: red;">*</span>-->
          </el-form-item>
          <el-form-item label="作者">
            <el-input v-model="bookInfo.writer"></el-input>
            <!--        <span style="color: red;">*</span>-->
          </el-form-item>
          <el-form-item label="出版社">
            <el-input v-model="bookInfo.publisher"></el-input>
            <!--        <span style="color: red;">*</span>-->
          </el-form-item>
          <el-form-item label="出版日期">
            <el-date-picker type="date" v-model="bookInfo.publishTime"></el-date-picker>
            <!--        <span style="color: red;">*</span>-->
          </el-form-item>
          <el-form-item label="评价等级">
            <el-select v-model="bookInfo.commentLevel">
              <el-option v-for="item in new Array(5).keys()" :label="item" :value="item" :key="item"></el-option>
            </el-select>
            <!--        <span style="color: red;">*</span>-->
          </el-form-item>
          <el-form-item label="简介">
            <el-input
              type="textarea" v-model="bookInfo.briefIntro"
              style="width: 90%;" maxlength="20" show-word-limit
              resize="none" :rows="4"
            ></el-input>
            <!--        <span style="color: red;">*</span>-->
          </el-form-item>

          <el-form-item>
            <el-button type="danger" @click="submitModifyAction">确认修改</el-button>
          </el-form-item>

          <div v-if="submitted" style="color: red;font-weight: 600;margin: 20px 0 0 0;">页面会在{{countDown}}秒后自动刷新</div>



        </el-form>

      </div>

    </div>


  </div>
</template>

<script>
import util from "../../utils/util";

export default {
  name: "DeleteBook",
  data(){
    return{
      selectedId: '',
      bookList: [],
      bookInfo: {
        name: '',
        price: '',
        salesPerMonth: '',//可选
        publishTime: '',
        publisher: '',
        commentLevel: '',//可选
        inventory: '',//库存
        briefIntro: '',
        bookClass: '',//选择
        coverFile: '',
        writer: '',
        eBookFile: '',

      },
      classArr: [
        '儿童类',
        '科学类',
        '英语类',
        '教材类',
      ],
      isDisabled: true,
      rules: {
        name: [{
          required: true,
          message: '书名不能为空',
          trigger: 'blur'
        }],
        price: [{
          required: true,
          message: '价格不能为空',
          trigger: 'blur'
        }],
        inventory: [{
          required: true,
          message: '库存量不能为空',
          trigger: 'blur'
        }],

      },
      submitted: false,
      countDown: 5,


    }
  },
  methods: {
    getBookList(){
      this.$axios({
        url: this.$store.state.url + 'bookList/',
        method: 'GET',
        params: {
          name: '',
          bookClass: '',
        },

      }).then(res => {
        console.log('所有图书列表:', res);
        this.bookList = res.data.bookList;
      })
    },
    showBookInfo(){
      this.isDisabled = true;
      this.bookList.forEach(item => {
        if(item.bookId === this.selectedId) {
          this.bookInfo = item;
        }
      })
      // console.log(this.bookInfo.bookClass);
      this.bookInfo.bookClass = util.hashBookClass(this.bookInfo.bookClass);

    },
    submitModifyAction(){
      console.log(this.bookInfo);
      if(this.bookInfo.name==='' || this.bookInfo.price==='' || this.bookInfo.inventory==='') {
        this.$message.warning('请填写必填项！');
        return;
      }

      let data = new FormData();
      for(let key in this.bookInfo){
        if(this.bookInfo[key] === '') {
          continue;
        }
        if(key === 'bookClass'){
          data.append(key, util.hashBackBookClass(this.bookInfo[key]));
        } else if(key==='publishTime') {
          if(typeof this.bookInfo[key] === "string") {
            continue;
          } else {
            // console.log(this.bookInfo[key]);
            data.append(key, util.formatDate(this.bookInfo[key]))
          }
        }
        else {
          data.append(key, this.bookInfo[key]);
        }
      }
      this.$axios({
        url: this.$store.state.url + 'modifyBook/',
        method: 'POST',
        data: data,
      }).then(res => {
        console.log(res);
        if(res.status === 200){
          this.$message.success('修改图书信息成功！');
          this.submitted = true;
          setTimeout(() => {
            location.reload();
          }, 5000);
          setInterval(() => {
            this.countDown--;
          }, 1000)
        } else {
          this.$message.error('修改图书信息失败');
        }

      })

    },

  },
  watch: {
    selectedId: function (){
      this.showBookInfo();
    },
  },
  created() {
    this.getBookList();
  }


}
</script>

<style scoped>

</style>
