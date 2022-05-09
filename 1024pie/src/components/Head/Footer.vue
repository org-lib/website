<template>
    <el-dropdown style="margin-right: 15px" @command="FooterCommand">
        <span class="el-dropdown-link">
            <!-- 账 号<i class="el-icon-arrow-down el-icon--right"></i> -->
            账 号<el-icon><ArrowDown /></el-icon>
        </span>
        <template #dropdown>
            <el-dropdown-menu>
            <el-dropdown-item command="upgradelogin"><el-icon><Orange /></el-icon>登录(升级到专业版本)</el-dropdown-item>
            <el-dropdown-item command="uploadfile"><el-icon><UploadFilled /></el-icon>我的文件</el-dropdown-item>
            <el-dropdown-item command="showperson"><el-icon><StarFilled /></el-icon>邀请好友</el-dropdown-item>
            <el-dropdown-item command="getapp"><el-icon><Iphone /></el-icon>1024pie Android</el-dropdown-item>
            <el-dropdown-item command="getIOS"><el-icon><Iphone /></el-icon>1024pie IOS</el-dropdown-item>
            <!-- <el-dropdown-item command="settings"><el-icon><Tools /></el-icon>设置</el-dropdown-item> -->
            </el-dropdown-menu>
        </template>
    </el-dropdown>
    <span>{{username}}</span>

</template>

<script lang="ts">
import { defineComponent } from 'vue'
import { ElMessage } from 'element-plus'
import { ArrowDown, UploadFilled, Iphone, Orange, StarFilled } from '@element-plus/icons'

export default defineComponent({
  name: 'Footer',
  props: {
    msg: String
  },
  components: {
    ArrowDown,
    UploadFilled,
    Iphone,
    Orange,
    StarFilled
  },
  setup() {
    const FooterCommand = (command: any) => {
      if (!command) {
        ElMessage(`${command} 菜单选项缺少command属性`)
        return
      }
      switch (command) {
        case 'upgradelogin':
          // this.userGroup();
          ElMessage('登录(升级到专业版本) 还未上线🤦‍♂️(。・＿・。)ﾉI’m sorry~')
          break
        case 'uploadfile':
          // this.userGroup2();
          ElMessage(`${command} 还未上线🤦‍♂️(。・＿・。)ﾉI’m sorry~`)
          break
        case 'showperson':
          // this.userGroup();
          ElMessage('邀请好友 还未上线🤦‍♂️(。・＿・。)ﾉI’m sorry~')
          break
        case 'getapp':
          // this.userGroup2();
          ElMessage('Sheild Android 还未上线 🤦‍♂️(。・＿・。)ﾉI’m sorry~')
          break
        case 'grants':
          // this.userGroup2();
          ElMessage('授权设备使用专业版 还未上线 🤦‍♂️(。・＿・。)ﾉI’m sorry~')
          break
      }
    }
    return {
      FooterCommand
    }
  }
})
</script>
<style scoped>
.el-icon{
  padding-top: 10px;
}
</style>
