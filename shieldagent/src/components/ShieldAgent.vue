<template>
  <!-- S.H.I.E.L.D -墙-->
  <div class="ShieldAgent">
    <!-- <img alt="Shield logo" src="https://product-1256865522.cos.ap-shanghai.myqcloud.com/websit%2Fshield%2F128.png"> -->
    <el-button class="switchx" circle @click="control"><img alt="Shield logo" :src="imgPath"></el-button>
    <h1 class="ShieldTime">{{ conTime }}</h1>
    <div class="products">
      <h1>购买神盾专业版</h1>
      <p class="payitem">
        <!-- <a href="https://www.shendunju.com/" target="_blank" rel="noopener norefferrer">升级到神盾专业版</a> -->
        <!-- <router-link tag="a" target="_blank" :to="{name:'List',query:{id: 'val'}}">详情页</router-link> -->
        <router-link class="routelink" to="/upgrade">续费(或升级)神盾专业版</router-link>
      </p>
      <p>
        <router-link class="routelogin" to="/notfound">网上打折购买了专业版激活码？点此升级</router-link>
      </p>
      <div class="tips"><span>新功能即将上线，敬请期待！</span></div>
    </div>
  </div>
  <router-view/>
</template>

<script lang="ts">
import { defineComponent, onMounted, reactive, toRefs } from 'vue'
import { ElMessage, ElLoading } from 'element-plus'
// import formatDate from './common/functionjs/FormatDate'
import API from '../api'
import { useRouter } from 'vue-router'

export default defineComponent({
  name: 'ShieldAgent',
  props: {
    msg: String
  },
  setup () {
    onMounted(() => {
      setTimeout(() => {
        openFullScreen2()
        switchoffon()
      }, 1000)
    })
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

    const state = reactive({
      imgPath: 'https://product-1256865522.cos.ap-shanghai.myqcloud.com/websit/shield4/start.png',
      conTime: null,
      close: false
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
    setInterval(switchoffon, 1500)
    function switchoffon() {
      API.local.API_LOCAL_CONNECTION().then(function (res) {
        // console.log('switchoffon 获取状态返回值：')
        // console.log('switchoffon 状态值message：' + JSON.parse(JSON.stringify(res)).message)
        // console.log('switchoffon 状态值open：' + JSON.parse(JSON.stringify(res)).open)
        // console.log('switchoffon 状态值status：' + JSON.parse(JSON.stringify(res)).status)
        if ((JSON.parse(JSON.stringify(res))).status === 0) {
          if ((JSON.parse(JSON.stringify(res))).open === 1) {
            localStorage.setItem('ConnectedNet', 'true')
            state.close = false
            state.conTime = '点击断开'
            state.imgPath = 'https://product-1256865522.cos.ap-shanghai.myqcloud.com/websit/shield4/end-red.png'
          } else {
            localStorage.setItem('ConnectedNet', 'false')
            state.close = true
            state.conTime = '点击连接'
            state.imgPath = 'https://product-1256865522.cos.ap-shanghai.myqcloud.com/websit/shield4/start.png'
          }
        }
        // console.log('switchoffon 获取状态返回值结束')
      }).catch(function (err) {
        ElMessage({
          showClose: true,
          message: '系统异常' + err,
          type: 'error'
        })
        localStorage.setItem('ConnectedNet', 'false')
        console.log(err)
      })
    }
    const router = useRouter()
    function control() {
      const param = {
        open: state.close
      }
      if (localStorage.getItem('Mail') === '' || localStorage.getItem('Mail') === null) {
        // 延迟跳转
        openFullScreen2()
        setTimeout(() => {
          router.push({
            path: '/login'
          })
        }, 2000)
        return
      }
      if (localStorage.getItem('Connected') === 'false' || localStorage.getItem('Connected') === null) {
        ElMessage({
          showClose: true,
          message: '需要购买够套餐，后才能使用。如果您已支付成功，请注销登录、并重新登录',
          type: 'error'
        })
        return
      }
      // console.log('control 获取状态返回值：')
      openFullScreen2()
      setTimeout(() => {
        API.local.API_LOCAL_OPEN(param).then(function (res) {
          // console.log((JSON.parse(JSON.stringify(res))).open)
          // console.log('control 状态值message：' + JSON.parse(JSON.stringify(res)).message)
          // console.log('control 状态值open：' + JSON.parse(JSON.stringify(res)).open)
          // console.log('control 状态值status：' + JSON.parse(JSON.stringify(res)).status)
          if ((JSON.parse(JSON.stringify(res))).status === 0) {
            if ((JSON.parse(JSON.stringify(res))).open === 1) {
              localStorage.setItem('ConnectedNet', 'true')
              state.close = false
              state.imgPath = 'https://product-1256865522.cos.ap-shanghai.myqcloud.com/websit/shield4/end-red.png'
              state.conTime = '点击断开网络'
            } else {
              localStorage.setItem('ConnectedNet', 'false')
              state.close = true
              state.imgPath = 'https://product-1256865522.cos.ap-shanghai.myqcloud.com/websit/shield4/start.png'
              state.conTime = '点击连接网络'
            }
          }
          // console.log('control 获取状态返回值结束')
        }).catch(function (err) {
          ElMessage({
            showClose: true,
            message: '系统异常' + err,
            type: 'error'
          })
          // console.log(err)
        })
      }, 3000)
      // console.log('switch....')
    }
    return {
      ...toRefs(state),
      handleCommand,
      switchoffon,
      control
    }
  }
})
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>
a {
}
/* .comment {
  border: 2px dashed rgb(105, 101, 103);
  border-radius: 5px;
} */
.ShieldAgent{
  line-height: 70px;
  text-align: center;
  /* padding-right 为了支付按钮和图标显示居中一些 */
  padding-right: 5%;
}
.switchx{
  margin-top: 50px;
}
.ShieldTime{
  font-size: 14px;
  margin-top: -23px;
}
img{
  margin: 10px;
}
.products{
  margin-top: 60px;
  border-top: 2px solid #d7e2f3;
  border-bottom: 2px solid #d7e2f3;
  border-radius: 5px;
}
.tips{
  color: white;
  border-radius: 10px;
  align-items: center;
  width: 20%;
  padding: 0px;
  background: #212121 !important;
  margin: auto;
  line-height: 40px;
}
.routelink{
  margin-top: 0px;
  color: white;
  background-color: rgb(230, 13, 93);
  padding: 12px;
  border: 2px solid rgb(230, 13, 93);
  border-radius: 5px;
}
.routelogin{
    margin-top: 0px;
    padding-top: 0px;
}
h1{
  margin-bottom: 0px;
  padding-bottom: 10px;
  line-height: 10px;
}
</style>
