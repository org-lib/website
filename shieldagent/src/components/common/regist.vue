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
      <el-form-item label="验证码" prop="code">
        <el-input v-model="user.code"></el-input>
        <el-row class="mb-4">
          <el-button :disabled="user.allow" @click="emailcode" round>{{ user.timeTxt }}{{ user.timeStep }}</el-button>
        </el-row>
      </el-form-item>
      <el-form-item label="密码" prop="password">
        <el-input type="password" v-model="user.password"></el-input>
      </el-form-item>
      <el-form-item>
        <el-button :disabled="user.allowCli" type="primary" @click="regist">点击注册</el-button>
      </el-form-item>
      <!-- <span style="margin: 20px">{{ msg }}</span> -->
    </el-form>
  </dir>
</template>
<script lang="ts">
import { defineComponent, reactive, toRefs, ref } from 'vue'
import API from '../../api'
import { useRouter } from 'vue-router'
import { ElNotification, ElLoading } from 'element-plus'
import md5 from 'js-md5'

export default defineComponent({
  setup() {
    let etimer = null
    // 用于校验验证码输入后，无需再显示等待验证码时间step
    let ecoder = null
    let onem = 0
    // timeout
    let counter = 0
    const reg = /^(?![\d]+$)(?![a-zA-Z]+$)(?![^\da-zA-Z]+$).{6,18}$/
    const reg2 = /^[\w._]+@(qq|gmail|163|126)\.com(\r\n|\r|\n)?$/
    // 加载效果
    const openFullScreen2 = () => {
      const loading = ElLoading.service({
        lock: true,
        text: 'Loading',
        background: 'rgba(0, 0, 0, 0.7)'
      })
      setTimeout(() => {
        loading.close()
      }, 2000)
    }
    const openFullScreen1 = () => {
      fullscreenLoading.value = true
      setTimeout(() => {
        fullscreenLoading.value = false
      }, 2000)
    }

    const fullscreenLoading = ref(false)
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
          { min: 6, max: 18, message: '至少是6个字符,包含字母(大、小写)、下划线、数字和特殊符号', trigger: 'blur' }
        ],
        code: [
          { required: true, message: '请输入验证码', trigger: 'blur' },
          { min: 6, max: 18, message: '至少是6个字符', trigger: 'blur' }
        ]
      },
      user: {
        email: '',
        code: '',
        password: '',
        timeTxt: '获取验证码',
        timeStep: null,
        allow: false,
        allowCli: false
      }
    })
    function regist() {
      const params = {
        mail: state.user.email,
        code: state.user.code,
        passwd: md5(state.user.password)
      }
      if (params.mail === '') {
        ElNotification({
          title: 'Error',
          message: '请填写邮箱地址',
          type: 'error'
        })
        return
      }
      if (!reg2.test(params.mail)) {
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
      if (!reg.test(state.user.password)) {
        ElNotification({
          title: 'Error',
          message: '密码强度不够,至少是6个字符(包括字母大小写、数字和特殊符号)',
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
      if (params.code === '') {
        ElNotification({
          title: 'Error',
          message: '请填写邮箱验证码',
          type: 'error'
        })
        return
      }
      if (params.code.length < 6) {
        ElNotification({
          title: 'Error',
          message: '验证码不正确',
          type: 'error'
        })
        return
      }
      // 邮箱发送开始
      state.user.allowCli = true
      // 注册接口
      API.login.API_REGIST(params).then(function(res) {
        if (JSON.parse(JSON.stringify(res)).status === 0) {
          ElNotification({
            title: 'Success',
            message: '恭喜你，注册成功',
            type: 'success'
          })
          counter = 0
          // 延迟跳转
          openFullScreen2()
          setTimeout(() => {
            router.push({
              path: '/login'
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
        counter = 0
        console.log(err)
      })
      state.user.allowCli = false
    }
    function emailcode() {
      if (counter > 3) {
        setTimeout(() => {
          counter = 0
        }, 10000)
      }
      const eparams = {
        mail: state.user.email
      }
      if (state.user.email === '') {
        ElNotification({
          title: 'Error',
          message: '请填写邮箱地址',
          type: 'error'
        })
        return
      }
      etimer = setInterval(etime, 1000)
      ecoder = setInterval(codeValidate, 10)
      state.user.allow = true
      // 验证码接口
      API.login.API_EMAILCODE(eparams).then(function(res) {
        if (JSON.parse(JSON.stringify(res)).status === 0) {
          ElNotification({
            title: 'Success',
            message: '验证码已发送，请查收邮件',
            type: 'success'
          })
          counter = counter + 1
        } else {
          ElNotification({
            title: 'Error',
            message: `${JSON.parse(JSON.stringify(res)).msg}`,
            type: 'error'
          })
          reset()
        }
      }).catch(function(err) {
        console.log(err)
        reset()
      })
    }
    function etime() {
      onem = onem + 1
      if (onem === 61) {
        reset()
        clearInterval(ecoder)
        return
      }
      if (state.user.timeStep === '' || state.user.timeStep === null) {
        state.user.timeStep = 61 - onem
      } else {
        state.user.timeStep = 61 - onem
      }
    }
    // 校验验证码输入
    function codeValidate() {
      if (state.user.code.length >= 6) {
        reset()
      }
    }
    // 重置提交窗口事件
    function reset() {
      clearInterval(etimer)
      state.user.timeStep = null
      state.user.timeTxt = '重新获取验证码'
      state.user.allow = false
    }
    function sleep(time) {
      return new Promise(resolve => {
        setTimeout(resolve, time)
      })
    }
    return {
      ...toRefs(state),
      regist,
      emailcode
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
