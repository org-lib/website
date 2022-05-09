<template>
  <div class="demo-progress">
    <!-- <el-progress :text-inside="true" :stroke-width="26" :percentage="percentage" :color="customColor" style="margin-top: 20px;">
        <span>当前剩余流量</span>
    </el-progress> -->
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

export default defineComponent({
  setup () {
    const state = reactive({
      percentage: 20,
      customColor: '#409eff'
    //   customColors: [
    //     { color: '#f56c6c', percentage: 20 },
    //     { color: '#e6a23c', percentage: 40 },
    //     { color: '#5cb87a', percentage: 60 },
    //     { color: '#1989fa', percentage: 80 },
    //     { color: '#6f7ad3', percentage: 100 },
    //   ],
    })
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
