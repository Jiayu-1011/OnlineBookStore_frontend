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
    }
  },

}
