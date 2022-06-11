import md5 from 'js-md5'
import API from '../../../api'
import { ElNotification, ElLoading } from 'element-plus'
import { useRouter } from 'vue-router'

function Auth() {
  const router = useRouter()
  const openFullScreen2 = () => {
    const loading = ElLoading.service({
      lock: true,
      text: 'Loading',
      background: 'rgba(0, 0, 0, 0.5)'
    })
    setTimeout(() => {
      loading.close()
    }, 2000)
  }
  API.local.API_LOCAL_UID().then(function (res) {
    if ((JSON.parse(JSON.stringify(res))).status === 0) {
      const parms = {
        mail: (JSON.parse(JSON.stringify(res))).uid.user,
        passwd: md5((JSON.parse(JSON.stringify(res))).uid.passwd)
      }
      if (parms.mail.length === 0 || parms.passwd.length === 0) {
        openFullScreen2()
        console.log('length == 0')
        setTimeout(() => {
          router.push({
            path: '/login'
          })
        }, 2000)
        return
      }
      API.login.API_LOGIN(parms).then(function(lres) {
        if (JSON.parse(JSON.stringify(lres)).status !== 0) {
          DefaultLoginOn()
          console.log('status !== 0')
          openFullScreen2()
          setTimeout(() => {
            router.push({
              path: '/login'
            })
          }, 2000)
        } else {
          const parmssetus = {
            user: parms.mail,
            passwd: (JSON.parse(JSON.stringify(res))).uid.passwd,
            token: JSON.parse(JSON.stringify(lres)).data.token
          }
          API.local.API_LOCAL_SETUID(parmssetus).then(function (eres) {
            console.log('wellcome.')
          }).catch(function (err) {
            console.log('user info settings fail:' + err)
          })
          // 将token本地存储到回话中
          localStorage.setItem('Authorization', JSON.parse(JSON.stringify(lres)).data.token)
          // 全局登录状态
          localStorage.setItem('Login', 'true')
        }
      }).catch(function(err) {
        DefaultLoginOn()
        console.log('login err')
        console.log(err)
        ElNotification({
          title: 'Error',
          message: err,
          type: 'error'
        })
        openFullScreen2()
        setTimeout(() => {
          router.push({
            path: '/login'
          })
        }, 2000)
      })
    } else {
      DefaultLoginOn()
      openFullScreen2()
      console.log((JSON.parse(JSON.stringify(res))).msg)
      setTimeout(() => {
        router.push({
          path: '/login'
        })
      }, 2000)
    }
  }).catch(function (err) {
    DefaultLoginOn()
    ElNotification({
      title: 'Error',
      message: err,
      type: 'error'
    })
  })
}
function DefaultLoginOn() {
  // 将token本地存储到回话中
  localStorage.setItem('Authorization', '')
  // 全局登录状态
  localStorage.setItem('Login', 'false')
}

export default {
  Auth,
  DefaultLoginOn
}
