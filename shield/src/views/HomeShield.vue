<template>
<el-container>
  <el-header style="text-align: right; font-size: 12px">
    <el-dropdown style="margin-right: 15px" @command="handleCommand">
      <span class="el-dropdown-link">
        账 号<el-icon class="yes"><ArrowDown /></el-icon>
      </span>
      <template #dropdown>
        <el-dropdown-menu>
          <el-dropdown-item command="regists"> <el-icon class="yes"><Plus /></el-icon>会员注册</el-dropdown-item>
          <el-dropdown-item command="login"><el-icon class="yes"><CirclePlus /></el-icon>登 录</el-dropdown-item>
        </el-dropdown-menu>
      </template>
    </el-dropdown>

    <span>上官不才</span>

  </el-header>
  <el-main>
    <!-- Main -->
    <img alt="Shield logo" src="https://product-1256865522.cos.ap-shanghai.myqcloud.com/websit%2Fshield%2F128.png">
    <!-- S.H.I.E.L.D -墙-->
    <Shield msg="购买神盾专业版"/>
  </el-main>
</el-container>
</template>

<script lang="ts">
import { defineComponent } from 'vue'
import Shield from '@/components/Shield.vue'
import { ArrowDown, Plus, CirclePlus } from '@element-plus/icons'

export default defineComponent({
  name: 'Home',
  components: {
    ArrowDown,
    Plus,
    CirclePlus,
    Shield
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
