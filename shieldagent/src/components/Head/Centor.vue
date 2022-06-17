<template>
  <div class="demo-progress">
    <el-progress :text-inside="true" :stroke-width="26" :percentage="percentage" :color="customColor" style="margin-top: 20px;">
      <span style="color:#FF0000;">{{ expire }}</span>--><span style="color:#FF0000;">{{ upload }}</span>--><span style="color:#FF0000;">{{ down }}</span>
    </el-progress>
  </div>
</template>
<style scoped>
/* .percentage-label {
  display: block;
  margin-top: 10px;
  font-size: 12px;
  background-color: tomato;
} */
</style>
<script lang="ts">
import { defineComponent, reactive, toRefs } from 'vue'
import API from '../../api'
import { useRouter } from 'vue-router'

export default defineComponent({
  setup () {
    const state = reactive({
      percentage: 0,
      proces: '[当前流量使用情况]',
      expire: '过期时间：',
      upload: '已上传：',
      down: '已下载：',
      customColors: [
        { color: '#409eff', percentage: 0 },
        { color: '#f56c6c', percentage: 20 },
        { color: '#e6a23c', percentage: 40 },
        { color: '#5cb87a', percentage: 60 },
        { color: '#1989fa', percentage: 80 },
        { color: '#6f7ad3', percentage: 100 }
      ]
    })
    setbar()
    setInterval(setbar, 60000)
    function setbar() {
      // Login 表示用户一个生命周期,代表是否登录过，浏览器会记录登录后 Login 的值（只有登录后的用户 Login 才等于 true）
      if (localStorage.getItem('Login') === 'false') {
        return
      }
      const param = {
        mail: localStorage.getItem('Mail')
      }
      const router = useRouter()
      state.proces = '等待获取查询...'
      setTimeout(() => {
        console.log('等待6秒，后获取流量条')
      }, 6000)
      API.shield.API_GOBAR(param).then(function (res) {
        if ((JSON.parse(JSON.stringify(res))).status === 0) {
          state.percentage = (JSON.parse(JSON.stringify(res))).value
          state.proces = (JSON.parse(JSON.stringify(res))).msg
          state.expire = (JSON.parse(JSON.stringify(res))).expire
          state.upload = '已上传(MB)：' + (JSON.parse(JSON.stringify(res))).upload
          state.down = '已下载(MB)：' + (JSON.parse(JSON.stringify(res))).down
          localStorage.setItem('Expire', 'false')
        }
        if ((JSON.parse(JSON.stringify(res))).status === -1) {
          console.log((JSON.parse(JSON.stringify(res))).msg)
          state.percentage = 0
          state.proces = (JSON.parse(JSON.stringify(res))).msg
          localStorage.setItem('Expire', 'true')
          setTimeout(() => {
            router.push({
              path: '/login'
            })
          }, 2000)
        }
      }).catch(function (err) {
        state.percentage = 0
        state.proces = '请先登录...'
        console.log(err)
      })
    }

    const customColorMethod = (percentage) => {
      if (percentage < 30) {
        return '#909399'
      }
      if (percentage < 70) {
        return '#e6a23c'
      }
      return '#67c23a'
    }
    const increase = () => {
      state.percentage += 10
      if (state.percentage > 100) {
        state.percentage = 100
      }
    }
    const decrease = () => {
      state.percentage -= 10
      if (state.percentage < 0) {
        state.percentage = 0
      }
    }

    return {
      ...toRefs(state),
      customColorMethod,
      increase,
      decrease
    }
  }
})
</script>
