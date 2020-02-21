// function guessGame(arr1, arr2) {
//   arr1 = arr1.split(/\s+/);
//   arr2 = arr2.split(/\s+/);

//   let countA = (countB = 0);
//   for (let i = 0; i < arr1.length; i++) {
//     for (let j = 0; j < arr2.length; j++) {
//       if (arr1[i] === arr2[j]) {
//         if (i === j) {
//           countA++;
//         } else {
//           countB++;
//         }
//       }
//     }
//   }
//   console.log(countA + 'A' + countB + 'B');
//   return countA + 'A' + countB + 'B';
// }
// guessGame('1 2 3 4', '1 2 5 3');
// function out(x) {
//   var temp = 2;
//   function inside(y) {
//     document.write(x + y + temp--);
//   }
//   inside(5);
// }
// out(3);

function good(num, n) {
  var res = parseInt(num, n).toString();
  if (res.length < 10) {
    res = '0.' + res + Array(res.length).join(0);
    print(res);
    return res;
  } else {
    print(res);
    res = '0.' + res.slice(10);
    
    return res;
  }
}
good(0.959559, 3);
