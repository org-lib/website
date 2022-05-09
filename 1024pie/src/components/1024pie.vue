<template>
  <div class="ma-main">
    <!-- <p>Github速度更快    |    无限流量    |    无服务器记录    |    提供随时远程办公环境    |    （VPN）多人共享服务等    |    拒绝挖矿    <br></p> -->
    <!-- <p>    提供随时远程办公环境    |    多人共享Pie等    |    拒绝挖矿    <br></p> -->
    <div style="line-height: 15px;">
      <el-dropdown style="margin-right: 15px;margin-left: 15px" @command="handleCommand">
        <span class="el-dropdown-link">
          客户端Pie：Windows<el-icon><ArrowDown /></el-icon>
          <!-- <i class="el-icon-arrow-down el-icon--right"></i> -->
        </span>
        <template #dropdown>
          <el-dropdown-menu>
            <el-dropdown-item command="windown1"><el-icon><Download /></el-icon>免费版</el-dropdown-item>
            <el-dropdown-item command="windown2"><el-icon><Download /></el-icon>专业版</el-dropdown-item>
          </el-dropdown-menu>
        </template>
      </el-dropdown>
      <el-dropdown style="margin-right: 15px;margin-left: 15px" @command="handleCommand">
        <span class="el-dropdown-link">
          Macos<el-icon><ArrowDown /></el-icon>
          <!-- <i class="el-icon-arrow-down el-icon--right"></i> -->
        </span>
        <template #dropdown>
          <el-dropdown-menu>
            <el-dropdown-item command="macdown1"><el-icon><Download /></el-icon>免费版</el-dropdown-item>
            <el-dropdown-item command="macdown2"><el-icon><Download /></el-icon>专业版</el-dropdown-item>
          </el-dropdown-menu>
        </template>
      </el-dropdown>
      <el-dropdown style="margin-right: 15px;margin-left: 15px" @command="handleCommand">
        <span class="el-dropdown-link">
          Linux<el-icon><ArrowDown /></el-icon>
          <!-- <i class="el-icon-arrow-down el-icon--right"></i> -->
        </span>
        <template #dropdown>
          <el-dropdown-menu>
            <el-dropdown-item command="linuxdown1"><el-icon><Download /></el-icon>免费版</el-dropdown-item>
            <el-dropdown-item command="linuxdown2"><el-icon><Download /></el-icon>专业版</el-dropdown-item>
          </el-dropdown-menu>
        </template>
      </el-dropdown>
    </div>
    <p>
      <a class="a1" href="https://www.1024pie.com/" target="_blank" rel="noopener norefferrer">升级到专业版（提供技术配对）</a>
    </p>
    <h1 class="tips">{{ msg }}</h1>
    <p class="comment"></p>
  </div>
  <div class="descript">
    首先：本平台会尽可能的提供纯粹、公开和透明的环境为宗旨来提供服务,并且，旨在对IT技术感兴趣的人员，提供从移动端、PC端的 web、PC端的 APP、H5、小程序、后端API、数据库到操作系统 等实现的 Demo。
    让初学计算机开发、运维、管理等人员，能够有一个快速上手的平台。<br/>同时，在互联网高速发展的今天，为了想能快速靠自己实现心中的梦想的人，能够尽可能不走弯路的快速掌握技术基础。
  </div>
</template>

<script lang="ts">
import { defineComponent, reactive, toRefs } from 'vue'
import { ElMessage } from 'element-plus'
import { Download, ArrowDown } from '@element-plus/icons'
// import Linux from '@/assets/svg-icon/linux.svg'
// import Windows from '@/assets/svg-icon/windows.svg'
// import Macos from '@/assets/svg-icon/macOS.svg'
export default defineComponent({
  name: '1024pie',
  props: {
    msg: String
  },
  components: {
    Download,
    ArrowDown
  },
  setup() {
    const state = reactive({
      productnames: ''
    })
    const handleCommand = (command) => {
      if (!command) {
        ElMessage(`${command} 菜单选项缺少command属性`)
        return
      }
      switch (command) {
        case 'macdown1':
          // this.userGroup();
          // ElMessage(`${command} 还未上线🤦‍♂️(。・＿・。)ﾉI’m sorry~`)
          ElMessage(`${command} 还未上线🤦‍♂️(。・＿・。)ﾉI’m sorry~`)
          break
        case 'windown1':
          // this.userGroup2();
          ElMessage(`${command} 还未上线🤦‍♂️(。・＿・。)ﾉI’m sorry~`)
          break
        case 'macdown2':
          // this.userGroup();
          ElMessage(`${command} 还未上线🤦‍♂️(。・＿・。)ﾉI’m sorry~`)
          break
        case 'windown2':
          // this.userGroup2();
          ElMessage(`${command} 还未上线 🤦‍♂️(。・＿・。)ﾉI’m sorry~`)
          break
      }
    }
    return {
      ...toRefs(state),
      handleCommand
    }
  }
})
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>
.a1 {
  color: white;
  background-color: rgb(230, 13, 93);
  padding: 12px;
  border: 2px solid rgb(230, 13, 93);
  border-radius: 5px;
}
.comment {
  /* border-top: 2px dashed rgb(105, 101, 103); */
  /* border-radius: 5px; */
}
.ma-main {
  max-height: 100vh;
  overflow: hidden;
  margin-top: 10px;
  border-bottom: 2px solid #d7e2f3;
}
.descript{
  margin-top: 10px;
  border-bottom: 2px solid #d7e2f3;
  padding-bottom: 100px;
}
.tips{
  color: white;
  border-radius: 10px;
  align-items: center;
  width: 30%;
  padding: 0px;
  background: #212121 !important;
  margin: auto;
  line-height: 40px;
}
</style>
