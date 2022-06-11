<template>
  <el-container>
    <el-aside width="200px">
      <span class="logoforpaytitle">神盾专业版</span>
      <el-container class="detaillist">
        <el-row>
          <!-- <el-coll icon="el-icon-check yes"></el-coll> -->
          <el-icon class="yes"><Select /></el-icon>
          <span>无限流量</span>
        </el-row>
        <el-row>
          <el-icon class="yes"><Select /></el-icon>
          <span>速度更快</span>
        </el-row>
        <el-row>
          <el-icon class="yes"><Select /></el-icon>
          <span>无服务器记录</span>
        </el-row>
        <el-row>
          <el-icon class="yes"><Select /></el-icon>
          <span>支持三个设备</span>
        </el-row>
        <el-row>
          <el-icon class="yes"><Select /></el-icon>
          <span>无广告</span>
        </el-row>
        <el-row>
          <el-icon class="yes"><Select /></el-icon>
          <span>不存在挖矿机</span>
        </el-row>
      </el-container>
    </el-aside>
    <el-divider direction="vertical"></el-divider>
    <el-main>
      <div>
        <el-steps direction="vertical" :active="3" :model="form">
          <el-step title="步骤1  选择套餐"></el-step>
          <div class="spans1">
            <el-row :gutter="6" v-for="item in form.cardlists" :key="item.id">
              <el-col :span="100" :class="'carditem'+item.id">
                <el-card shadow="hover" class="box-card" @click="currentSelect(item.id)">
                  <div class="span">
                    <!-- <div class="el-icon-success" :style="item.color"></div> -->
                    <el-icon class="span-ilogo" :style="item.color"><SuccessFilled /></el-icon>
                    <div class="span-i" style="font-size: 13px;font-weight: bold;margin-top:0px;">{{item.type}}</div>
                    <div class="span-i" style="font-size: 18px;font-weight: bold;">{{item.cash}}</div>
                    <div class="span-i" style="font-size: 11px;font-weight: bold;">{{item.step}}</div>
                    <div class="span-i" style="font-size: 11px;">{{item.alls}}</div>
                  </div>
                </el-card>
              </el-col>
            </el-row>
          </div>
          <el-step title="步骤2  输入邮箱" v-show="allowstep2"></el-step>
          <div class="spans2">
            <el-input v-show="allowemail" :disabled="true" v-model="form.mail" autocomplete="off" @input="inputon" @change="changeon"></el-input>
          </div>
          <div class="el-icon-star-on" style="text-align: left;margin-left: 10px;" v-show="allowcode"><el-icon class="span-ilogo"><StarFilled /></el-icon>输入邀请码(默认可以不填)</div>
          <div class="spans3">
            <el-input v-show="allowcodeinput" v-model="form.code" autocomplete="off" @input="inputcode" @change="changecode"></el-input>
          </div>
          <el-step title="步骤3" v-show="allowstep3"></el-step>
          <div class="spans4">
            <div></div>
          </div>
          <div class="demo-drawer__footer">
            <el-button v-show="allowpay" type="primary" @click="handleCommit">{{ form.loading ? '支付中...' : '支付' }}</el-button>
            <span>
              <el-dialog
                v-model="form.qrcodeurl"
                title="请使用微信扫码"
                width="30%"
                :before-close="handleClose"
              >
                <div class="buy_box">
                  <!-- <qrcode-vue :value="form.value" :size="form.size" level="H" v-if="form.qrcodeurl == true"/> -->
                  <qrcode-vue :value="form.value" :size="form.size" level="H"/>
                  <div class="paystatus">{{form.isPerPay}}</div>
                  <div>注：若二维码过期失效，请重新点击支付按钮！</div>
                </div>
              </el-dialog>
            </span>
          </div>
        </el-steps>
      </div>
    </el-main>
  </el-container>

</template>

<script lang="ts">
import { defineComponent, reactive, toRefs, onMounted } from 'vue'
import { ElMessageBox, ElMessage, ElNotification, ElLoading } from 'element-plus'
// import { ElMessage, ElMessageBox } from 'element-plus'
import { SuccessFilled, Select, StarFilled } from '@element-plus/icons'
import API from '../api'
// import qs from 'qs'
// import QRCode from 'qrcodejs2';
import QrcodeVue from 'qrcode.vue'
import { useRouter } from 'vue-router'
import mail from '../components/common/functionjs/mail'
export default defineComponent({
  name: 'PayHome',
  props: {},
  components: {
    SuccessFilled,
    Select,
    StarFilled,
    QrcodeVue
  },
  setup () {
    // onMounted(() => {
    //   Auth.Auth()
    // })
    let timer = null
    let timerDelay = null
    let Ok = true
    const router = useRouter()
    const paramsPay = reactive({
      mail: localStorage.getItem('Mail'),
      uid: localStorage.getItem('UID'),
      total: 20,
      currency: 'CNY',
      description: '波波支付'
    })
    // const reg = /^[\w._]+@(qq|gmail|163|126)\.com(\r\n|\r|\n)?$/
    // const reg = /^\w{3,}(\.\w+)*@[A-z0-9]+(\.[A-z]{2,5}){1,2}$/
    const infoUser = reactive({
      allowemail: false,
      allowcode: false,
      allowstep1: false,
      allowstep2: false,
      allowstep3: false,
      allowcodeinput: false,
      allowpay: false
    })
    function inputon() {
      if (!mail.Mail.test(state.form.mail)) {
        defaultstep2()
        return
      }
      if (state.form.mail.length > 0) {
        defaultstep3()
        // defaultstepx()
      } else {
        defaultstep2()
      }
    }
    function changeon() {
      if (!mail.Mail.test(state.form.mail)) {
        ElNotification({
          title: 'Error',
          message: `${state.form.mail} 邮箱号码不正确，请重新填写~`,
          type: 'error'
        })
        defaultstep2()
      } else {
        defaultstep3()
      }
    }
    function inputcode() {
      console.log(state.form.code)
    }
    function changecode() {
      console.log(state.form.code)
    }
    // const mrole = reactive({
    //   roles: {
    //     email: [
    //       { required: true, message: '请输入用户名', trigger: 'blur' },
    //       { min: 10, max: 30, message: '长度在 10 到 30 个字符', trigger: 'blur' }
    //     ]
    //   }
    // })
    const state = reactive({
      form: {
        value: '',
        size: 100,
        loading: false,
        qrcodeurl: false,
        color: '',
        codeImg: '',
        mail: localStorage.getItem('Mail'),
        code: '',
        type: '',
        isPerPay: '',
        isPay: false,
        orderno: '',
        cardlists: [
          {
            id: '1',
            type: '按量付费',
            cash: '现只需￥60+',
            pay: 61,
            step: '10GB',
            alls: '有效期一个月(流量到期归零)',
            color: ''
          },
          {
            id: '2',
            type: '按量付费',
            cash: '现只需￥200+',
            pay: 212,
            step: '30GB',
            alls: '有效期3个月(流量到期归零)',
            color: ''
          },
          {
            id: '3',
            type: '按量付费',
            cash: '现只需￥340+',
            pay: 349,
            step: '60GB',
            alls: '有效期6个月(流量到期归零)',
            color: ''
          },
          {
            id: '4',
            type: '按量付费',
            cash: '现只需￥630+',
            pay: 637,
            step: '120GB',
            alls: '有效期12个月(流量到期归零)',
            color: ''
          }
        ],
        desc: '',
        childParams: {}
      }
    })
    function currentSelect (params) {
      // 此时需要判断token 是否在授权时间内，没有则重新登录授权，如果登录失败。怎跳转到登录/注册页
      state.form.cardlists[params - 1].color = 'color: #67C23A;'
      state.form.type = params
      paramsPay.total = state.form.cardlists[params - 1].pay
      if (localStorage.getItem('ConnectedNet') === 'true') {
        ElMessage({
          showClose: true,
          message: '请先 断开连接，可能影响支付操作！',
          type: 'error'
        })
      }
      for (let index = 0; index < state.form.cardlists.length; index++) {
        if (index !== (params - 1)) {
          state.form.cardlists[index].color = ''
          // console.log(state.form.cardlists[index].color)
          // console.log(state.form.cardlists[params - 1].color)
        }
      }
      if (state.form.mail.length === 0 || localStorage.getItem('Mail') === '' || localStorage.getItem('UID') === '') {
        openFullScreen1()
        setTimeout(() => {
          router.push({
            path: '/login'
          })
          ElMessage({
            showClose: true,
            message: '请先登录',
            type: 'error'
          })
        }, 1000)
      }
      defaultstep2()
      if (state.form.mail.length > 0) {
        changeon()
      }
    }
    // 邮箱地址
    function defaultstep2() {
      infoUser.allowemail = true
      infoUser.allowstep2 = true
      infoUser.allowcode = false
      infoUser.allowstep3 = false
      infoUser.allowcodeinput = false
      infoUser.allowpay = false
    }
    // 邀请码
    function defaultstep3() {
      infoUser.allowemail = true
      infoUser.allowstep2 = true
      infoUser.allowcode = true
      infoUser.allowstep3 = true
      infoUser.allowcodeinput = true
      infoUser.allowpay = true
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

    // 支付按钮
    // function defaultstepx() {
    //   infoUser.allowemail = true
    //   infoUser.allowstep2 = true
    //   infoUser.allowcode = true
    //   infoUser.allowstep3 = true
    //   infoUser.allowcodeinput = true
    //   infoUser.allowpay = true
    // }
    function handleCommit () {
      if (!mail.Mail.test(state.form.mail)) {
        setTimeout(() => {
          ElMessage(`${state.form.mail} 您还处于未登录状态，无法进行支付操作`)
        }, 2000)
        setTimeout(() => {
          router.push({
            path: '/login'
          })
          ElMessage({
            showClose: true,
            message: '登录已过期',
            type: 'error'
          })
        }, 1000)
        return
      }
      if (state.form.type === '') {
        ElMessage('请先任意选择一个[周 、 月 或 年]的套餐~')
        return
      }
      if (localStorage.getItem('UID') === '' || localStorage.getItem('UID') === null || localStorage.getItem('UID') === undefined) {
        API.local.API_LOCAL_UID().then(function (res) {
          if ((JSON.parse(JSON.stringify(res))).status === 0) {
            localStorage.setItem('UID', (JSON.parse(JSON.stringify(res))).uid.uid)
          } else {
            localStorage.setItem('UID', '')
            setTimeout(() => {
              ElMessage({
                showClose: true,
                message: '本地读写权限错误，无法获取本地配置参数uid的值，支付无法进行',
                type: 'error'
              })
            }, 3000)
          }
        })
      }
      if (localStorage.getItem('UID') === '' || localStorage.getItem('UID') === null || localStorage.getItem('UID') === undefined) {
        localStorage.setItem('UID', '')
        setTimeout(() => {
          ElMessage({
            showClose: true,
            message: '本地读写权限错误，无法获取本地配置参数uid的值，支付无法进行',
            type: 'error'
          })
        }, 3000)
        return
      }
      if (!timerDelay && Ok) {
        // 点击一次时隔x秒后才能再次点击
        timerDelay = setTimeout(() => {
          timerDelay = null
        }, 4000)
        Ok = false
        if (localStorage.getItem('Authorization') === '') {
          setTimeout(() => {
            router.push({
              path: '/login'
            })
            ElMessage({
              showClose: true,
              message: '登录已过期',
              type: 'error'
            })
            Ok = true
          }, 3000)
          return
        }
        openFullScreen1()
        API.shield.API_GOPAY(paramsPay).then(function(res) {
          if ((JSON.parse(JSON.stringify(res))).status === -1) {
            Ok = false
            setTimeout(() => {
              router.push({
                path: '/login'
              })
              ElMessage({
                showClose: true,
                message: (JSON.parse(JSON.stringify(res))).msg,
                type: 'error'
              })
            }, 3000)
            return
          }
          if ((JSON.parse(JSON.stringify(res))).urlCode === '') {
            setTimeout(() => {
              ElMessage({
                showClose: true,
                message: (JSON.parse(JSON.stringify(res))).error,
                type: 'error'
              })
            }, 3000)
            return
          }
          state.form.value = (JSON.parse(JSON.stringify(res))).urlCode
          state.form.size = 150
          state.form.qrcodeurl = true
          state.form.orderno = (JSON.parse(JSON.stringify(res))).orderNo
          state.form.isPerPay = '.下单成功，请扫码支付.'
          state.form.loading = true
          infoUser.allowpay = true
          // 定时查询支付状态
          timer = setInterval(crontab, 3000)
        }).catch(function(err) {
          state.form.loading = false
          Ok = true
          setTimeout(() => {
            ElMessage({
              showClose: true,
              message: 'Oops, 不发起支付操作' + err,
              type: 'error'
            })
          }, 3000)
        })
      } else {
        setTimeout(() => {
          ElMessage({
            showClose: true,
            message: 'Oops, 连续点击支付了哦，悠着点儿。。\n',
            type: 'error'
          })
        }, 3000)
      }
    }
    const handleClose = (done: () => void) => {
      ElMessageBox.confirm('支付完成?')
        .then(() => {
          done()
          buyClose()
        })
        .catch(() => {
          // catch error
        })
    }
    function buyClose() {
      setTimeout(() => {
        ElMessage({
          showClose: true,
          message: '您关闭了支付窗口',
          type: 'error'
        })
      }, 10000)
      if (timer !== null) {
        setTimeout(() => {
          ElMessage({
            showClose: true,
            message: '您还未支付完成',
            type: 'error'
          })
        }, 3000)
      }
      infoUser.allowpay = true
      state.form.isPerPay = ''
      state.form.value = ''
      clearInterval(timer)
      state.form.qrcodeurl = false
      state.form.loading = false
      Ok = true
    }
    function crontab() {
      const params = {
        order_no: state.form.orderno
      }
      API.shield.API_GOPAYORDERNO(params).then(function(res) {
        if ((JSON.parse(JSON.stringify(res))).status === -1) {
          state.form.isPerPay = '无法获取订单状态'
          ElMessage({
            showClose: true,
            message: 'Oops, 获取支付状态异常，请联系管理员shangguanbucai@gmail.com .',
            type: 'error'
          })
          return
        }
        if ((JSON.parse(JSON.stringify(res))).status === 0) {
          state.form.isPerPay = '请用微信扫码付款'
          return
        }
        if ((JSON.parse(JSON.stringify(res))).status === 1) {
          state.form.isPerPay = '支付成功...正在关闭页面'
          clearInterval(timer)
          timer = null
          buyClose()
          ElMessage({
            showClose: true,
            message: '购买成功，恭喜你.'
          })
          setTimeout(() => {
            // 支付收尾工作
            state.form.isPerPay = '支付成功...正在关闭页面'
            state.form.qrcodeurl = false
            state.form.loading = false
            Ok = true
            router.push({
              path: '/'
            })
          }, 400)
        }
      }).catch(function (err) {
        ElMessage({
          showClose: true,
          message: 'Oops, 获取支付状态发生错误，请联系管理员shangguanbucai@gmail.com .' + err,
          type: 'error'
        })
        state.form.loading = false
      })
    }
    return {
      ...toRefs(state), currentSelect, handleCommit, buyClose, inputon, changeon, ...toRefs(infoUser), inputcode, changecode, handleClose
    }
  }
})
</script>
<style scoped>

.el-aside {
  /* background-color: #e1e6ee; */
  /* background-color: #d7e2f3; */
  color: var(--el-text-color-primary);
  text-align: center;
  line-height: 30px;
  /* margin-right: 5px; */
  padding-top: 10em;
  padding-left: 2em;
}

.el-main {
  /* background-color: #d7e2f3; */
  color: var(--el-text-color-primary);
  text-align: center;
  line-height: 25px;
  height: calc(100vh - 20vh);
  padding-top: 1em;
  /* border-top: 2px solid #d7e2f3;
  border-bottom: 2px solid #d7e2f3; */
}

/* body > .el-container {
  margin-bottom: 40px;
} */

.el-container:nth-child(5) .el-aside,
.el-container:nth-child(6) .el-aside {
  line-height: 260px;
}

.el-container:nth-child(7) .el-aside {
  line-height: 320px;
}
.logoforpaytitle {
  text-align: left;
  font-size: 25px;
  font-weight: bold;
  padding-right: 1em;
  background-color: white;
}
.detaillist {
  display: block
}
.span-ilogo{
  padding-top: 7px; margin-right: 10px; font-weight: bold;
}
.yes{
  padding-top: 7px; margin-right: 10px; font-weight: bold;color: #67C23A;
}
.el-divider{
  margin-top: 5em;
  height: calc(100vh - 30vh);
  background-color: #9fa4aa;
  font-weight: bold;
}
.el-steps{
  line-height: 30px;
}
/* .spanleft{
  text-align: left;
  display: inline-flex;
} */
.spans1{
    padding-right: 20px;
    display: flex;
    margin-bottom: 20px;
}
.span .el-card{
  padding: 1px;
  z-index: 2;
  position: relative;
  clear: both;
  overflow-y: hidden;
  font-family: "Roboto", sans-serif;
  text-align: center;
/* box-sizing: inherit; */
  display: block;
  color: rgba(0, 0, 0, 0.87);
  /* background-color: #d7e2f3;; */
  height: 5px;
  width: 200px;
  margin: 0px;
  text-align: center;
  border: 2px solid rgba(161, 148, 155, 0.664);
  border-radius: 5px;
}
/* .el-card { */
  /* background-color: #d7e2f3; */
/* } */
.spans2{
  padding: 5px;
  text-align: left;
}
.spans3{
  padding: 5px;
  text-align: left;
}
.spans4{
  padding-top: 10px;
  text-align: left;
}
.span-i{
  margin: 0px;
  padding: 1px;
  margin-bottom: 0px;
  margin-top: 2px;
}
.demo-drawer__footer{
  text-align: left;
}
.el-input{
  width: 300px;
}
.el-card{
  margin-right: 20px;
}
.el-card:hover{
  box-shadow: 5px 5px 10px #4170b8 !important;
}
.buy_box {
  text-align: center;
}
.paystatus{
  color: #08f793;
}
</style>
