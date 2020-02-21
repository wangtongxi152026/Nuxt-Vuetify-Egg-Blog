import FastClick from 'fastclick';

(function(doc) {
  if (!doc.addEventListener) return;

  doc.addEventListener(
    'DOMContentLoaded',
    function() {
      console.log('DOMContentLoaded');
      FastClick.attach(doc.body); //解决手机浏览器点击事件300ms延迟的bug
    },
    false
  );
})(document, window);
