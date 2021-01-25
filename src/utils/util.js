export default {
  hashBookClass(bookClass) {
    switch (bookClass){
      case 'children':
        return '儿童类';
        break;
      case 'science':
        return '科学类';
      case 'english':
        return '英语类';
      case 'textbook':
        return '教材类';
      default:
        return bookClass;
    }
  },
  hashBackBookClass(bookClass) {
    switch (bookClass){
      case '儿童类':
        return 'children';
        break;
      case '科学类':
        return 'science';
      case '英语类':
        return 'english';
      case '教材类':
        return 'textbook';
      default:
        return bookClass;
    }
  },
  hashSortType(sortType){
    switch (sortType){
      case 'default':
        return '默认排序';
      case 'comprehensive':
        return '综合排序';
      case 'sales':
        return '销量排序';
      case 'price':
        return '价格排序';
      case 'comment':
        return '好评排序';
    }
  },
  formatDate(date){
    let year = date.getFullYear();
    let month = date.getMonth() + 1 <10? '0'+(date.getMonth()+1) : date.getMonth()+1;
    let day =  date.getDate()<10? '0'+date.getDate() : date.getDate();
    console.log(year + '-' + month + '-' + day);
    return year + '-' + month + '-' + day;
  },


}
