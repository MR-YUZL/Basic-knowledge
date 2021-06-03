function throttle(fn, wait) {
  let args, context;
  let per = 0;
  return function () {
    let nowTime = +new Date();
    context = this;
    args = arguments;
    if (nowTime - per > wait) {
      fn.apply(context, args);
      per = nowTime;
    }
  };
}
