function last(array) {
  var length = array == null ? 0 : array.length;
  return length ? array[length - 1] : undefined;
}

// export interface TocItem {
//   anchor: string;
//   level: number;
//   text: string;
//   children?: TocItem[];
// }

// export type TocItems = TocItem[]; // TOC目录树结构

const tocObj = {
  add(text, level) {
    let anchor = `toc${level}${++this.index}`;
    let item = { anchor, level, text };
    let items = this.tocItems;
    if (item.level <= 3 && items.indexOf(item) === -1) {
      items.push(item);
    }

    // if (items.length === 0) {
    //   // 第一个 item 直接 push
    //   items.push(item);
    // } else {
    //   let lastItem = last(items); // 最后一个 item

    //   if (item.level > lastItem.level) {
    //     // item 是 lastItem 的 children
    //     for (let i = lastItem.level + 1; i <= 3; i++) {
    //       const { children } = lastItem;
    //       if (!children) {
    //         // 如果 children 不存在
    //         lastItem.children = [item];
    //         break;
    //       }

    //       lastItem = last(children); // 重置 lastItem 为 children 的最后一个 item

    //       if (item.level <= lastItem.level) {
    //         // item level 小于或等于 lastItem level 都视为与 children 同级
    //         children.push(item);
    //         break;
    //       }
    //     }
    //   } else {
    //     // 置于最顶级
    //     items.push(item);
    //   }
    // }

    return anchor;
  },
  tocItems: [],

  index: 0
};
export default tocObj;
