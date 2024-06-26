// function last(array) {
//   var length = array == null ? 0 : array.length;
//   return length ? array[length - 1] : undefined;
// }

const tocObj = {
  add(text, level) {
    const anchor = `toc${level}${++this.index}`;
    const item = { anchor, level, text };
    const items = this.tocItems;

    if (item.level <= 3) {
      items.push(item);
    }
    return anchor;
  },
  reset: function() {
    this.tocItems = [];
    this.index = 0;
  },
  tocItems: [],

  index: 0
};
export default tocObj;
