// 通过Object.defineproperty实现数据劫持
// setTimeout(()=>{
    function JamJonson (option  = {}) { // option接受数据
        // vue里面有vm.$option
        this.$option = option // 将所有的属性挂在在$option上，类似vue的vm.$option
        let data = this._data = this.$option.data
        observe(data)
        // 数据代理
        for (let key in data) {
            Object.defineProperty(this, key, {
                enumerable: true, // 可枚举
                get () {
                    return this._data[key] // this.message = {name: 'JamJonson'}
                },
                set (newVal) {
                    this._data[key] = newVal
                }
            })
        }
        new Compaile(option.el, this)
    }
    
    function Compaile(el, vm) {
        vm.$el = document.querySelector(el)
        let fragment = document.createDocumentFragment()
        while(chlid = vm.$el.firstChild) {
            fragment.appendChild(chlid)
        }
        replace(fragment)
        function replace(fragment) {
            Array.from(fragment.childNodes).forEach(function (node) {
                let text = node.textContent
                let reg = /\{\{(.*)\}\}/g
                if (node.nodeType === 3 && reg.test(text)) {
                    let arr = RegExp.$1.split('.')
                    let val = vm // 配合数据代理理解
                    arr.forEach(function(k) {
                        val = val[k]
                    })
                    new Watcher(vm, RegExp.$1, function (newVal) {
                      node.textContent = text.replace(/\{\{(.*)\}\}/, newVal)
                    })
                    // 替换的逻辑
                    node.textContent = text.replace(reg, val)
                }
                if (node.childNodes) {
                    replace(node)
                }
            })
        }
        vm.$el.appendChild(fragment)
    }
    
    // 观察对象给对象增加object.defindproperty
    function Observe(data){ // 编辑主要逻辑
        let dep = new Dep()
        for (let key in data) { // 枚举对象data,把data属性通过object.defineproperty方式定义属性
            let val = data[key] // 拿到值
            observe(val) // 如果对象中包含对象，方法内判断是否是对象
            Object.defineProperty(data, key, {
                enumerable: true, // 可枚举
                configurable: true, // 可操作属性
                get() {
                  // 默认拿到值return回去
                  Dep.target && dep.addSub(Dep.target)
                  return val
                },
                set(newVal) { // 赋值时候出发
                  if(newVal === val) { // 如果相同就不执行操作
                      return
                  }
                  val = newVal // 赋值给val,当下次取值的时候能拿到新值
                  observe(newVal) // 希望赋值新对象也有get和set，例如 a = {a:2}, 如果没有这个方法会发现赋值后新对象没有get和set方法
                  dep.notify() // 让所有的watcher的updater方法执行
                }
            })
        }
    }
    function observe(data){
        if (typeof data !== 'object') return // 不加会循环到底部，溢出报错 例如data: {a:{a: 'test'}, b: 'test2}
        return new Observe(data)
    }
// }, 2000)


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
function Watcher (vm, exp, fn) {
    this.fn = fn
    this.vm = vm
    this.exp = exp
    Dep.target = this
    let val = vm // 配合数据代理理解
    let arr = exp.split('.')
    arr.forEach(function(k) { // 获取this.a.a, 触发get方法，然后在get方法进行订阅,
        val = val[k]
    })
    Dep.target = null
}

Watcher.prototype.update =  function () {
    let arr = this.exp.split('.')
    let val =this. vm
    arr.forEach(function(k) {
        val = val[k]
    })
    this.fn(val)
}
// 模仿vue构建
let jamjonson = new JamJonson({
    el: '#app',
    data: {
        message: {
            name: 'JamJonson'
        },
        test: 2
    }
})