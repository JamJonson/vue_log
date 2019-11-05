<template>
  <div id="app" class="g-window">
    <!-- <img src="./images/logo.png"> -->
    <router-view></router-view>
    <!-- <div>咨询医生</div> -->
  </div>
</template>

<script>
/**
 * 咨询医生
 * @vuedoc (固定)
 * @exports modules
*/
// import {
//   keyboardAdaptation
// } from '@/utils/pageUtil'
// import {getWxSign} from '@/utils/wx.js'
export default {
  name: 'app',
  // components: {
  //   Hello
  // }
  created () {
    // keyboardAdaptation()
    // 禁用分享
    // getWxSign('hideOptionMenu')
    window.addEventListener('popstate', () => {
      this.checkRouter()
    }, false)
  },
  methods: {
    checkRouter () {
      if ((this.$route.path === '/consult_director' || this.$route.path === '/consult_doctor') && sessionStorage.getItem('differentPrdDetailsUrl') !== undefined) {
        let state = {
          title: 'title',
          url: sessionStorage.getItem('differentPrdDetailsUrl')
        }
        window.history.pushState(state, state.title, state.url)
        sessionStorage.removeItem('differentPrdDetailsUrl')
      }
    }
  }
}
</script>

<style>
  #app {
    font-family: 'Avenir', Helvetica, Arial, sans-serif;
    -webkit-font-smoothing: antialiased;
    -moz-osx-font-smoothing: grayscale;
    /* text-align: center; */
    color: #2c3e50;
    height: 100%;
    /* margin-top: 60px; */
    /* background-color: #f8f8f8; */
  }
  html{
        background-color: #f8f8f8;
        height: 100%;
  }
  body{
    height: 100%;
  }
</style>
