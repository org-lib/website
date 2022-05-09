<template>
  <div>
    <p>免费     |    速度更快    |    无限流量    |    无服务器记录    |    提供随时远程办公环境    |    （VPN）多人共享服务等    <br></p>
    <div style="line-height: 15px;">
      <el-dropdown style="margin-right: 15px;margin-left: 15px" @command="handleCommand">
        <span class="el-dropdown-link">
          Windows<i class="el-icon-arrow-down el-icon--right"></i>
        </span>
        <template #dropdown>
          <el-dropdown-menu>
            <el-dropdown-item command="windown1" icon="el-icon-download">免费版</el-dropdown-item>
            <el-dropdown-item command="windown2" icon="el-icon-download">专业版</el-dropdown-item>
          </el-dropdown-menu>
        </template>
      </el-dropdown>
      <el-dropdown style="margin-right: 15px;margin-left: 15px" @command="handleCommand">
        <span class="el-dropdown-link">
          Macos<i class="el-icon-arrow-down el-icon--right"></i>
        </span>
        <template #dropdown>
          <el-dropdown-menu>
            <el-dropdown-item command="macdown1" icon="el-icon-download">免费版</el-dropdown-item>
            <el-dropdown-item command="macdown2" icon="el-icon-download">专业版</el-dropdown-item>
          </el-dropdown-menu>
        </template>
      </el-dropdown>
    </div>
    <h1>{{ msg }}</h1>
    <p>
      <a href="https://cli.vuejs.org" target="_blank" rel="noopener norefferrer">升级到EasyArrived专业版</a>.
    </p>
    <p class="comment">提供系统相关</p>
  </div>
</template>

<script lang="ts">
import { defineComponent } from 'vue'
import { ElMessage } from 'element-plus'

export default defineComponent({
  name: 'Remote',
  props: {
    msg: String
  },
  setup() {
    const handleCommand = (command: any) => {
      if (!command) {
        ElMessage(`${command} 菜单选项缺少command属性`)
        return
      }
      switch (command) {
        case 'macdown1':
          // this.userGroup();
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
      handleCommand
    }
  }
})
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>
a {
  color: #42b983;
  background-color: rgb(230, 13, 93);
  padding: 12px;
  border: 2px solid rgb(230, 13, 93);
  border-radius: 5px;
}
.comment {
  border: 2px dashed rgb(105, 101, 103);
  border-radius: 5px;
}
</style>
