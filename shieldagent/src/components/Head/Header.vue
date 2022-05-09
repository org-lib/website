<template>
    <span class="logoname">神盾免费版</span>
    <span class="logoline"></span>
    <!-- <el-tooltip :content="'不可点击，当前状态: ' + mapvalue" placement="right">
        <el-switch disabled
        v-model="value"
        active-color="#13ce66"
        inactive-color="#ff4949"
        active-value="100"
        inactive-value="0"
        style="margin-left:10px"
        />
    </el-tooltip> -->
    <span style="margin-left:5px">{{ mapvalue }}</span>

</template>
<script lang="ts">
</script>
<style scoped>
.logoname{
    font-size: 16px;
    margin-right: 50px;
}
.logoline{
    border-right: 1.7px dashed rgb(105, 101, 103);
}
</style>
<script lang="ts">
import { defineComponent, reactive, toRef, toRefs } from 'vue'
import API from '../../api'

export default defineComponent({
  name: 'HomeAgent',
  props: {
    msg: String,
  },

  components: {
  },
  setup() {
    // onMounted(() => {
    //   Auth()
    // })
    const state = reactive({
      value: '100',
      mapvalue: '已连接'
    })
    setInterval(getstate, 1000)
    function getstate() {
      API.local.API_LOCAL_CONNECTION().then(function (res) {
        if ((JSON.parse(JSON.stringify(res))).status === 0) {
          if ((JSON.parse(JSON.stringify(res))).open === 1) {
            state.value = '100'
            state.mapvalue = '已连接'
            localStorage.setItem('ConnectedNet', 'true')
          }else{
            state.value = '1000'
            state.mapvalue = '已断开'
            localStorage.setItem('ConnectedNet', 'false')
          }
        }
      }).catch(function (err) {
        // ElMessage({
        //   showClose: true,
        //   message: 'Oops, shangguannihao@gmail.com .\n' + err,
        //   type: 'error'
        // })
        state.value = '1000'
        state.mapvalue = '已断开'
        console.log(err)
      })
      console.log('')
    }
    return {
      ...toRefs(state)
    }
  }
})
</script>
