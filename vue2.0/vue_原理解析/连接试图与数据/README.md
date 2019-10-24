# 连接试图与数据
---
个人理解：
  1、在编译模板时候Compaile内watcher，知道哪些数据要监听
  2、在watch内以下这段代码触发对象的get的方法，即Observe内的 Object.defineProperty内订阅
```
    Dep.target = this
    let val = vm // 配合数据代理理解
    let arr = exp.split('.')
    arr.forEach(function(k) { // 获取this.a.a, 触发get方法，然后在get方法进行订阅,
        val = val[k]
    })
    Dep.target = null
```
  3、创建了订阅之后再改变数据的时候就会触发set的方法，所以set方法内就要加上发布，就是notify，触发watch内的update更新数据显示