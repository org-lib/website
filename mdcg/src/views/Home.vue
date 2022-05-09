<template>
  <div class="home" :model="form">
    <zhihu-header :month="month" :day="day" />
    <div class="bt">
      <el-row class="mb-4">
        <el-button type="primary" @click="handleCommit" round>{{ form.loading ? '正在安装...' : '一键安装' }}</el-button>
      </el-row>
    </div>
    <div class="bt2">
      <h1>{{ form.logs }}</h1>
    </div>
  </div>
</template>

<script>
// @ is an alias to /src
import zhihuHeader from "@/components/Header.vue";
import { defineComponent, reactive, toRefs, computed } from "vue";
import utils from "../utils";
import { ElMessage } from 'element-plus'

export default defineComponent({
  name: "Home",
  components: {
    zhihuHeader
  },
  setup() {
    let delay = null
    let cnt = 0
    const state = reactive({
      date: new Date(),
      bannerData: [],
      newsData: [],
      form:{
        loading:false,
        logs:''
      }
    });
    let day = computed(() => utils.formatTime(state.date)[2]);
    let month = computed(() => utils.formatTime(state.date)[1]);

    // onMounted(async () => {
    // });
    function handleCommit(params) {
      cnt = cnt + 1
      if (!delay) {
        // 时隔两秒后delay才能为null
        delay = setTimeout(() => {
          delay = null
        }, 3000) 
        form.logs = '.xxxx.' + cnt
        console.log('.xxxx.'+cnt)
      }else{
        ElMessage({
          showClose: true,
          message: 'Oops, 您优雅的点击了' + cnt + '次',
          type: 'error'
        })
      }
    }
    return {
      ...toRefs(state),
      day,
      month,
      handleCommit
    };
  }
});
</script>
<style lang="less" scoped>
.bt{
  box-sizing: border-box;
  position: absolute;
  bottom: 50%;
  top: 1.2rem;
  padding: 0.2rem;
  width: 100%;
  background: linear-gradient(
    0,
    rgba(55, 86, 103, 0.5),
    rgba(55, 86, 103, 0)
  );
  .el-row{
    position: relative;
    top: 50%;
    margin: auto;
    .el-button{
      margin: auto;
      width: 50%;
      height: inherit;
      border: 3px solid green;
      padding: 20px;
    }
  }
}
.bt2{
  position: absolute;
  bottom: 0;
}
</style>
