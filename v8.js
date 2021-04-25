// 在V8引擎逐行执行JavaScript代码的过程中，当遇到函数的情况时，
// 会为其创建一个函数执行上下文(Context)环境并添加到调用堆栈的栈顶，
// 函数的作用域(handleScope)中包含了该函数中声明的所有变量，当该函数执行完毕后
// ，对应的执行上下文从栈顶弹出，函数的作用域会随之销毁，其包含的所有变量也会统一释放并被自动回收
// 。试想如果在这个作用域被销毁的过程中，其中的变量不被回收，即持久占用内存，那么必然会导致内存暴增，
// 从而引发内存泄漏导致程序的性能直线下降甚至崩溃，因此内存在使用完毕之后理当归还给操作系统以保证内存的重复利用。

//V8引擎的内存限制
//JS单线程  既然JS是单线程的，那么也就意味着在V8执行垃圾回收时，
// 程序中的其他各种逻辑都要进入暂停等待阶段，直到垃圾回收结束后才会再次重新执行JS逻辑。
// 因此，由于JS的单线程机制，垃圾回收的过程阻碍了主线程逻辑的执行。

//垃圾回收机制  垃圾回收本身也是一件非常耗时的操作
//因此如果内存使用过高，那么必然会导致垃圾回收的过程缓慢，
// 也就会导致主线程的等待时间越长，浏览器也就越长时间得不到响应。

//V8的垃圾回收策略主要是基于分代式垃圾回收机制，其根据对象的存活时间将内存的垃圾回收进行不同的分代，然后对不同的分代采用不同的垃圾回收算法。

//新生代
//在V8引擎的内存结构中，新生代主要用于存放存活时间较短的对象。在新生代的垃圾回收过程中主要采用了Scavenge算法。
//Scavenge算法的垃圾回收过程主要就是将存活对象在From空间和To空间之间进行复制，同时完成两个空间之间的角色互换，因此该算法的缺点也比较明显，浪费了一半的内存用于复制。

//当一个对象在经过多次复制之后依旧存活，
// 那么它会被认为是一个生命周期较长的对象，在下一次进行垃圾回收时，该对象会被直接转移到老生代中，这种对象从新生代转移到老生代的过程我们称之为晋升。

// 对象晋升的条件主要有以下两个：

// 对象是否经历过一次Scavenge算法
// To空间的内存占比是否已经超过25%

// Mark-Sweep算法存在一个问题，就是在经历过一次标记清除后，内存空间可能会出现不连续的状态，
// 因为我们所清理的对象的内存地址可能不是连续的，所以就会出现内存碎片的问题，
// 导致后面如果需要分配一个大对象而空闲内存不足以分配，就会提前触发垃圾回收，而这次垃圾回收其实是没必要的
// ，因为我们确实有很多空闲内存，只不过是不连续的。
// 为了解决这种内存碎片的问题，Mark-Compact(标记整理)算法被提了出来，该算法主要就是用来解决内存的碎片化问题的，
// 回收过程中将死亡对象清除后，在整理的过程中，会将活动的对象往堆内存的一端进行移动，移动完成后再清理掉边界外的全部内存

// 因此，为了减少垃圾回收带来的停顿时间，V8引擎又引入了Incremental Marking(增量标记)的概念，
// 即将原本需要一次性遍历堆内存的操作改为增量标记的方式，先标记堆内存中的一部分对象，然后暂停，将执行权重新交给JS主线程，
// 待主线程任务执行完毕后再从原来暂停标记的地方继续标记，直到标记完整个堆内存。这个理念其实有点像React框架中的Fiber架构
// ，只有在浏览器的空闲时间才会去遍历Fiber Tree执行对应的任务，否则延迟执行，尽可能少地影响主线程的任务，避免应用卡顿，
// 提升应用性能。

// 得益于增量标记的好处，V8引擎后续继续引入了延迟清理(lazy sweeping)和增量式整理(incremental compaction)，
// 让清理和整理的过程也变成增量式的。同时为了充分利用多核CPU的性能，也将引入并行标记和并行清理，
// 进一步地减少垃圾回收对主线程的影响，为应用提升更多的性能。

//尽可能少地创建全局变量
// 手动清除定时器
//少用闭包 由于存在变量引用其返回的匿名函数，导致作用域无法得到释放，也就导致local变量无法回收，只有当我们取消掉对匿名函数的引用才会进入垃圾回收阶段。
//清除DOM引用 以往我们在操作DOM元素时，为了避免多次获取DOM元素，我们会将DOM元素存储在一个数据字典中
const elements = {
  button: document.getElementById("button"),
};

//弱引用