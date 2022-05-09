<template>
  <div class="demo-progress">
    <el-progress :text-inside="true" :stroke-width="26" :percentage="percentage" :color="customColor" style="margin-top: 20px;">
        <span>{{ proces }}</span>
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

export default defineComponent({
  setup () {
    const state = reactive({
      percentage: 0,
      customColor: '#409eff',
      proces: '当前剩余流量'
    //   customColors: [
    //     { color: '#f56c6c', percentage: 20 },
    //     { color: '#e6a23c', percentage: 40 },
    //     { color: '#5cb87a', percentage: 60 },
    //     { color: '#1989fa', percentage: 80 },
    //     { color: '#6f7ad3', percentage: 100 },
    //   ],
    })
    setbar()
    setInterval(setbar, 6000)
    function setbar() {
      if (localStorage.getItem('Connected') === 'false') {
        return
      }
      const param = {
        mail: localStorage.getItem('Mail')
      }
      API.shield.API_GOBAR(param).then(function (res) {
        console.log('get bar success.')
        if ((JSON.parse(JSON.stringify(res))).status === 0) {
          state.percentage = (JSON.parse(JSON.stringify(res))).value
          state.proces = (JSON.parse(JSON.stringify(res))).msg
        }
        if ((JSON.parse(JSON.stringify(res))).status === -1) {
          console.log((JSON.parse(JSON.stringify(res))).msg)
          localStorage.setItem('Connected', 'false')
        }
      }).catch(function (err) {
        state.percentage = 0
        state.proces = '未开通流量服务'
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
