<template>
    <el-dropdown style="margin-right: 15px" @command="FooterCommand">
        <span class="el-dropdown-link">
            <!-- 账 号<i class="el-icon-arrow-down el-icon--right"></i> -->
            账 号<el-icon><ArrowDown /></el-icon>
        </span>
        <template #dropdown>
            <el-dropdown-menu>
            <el-dropdown-item :disabled="disab" command="upgradelogin"><el-icon><Orange /></el-icon>{{ logintile }}</el-dropdown-item>
            <el-dropdown-item :disabled="true" command="uploadfile"><el-icon><UploadFilled /></el-icon>我的文件</el-dropdown-item>
            <el-dropdown-item :disabled="true" command="showperson"><el-icon><StarFilled /></el-icon>邀请好友</el-dropdown-item>
            <el-dropdown-item :disabled="true" command="getapp"><el-icon><Iphone /></el-icon>Sheild Android</el-dropdown-item>
            <el-dropdown-item :disabled="disab2" command="logout2"><el-icon><Orange /></el-icon>注 销</el-dropdown-item>
            <!-- <el-dropdown-item command="settings"><el-icon><Tools /></el-icon>设置</el-dropdown-item> -->
            </el-dropdown-menu>
        </template>
    </el-dropdown>
    <span>{{msg}}</span>

</template>

<script lang="ts">
import { defineComponent, reactive, toRefs, onMounted, inject, onActivated } from 'vue'
import { ElMessage, ElLoading } from 'element-plus'
import { ArrowDown, UploadFilled, Iphone, Orange, StarFilled } from '@element-plus/icons'
import { useRouter } from 'vue-router'
// import API from '../../api'
import API from '../../api'
import loginstate from '../common/functionjs/login'
import md5 from 'js-md5'

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
    // const reflush = inject('reload')
    onMounted(() => {
      if (localStorage.getItem('Cancel') === 'true') {
        logout()
        return
      }
      if (localStorage.getItem('Connected') === 'true') {
        logon()
        return
      }
      const openFullScreen2 = () => {
        const loading = ElLoading.service({
          lock: true,
          text: 'Loading',
          background: 'rgba(0, 0, 0, 0.9)'
        })
        setTimeout(() => {
          loading.close()
        }, 2000)
      }
      API.local.API_LOCAL_UID().then(function (res) {
        if ((JSON.parse(JSON.stringify(res))).status === 0) {
          const parms = {
            mail: (JSON.parse(JSON.stringify(res))).uid.user,
            uid: (JSON.parse(JSON.stringify(res))).uid.uid,
            ip: (JSON.parse(JSON.stringify(res))).uid.ip,
            passwd: md5((JSON.parse(JSON.stringify(res))).uid.passwd)
          }
          localStorage.setItem('UID', (JSON.parse(JSON.stringify(res))).uid.uid)
          console.log('UID')
          if (parms.mail.length === 0 || parms.passwd.length === 0) {
            openFullScreen2()
            loginstate.DefaultLoginOff()
            logout()
            console.log('loginstate length == 0')
            return
          }
          API.login.API_LOGIN(parms).then(function(lres) {
            if (JSON.parse(JSON.stringify(lres)).status !== 0) {
              loginstate.DefaultLoginOff()
              logout()
              console.log('loginstate status !== 0')
              openFullScreen2()
            } else {
              const parmssetus = {
                user: parms.mail,
                passwd: (JSON.parse(JSON.stringify(res))).uid.passwd,
                token: JSON.parse(JSON.stringify(lres)).data.token
              }
              API.local.API_LOCAL_SETUID(parmssetus).then(function (eres) {
                console.log('wellcome.' + parmssetus.user + 'login success')
              }).catch(function (err) {
                console.log('user login settings fail:' + err)
              })
              // 将token本地存储到回话中
              localStorage.setItem('Authorization', JSON.parse(JSON.stringify(lres)).data.token)
              // 全局登录状态
              localStorage.setItem('Connected', 'true')
              localStorage.setItem('Mail', parms.mail)
              logon()
              // router.back()
            }
          }).catch(function(err) {
            loginstate.DefaultLoginOff()
            logout()
            console.log('login err')
            console.log(err)
          })
        } else {
          loginstate.DefaultLoginOff()
          logout()
          openFullScreen2()
          setTimeout(() => {
            router.push({
              path: '/login'
            })
          }, 2000)
          console.log((JSON.parse(JSON.stringify(res))).msg)
        }
      }).catch(function (err) {
        loginstate.DefaultLoginOff()
        logout()
        console.log(err)
      })
    })
    const router = useRouter()
    const users = reactive({
      logintile: '登录(升级到专业版本)',
      allow: '授权设备使用专业版',
      disab: false,
      disab2: true
    })
    if (localStorage.getItem('Connected') === 'true') {
      logon()
    }
    const openFullScreen1 = () => {
      const loading = ElLoading.service({
        lock: true,
        text: 'Loading',
        background: 'rgba(232, 248, 248, 0.9)'
      })
      setTimeout(() => {
        loading.close()
      }, 2000)
    }
    function logout() {
      users.logintile = '登录(升级到专业版本)'
      users.allow = '授权设备使用专业版'
      users.disab = false
      users.disab2 = true
      localStorage.setItem('Authorization', '')
      localStorage.setItem('Connected', 'false')
      localStorage.setItem('Mail', '')
      localStorage.setItem('Cancel', 'true')
    }
    function logon() {
      users.logintile = localStorage.getItem('Mail')
      users.allow = '授权设备使用专业版'
      users.disab = true
      users.disab2 = false
    }
    const FooterCommand = (command: any) => {
      console.log('选择了，，，，，')
      if (!command) {
        ElMessage(`${command} 菜单选项缺少command属性`)
        return
      }
      switch (command) {
        case 'upgradelogin':
          openFullScreen1()
          setTimeout(() => {
            router.push({
              path: '/login'
            })
          }, 2000)
          break
        case 'uploadfile':
          ElMessage(`${command} 还未上线🤦‍♂️(。・＿・。)ﾉI’m sorry~`)
          break
        case 'showperson':
          ElMessage('邀请好友 还未上线🤦‍♂️(。・＿・。)ﾉI’m sorry~')
          break
        case 'getapp':
          ElMessage('Sheild Android 还未上线 🤦‍♂️(。・＿・。)ﾉI’m sorry~')
          break
        case 'grants':
          ElMessage('授权设备使用专业版 还未上线 🤦‍♂️(。・＿・。)ﾉI’m sorry~')
          break
        case 'logout2':
          // 将token本地存储到回话中
          localStorage.setItem('Authorization', '')
          // 全局登录状态
          localStorage.setItem('Connected', 'false')
          localStorage.setItem('Mail', '')
          localStorage.setItem('UID', '')
          logout()
          ElMessage('注销成功')
          break
      }
    }
    return {
      FooterCommand,
      ...toRefs(users)
    }
  }
})
</script>
<style scoped>
.el-icon{
  padding-top: 10px;
}
</style>
