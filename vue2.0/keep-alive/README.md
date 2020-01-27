## [keep-alive 清除缓存参考地址](https://segmentfault.com/a/1190000015845117?utm_source=tag-newest)
```
keep-alive 清除缓存
Vue.mixin({
  beforeRouteLeave: function (to, from, next) {
		// 判断要清除的缓存
    if (this.$store.state.tagsView.deleteViews.indexOf(from.name) > -1) {
      if (this.$vnode.parent && this.$vnode.parent.componentInstance && this.$vnode.parent.componentInstance.cache) {
        if (this.$vnode.componentOptions) {
          var key = this.$vnode.key == null
            ? this.$vnode.componentOptions.Ctor.cid + (this.$vnode.componentOptions.tag ? `::${this.$vnode.componentOptions.tag}` : '')
            : this.$vnode.key
          var cache = this.$vnode.parent.componentInstance.cache
          var keys = this.$vnode.parent.componentInstance.keys
          if (cache[key]) {
            if (keys.length) {
              var index = keys.indexOf(key)
              if (index > -1) {
                keys.splice(index, 1)
              }
            }
            delete cache[key]
          }
        }
      }
    }
    next()
  }
})

```