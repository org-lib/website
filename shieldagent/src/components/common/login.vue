<template>
  <!-- 登录 -->
  <dir class="centerlogin">
    <div style="margin: 20px" />
    <el-form
      :label-position="center"
      label-width="100px"
      :model="user"
      style="max-width: 460px"
      :rules="rules"
    >
      <el-form-item label="邮箱" prop="email">
        <el-input v-model="user.email"></el-input>
      </el-form-item>
      <el-form-item label="密码" prop="password">
        <el-input type="password" v-model="user.password"></el-input>
      </el-form-item>
      <el-form-item>
        <el-button v-loading.fullscreen.lock="fullscreenLoading" :disabled="user.allowCli" type="primary" @click="login">登录</el-button>
        <el-button v-loading.fullscreen.lock="fullscreenLoading" :disabled="user.allowCli" type="primary" @click="gotoregist">先注册</el-button>
      </el-form-item>
      <!-- <span style="margin: 20px">{{ msg }}</span> -->
    </el-form>
  </dir>
</template>
<script lang="ts">
import { defineComponent, reactive, toRefs, ref } from 'vue'
import API from '../../api'
import { useRouter } from 'vue-router'
import { ElNotification, ElLoading, ElMessage } from 'element-plus'
import md5 from 'js-md5'
import mail from './functionjs/mail'
export default defineComponent({
  setup() {
    // 加载效果
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

    const fullscreenLoading = ref(false)
    const reg = /^(?![\d]+$)(?![a-zA-Z]+$)(?![^\da-zA-Z]+$).{6,18}$/
    // const reg2 = /^[\w._]+@(qq|gmail|163|126|xysl|sina|shouhu)\.(com|cn)(\r\n|\r|\n)?$/
    // const reg2 = /^\w{3,}(\.\w+)*@[A-z0-9]+(\.[A-z]{2,5}){1,2}$/
    // 初始化路由
    const router = useRouter()
    const state = reactive({
      rules: {
        email: [
          { required: true, message: '请输入用户名', trigger: 'blur' },
          { min: 10, max: 30, message: '长度在 10 到 30 个字符', trigger: 'blur' }
        ],
        password: [
          { required: true, message: '请输入密码', trigger: 'blur' },
          { min: 6, max: 18, message: '至少是6个字符,包含字母(大、小写、数字和特殊符号)', trigger: 'blur' }
        ]
      },
      user: {
        email: '',
        code: '',
        password: '',
        timeStep: null,
        allow: false,
        allowCli: false
      }
    })
    function login() {
      var ipaddr = ''
      var upuid = ''
      const lparams = {
        mail: state.user.email,
        passwd: md5(state.user.password)
      }
      if (localStorage.getItem('Login') === 'true' && localStorage.getItem('Mail') !== '') {
        ElNotification({
          title: 'Error',
          message: '按F5刷新页面',
          type: 'error'
        })
        setTimeout(() => {
          router.push({
            path: '/'
          })
        }, 2000)
        return
      }
      if (lparams.mail === '') {
        ElNotification({
          title: 'Error',
          message: '请填写邮箱地址',
          type: 'error'
        })
        return
      }
      if (!mail.Mail.test(lparams.mail)) {
        ElNotification({
          title: 'Error',
          message: '邮箱地址不正确',
          type: 'error'
        })
        return
      }
      if (state.user.password === '') {
        ElNotification({
          title: 'Error',
          message: '请填写密码',
          type: 'error'
        })
        return
      }
      if (state.user.password.length < 6) {
        ElNotification({
          title: 'Error',
          message: '密码长度不够',
          type: 'error'
        })
        return
      }
      if (!reg.test(state.user.password)) {
        ElNotification({
          title: 'Error',
          message: '密码强度不够,至少是6个字符(包括字母大小写、数字和特殊符号)',
          type: 'error'
        })
        return
      }
      if (localStorage.getItem('UID') === '' || localStorage.getItem('UID') === null || localStorage.getItem('UID') === undefined) {
        API.local.API_LOCAL_UID().then(function (res) {
          if ((JSON.parse(JSON.stringify(res))).status === 0) {
            localStorage.setItem('UID', (JSON.parse(JSON.stringify(res))).uid.uid)
            ipaddr = (JSON.parse(JSON.stringify(res))).uid.ip
          } else {
            const parmssetus = {
              user: lparams.mail,
              passwd: state.user.password,
              token: localStorage.getItem('Authorization'),
              uid: localStorage.getItem('UID'),
              ip: (JSON.parse(JSON.stringify(res))).uid.ip
            }
            API.local.API_LOCAL_SETUID(parmssetus).then(function (res) {
              console.log('wellcome.')
            }).catch(function (err) {
              console.log('user info settings fail:' + err)
            })
          }
        })
      }
      const lparamsip = {
        mail: state.user.email,
        passwd: md5(state.user.password),
        ip: ipaddr,
        uid: localStorage.getItem('UID')
      }
      // 邮箱发送开始
      state.user.allowCli = true
      // 登录接口
      API.login.API_LOGIN(lparamsip).then(function(res) {
        if (JSON.parse(JSON.stringify(res)).status === 0) {
          // 将token本地存储到回话中
          localStorage.setItem('Authorization', JSON.parse(JSON.stringify(res)).data.token)
          // 全局登录状态
          localStorage.setItem('Login', 'true')
          localStorage.setItem('Mail', lparamsip.mail)
          localStorage.setItem('Expire', 'false')
          ElNotification({
            title: 'Success',
            message: '恭喜你，登录成功',
            type: 'success'
          })
          const parmssetus = {
            user: lparams.mail,
            passwd: state.user.password,
            token: JSON.parse(JSON.stringify(res)).data.token
          }
          API.local.API_LOCAL_SETUID(parmssetus).then(function (res) {
            console.log('wellcome.')
          }).catch(function (err) {
            console.log('user info settings fail:' + err)
          })
          if (localStorage.getItem('UID') === '' || localStorage.getItem('UID') === null || localStorage.getItem('UID') === undefined) {
            API.local.API_LOCAL_UID().then(function (res) {
              if ((JSON.parse(JSON.stringify(res))).status === 0) {
                localStorage.setItem('UID', (JSON.parse(JSON.stringify(res))).uid.uid)
              }
            })
          }
          // 延迟跳转
          openFullScreen2()
          setTimeout(() => {
            router.push({
              path: '/'
            })
          }, 2000)
        } else {
          ElNotification({
            title: 'Error',
            message: `${JSON.parse(JSON.stringify(res)).msg}`,
            type: 'error'
          })
        }
      }).catch(function(err) {
        console.log(err)
      })
      state.user.allowCli = false
    }
    function gotoregist() {
      // 延迟跳转
      openFullScreen1()
      setTimeout(() => {
        router.push({
          path: '/regist'
        })
      }, 2000)
    }
    return {
      ...toRefs(state),
      login,
      gotoregist
    }
  }
})
</script>
<style scoped>
.centerlogin{
  border-radius: 8px;
  box-shadow: 5px 5px 10px #cbccce !important;
  padding-left: 10px;
  padding-right: 15px;
  padding-top: 50px;
  padding-bottom: 20px;
  width: 500px;
  /* width: 500px;
  height: 240px; */
  /* text-align: center; */
  /* background-color: rgb(49, 138, 209); */
  position: absolute;
  top: 50%;
  left: 50%;
  transform: translate(-50%, -50%);
}
.el-row{
  padding-top: 5px;
}
</style>
