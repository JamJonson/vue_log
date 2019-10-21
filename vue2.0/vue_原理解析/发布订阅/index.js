// 发布订阅模式 先有订阅再有发布

// 绑定的方法都有update属性
function Dep () {
    this.subs = []
}
Dep.prototype.addSub = function (sub) { // 订阅
    this.subs.push(sub)
}

Dep.prototype.notify = function () { // 通知
    this.subs.forEach(sub => sub.update()); // 给每个方法加上update属性
}

// Watcher是一个类 通过这个类创建的实例都拥有update方法
function Watcher (fn) {
    this.fn = fn
}

Watcher.prototype.update =  function () {
    this.fn()
}

let watcher = new Watcher(function(){
    console.log('JamJonson')
})


let dep = new Dep();
console.log(dep);
dep.addSub(watcher);
dep.notify()