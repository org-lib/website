<template>
    <img class="minilogo" alt="1024pie logo" src="https://product-1256865522.cos.ap-shanghai.myqcloud.com/websit%2F1024%2F16on.png">
    <span class="logoname"> 1024pie</span>
    <!-- <el-icon class="logoname"><CoffeeCup /></el-icon> -->
    <span class="logoline"></span>
</template>
<script lang="ts">
</script>
<style scoped>
.logoname{
    font-size: 16px;
    margin-right: 20px;
    /* margin-left: 20px; */
}
.logoline{
    border-right: 1.7px dashed rgb(105, 101, 103);
}
</style>
<script lang="ts">
import { defineComponent, reactive, toRef, toRefs } from 'vue'
// import { CoffeeCup } from '@element-plus/icons'

export default defineComponent({
  name: 'HomeAgent',
  props: {
    msg: String,
  },
  components: {
    // CoffeeCup
  },
  setup() {
    const state = reactive({
      value: '100',
      mapvalue: '已连接'
    })
    return {
      ...toRefs(state)
    }
  }
})
</script>
<style scoped>
.minilogo {
  margin-top: 0px;
}
</style>
