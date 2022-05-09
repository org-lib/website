<template>
  <el-checkbox v-model="checked1" @change="handleCheckedStartupChange">开机启动神盾</el-checkbox>
  <!-- <el-checkbox v-model="checked2" @change="handleCheckedNetworkChange"></el-checkbox> -->
</template>

<script lang="ts">
import { defineComponent, reactive, toRefs, onMounted } from 'vue'
import API from '../../api'
import { ElMessage } from 'element-plus'

export default defineComponent({
  setup() {
    onMounted(() => {
      API.local.API_LOCAL().then(function (res) {
        console.log('get success.')
        if ((JSON.parse(JSON.stringify(res))).status === 0) {
          state.checked1 = (JSON.parse(JSON.stringify(res))).auto
        }
      }).catch(function (err) {
        // ElMessage({
        //   showClose: true,
        //   message: 'Oops, shangguannihao@gmail.com .\n' + err,
        //   type: 'error'
        // })
        console.log(err)
      })
    })
    let timerDelay = null
    const state = reactive({
      checked1: false
    })
    setTimeout(() => {
      console.log('延迟查询')
    }, 3000)
    API.local.API_LOCAL().then(function (res) {
      console.log('get success.')
      if ((JSON.parse(JSON.stringify(res))).status === 0) {
        state.checked1 = (JSON.parse(JSON.stringify(res))).auto
      }
    }).catch(function (err) {
      // ElMessage({
      //   showClose: true,
      //   message: 'Oops, shangguannihao@gmail.com .\n' + err,
      //   type: 'error'
      // })
      console.log(err)
    })
    const handleCheckedStartupChange = (value) => {
      timerDelay = setTimeout(() => {
        timerDelay = null
      }, 3000)
      state.checked1 = value
      API.local.API_SETTINGS(state).then(function(res) {
        console.log('set success.')
        console.log((JSON.parse(JSON.stringify(res))).message)
      }).catch(function(err) {
        ElMessage({
          showClose: true,
          message: 'Oops .' + err,
          type: 'error'
        })
      })
    }
    return {
      ...toRefs(state),
      handleCheckedStartupChange
    }
  }
})
</script>
