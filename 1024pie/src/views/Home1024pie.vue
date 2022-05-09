<template>
  <el-container>
    <el-header style="text-align: right; font-size: 12px">
      <el-row class="block-col-2">
        <el-col :span="8" style="text-align: left;">
          <Header/>
        </el-col>
        <el-col :span="8">
          <Centor/>
        </el-col>
        <el-col :span="8">
          <Footer/>
        </el-col>
      </el-row>
    </el-header>
    <el-main>
      <!-- Main -->
      <img alt="1024pie logo" src="https://product-1256865522.cos.ap-shanghai.myqcloud.com/websit%2F1024%2F128on.png">
      <!-- 1024pie -->
      <Pie msg="通知：新功能即将上线，敬请期待！" />
    </el-main>
  </el-container>
</template>

<script lang="ts">
import { defineComponent } from 'vue'
import Header from '@/components/Head/Header.vue'
import Centor from '@/components/Head/Centor.vue'
import Footer from '@/components/Head/Footer.vue'
import Pie from '@/components/1024pie.vue'

export default defineComponent({
  name: 'Home',
  props: {
    msg: String
  },
  components: {
    Header,
    Centor,
    Footer,
    Pie
  }
})
</script>
<style scoped>
.el-header {
  /* background-color: #B3C0D1; */
  color: #333;
  text-align: center;
  line-height: 60px;
  flex-direction: column;
  max-height: 100vh;
  overflow: hidden;
  /* border-bottom: 2px solid rgb(105, 101, 103); */
  margin-top: 10px;
  border-top: 2px solid #d7e2f3;
  border-bottom: 2px solid #d7e2f3;
}
.el-main {
  /* background-color: #E9EEF3; */
  /* background-color: #8bb1e2; */
  color: #333;
  text-align: center;
  line-height: 60px;
  padding-bottom: 0px;
}
body > .el-container {
  margin-bottom: 40px;
}
.el-container:nth-child(5) .el-aside,
.el-container:nth-child(6) .el-aside {
  line-height: 260px;
}
.el-container:nth-child(7) .el-aside {
  line-height: 320px;
}
.el-dropdown-link {
  cursor: pointer;
  color: #409EFF;
}
.el-icon-arrow-down {
  font-size: 12px;
}
.demonstration {
  display: block;
  color: #8492a6;
  font-size: 14px;
  margin-bottom: 20px;
}
.yes {
  text-align: center;
}
</style>
