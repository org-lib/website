// import md5 from 'js-md5'
// import API from '../../../api'
// import { ElLoading } from 'element-plus'
// import { useRouter } from 'vue-router'

function DefaultLoginOff() {
  // 将token本地存储到回话中
  localStorage.setItem('Authorization', '')
  // 全局登录状态
  localStorage.setItem('Login', 'false')
  localStorage.setItem('Mail', '')
  localStorage.setItem('uid', '')
}

export default {
  DefaultLoginOff
}
