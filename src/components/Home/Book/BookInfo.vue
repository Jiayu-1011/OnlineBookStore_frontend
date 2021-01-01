<template>
  <div>
    {{bookId}}
  </div>

</template>

<script>
export default {
  name: "BookInfo",
  data() {
    return{
      bookId: '',

    }
  },
  methods: {
    getBookId(){
      this.bookId = this.$route.params.bookId;

    }

  },
  created() {
    this.getBookId();
  }
}
</script>

<style scoped>

</style>
