# compile 编译模板
##### [demo地址](./index.html)
```
function Compaile(el, vm) {
    vm.$el = document.querySelector(el) // el就是对应的id,对应的编译范围
    let fragment = document.createDocumentFragment() // 创建文档碎片，虚拟dom
    while(chlid = vm.$el.firstChild) {
        fragment.appendChild(chlid) // 把el内的内容推到fragment
    }
    replace(fragment) // 替换{{}，赋值}
    function replace(fragment) {
        Array.from(fragment.childNodes).forEach(function (node) { // 循环每一层
            let text = node.textContent
            let reg = /\{\{(.*)\}\}/g
            if (node.nodeType === 3 && reg.test(text)) {
                console.log(RegExp.$1) // a.a b
                let arr = RegExp.$1.split('.') // [a, a] [b]
                let val = vm // 配合数据代理理解
                arr.forEach(function(k) { // 循环取值
                    val = val[k]
                })
                node.textContent = text.replace(reg, val)
            }
            if (node.childNodes) {
                replace(node)
            }
        })
    }
    vm.$el.appendChild(fragment) // 再把虚拟dom赋值到文档上
}
```
