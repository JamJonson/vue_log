# 实现computed简单实现

```
function JamJonson (option  = {}) { // option接受数据
        ......
        initComputed.call(this)
       .....
    }
function initComputed () {
        let vm = this
        let computed = this.$option.computed
        Object.keys(computed).forEach(function(key){
            Object.defineProperty(vm, key, {
                get: typeof computed[key] === 'function' ? computed[key] : computed[key].get
            })
        })
    }
```