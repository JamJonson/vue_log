<template>
  <div>
    <div>{{hello}}</div>
    <div>{{mixinhellow}}</div>
  </div>
</template>
<script>
/**
 * 描述
 * @vuedoc
 * @exports view/organization/role
 */
import hellomixins from '@/mixins/helloworld/index'
export default {
  data () {
    return {
      hello: 'helloWorld'
    }
  },
  mixins: [hellomixins]
}
</script>
<style lang='scss' scoped>
</style>
