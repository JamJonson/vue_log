# Observe
## 模仿VUE实现数据劫持数据代理
---
### 通过Object.defineproperty实现数据劫持
```
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
}

// 模仿vue构建
let jamjonson = new JamJonson({
    el: '#app',
    data: {
        message: {
            name: 'JamJonson'
        }
    }
})
```

### 观察对象给对象增加object.defindproperty
```
function Observe(data){ // 编辑主要逻辑
    for (let key in data) { // 枚举对象data,把data属性通过object.defineproperty方式定义属性
        let val = data[key] // 拿到值
        observe(val) // 如果对象中包含对象，方法内判断是否是对象
        Object.defineProperty(data, key, {
            enumerable: true, // 可枚举
            configurable: true, // 可操作属性
            get() {
              // 默认拿到值return回去
              return val
            },
            set(newVal) { // 赋值时候出发
              if(newVal === val) { // 如果相同就不执行操作
                  return
              }
              val = newVal // 赋值给val,当下次取值的时候能拿到新值
              observe(newVal) // 希望赋值新对象也有get和set，例如 a = {a:2}, 如果没有这个方法会发现赋值后新对象没有get和set方法
            }
        })
    }
}
function observe(data){
    if (typeof data !== 'object') return // 不加会循环到底部，溢出报错 例如data: {a:{a: 'test'}, b: 'test2}
    return new Observe(data)
}
```