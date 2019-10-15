# Obejet.defineproperty

**Obejet.defineproperty不兼容低版本浏览器，IE8以下**

---
##### Object.defineProperty基础了解

参考地址：[Object.defineProperty()](https://developer.mozilla.org/zh-CN/docs/Web/JavaScript/Reference/Global_Objects/Object/defineProperty)
##### [demo地址](./index.html)
###### 了解情况1：
```
let obj = {}
Object.defineProperty(obj, 'name', {
    // 默认值为false, 通过defineProperty添加的属性是不能修改的，把configurable设置成ture后可以进行属性修改(delete等），但不能赋值，不能枚举
    configurable: true,
    // 默认值是false, 通过defineProperty添加的属性是不能赋值，把writable设置成ture后可以进行赋值运算，但不能属性修改，不能枚举
    writable: true,
    // 默认false, 通过defineProperty添加的属性是不能枚举，把enumerbale设置成ture后可以枚举
    enumerable: true,
    value: 'JamJonson'
})
obj.name = 'jamjonson2'
console.log(obj)
for (let index in obj) {
    console.log(index)
}
delete obj.name
console.log(obj)
```
###### 了解情况2：
```
let obj2 = {}
Object.defineProperty(obj2, 'name', {
    configurable: true,
    // 有get和set属性时候不需要wirtable和value,否则会报错
    // writable: true,
    enumerable: true,
    // value: 'JamJonson',
    get() { // 获取name值时候会调用get方法
        return 'JamJonson'
    },
    set(newVal) { // 赋值的时候会调用set方法 obj.name = 'xxxxx
        console.log(`name新值：${newVal}`)
        return newVal
    }
})
obj2.name = 'jamjonson2'
console.log(obj2)
for (let index in obj2) {
    console.log(index)
}
delete obj2.name
console.log(obj2)
```
