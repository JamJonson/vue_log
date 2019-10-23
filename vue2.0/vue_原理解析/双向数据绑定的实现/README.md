# 简单的双向数据绑定的实现

在Compaile编译模板的时候监听v-的数据
```
if (node.nodeType === 1) {
    // 元素节点
    let nodeAttrs = node.attributes // 获取当前节点上dom的属性
    Array.from(nodeAttrs).forEach((attr) => {
        let name = attr.name
        let exp  = attr.value
        if (name.indexOf('v-') >= 0){
            node.value = vm[exp]
        }
        new Watcher(vm, exp, function (newVal) {
            node.value = newVal //当watcher触发时会自动将内容放到输入框内
        })
        node.addEventListener('input', function(e){
            let newVal = e.target.value // 获取新输入的值
            vm[exp] = newVal // 赋值新值时候会调用set方法更新
        })
    });
}
```