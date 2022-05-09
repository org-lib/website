<template>
  <el-container>
    <el-aside width="200px">
      <span class="logoforpaytitle">神盾专业版</span>
      <el-contain class="detaillist">
        <el-row>
          <!-- <el-coll icon="el-icon-check yes"></el-coll> -->
          <el-icon class="yes"><Select /></el-icon>
          <el-coll>无限流量</el-coll>
        </el-row>
        <el-row>
          <el-icon class="yes"><Select /></el-icon>
          <el-coll>速度更快</el-coll>
        </el-row>
        <el-row>
          <el-icon class="yes"><Select /></el-icon>
          <el-coll>无服务器记录</el-coll>
        </el-row>
        <el-row>
          <el-icon class="yes"><Select /></el-icon>
          <el-coll>支持三个设备</el-coll>
        </el-row>
        <el-row>
          <el-icon class="yes"><Select /></el-icon>
          <el-coll>无广告</el-coll>
        </el-row>
        <el-row>
          <el-icon class="yes"><Select /></el-icon>
          <el-coll>不存在挖矿机</el-coll>
        </el-row>
      </el-contain>
    </el-aside>
    <el-divider direction="vertical"></el-divider>
    <el-main>
      <div>
        <el-steps direction="vertical" :active="2" :model="form">
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
          <el-step title="步骤2  输入邮箱"></el-step>
          <div class="spans2">
            <el-input v-model="form.mail" autocomplete="off"></el-input>
          </div>
          <div class="el-icon-star-on" style="text-align: left;margin-left: 10px;"><el-icon class="span-ilogo"><StarFilled /></el-icon>输入邀请码</div>
          <div class="spans3">
            <el-input v-model="form.code" autocomplete="off"></el-input>
          </div>
          <el-step title="步骤3"></el-step>
          <div class="spans4">
            <div></div>
          </div>
          <div class="demo-drawer__footer">
            <el-button
              type="primary"
              :loading="loading"
              @click="handleCommit"
              >{{ loading ? 'Submitting ...' : '继续支付' }}</el-button
            >
            <span> 支付中</span>
          </div>
        </el-steps>
      </div>
    </el-main>
  </el-container>

</template>

<script lang="ts">
import { defineComponent, reactive, toRefs } from 'vue'
import { ElAlert, ElMessage, ElMessageBox } from 'element-plus'
import { SuccessFilled, Select, StarFilled } from '@element-plus/icons'

export default defineComponent({
  name: 'PayHome',
  props: {
    msg: String
  },
  components: {
    SuccessFilled,
    Select,
    StarFilled
  },
  setup () {
    const state = reactive({
      loading: false,
      color: '',
      form: {
        mail: '',
        code: '',
        type: '',
        cardlists: [
          {
            id: '1',
            type: '1周版套餐',
            cash: '￥3.00',
            step: '每天',
            alls: '收取US$3.00',
            color: ''
          },
          {
            id: '2',
            type: '1月版套餐',
            cash: '￥14.00',
            step: '每周',
            alls: '收取US$8.00',
            color: ''
          },
          {
            id: '3',
            type: '1年版套餐',
            cash: '$4.00',
            step: '每月',
            alls: '收取US$48.00',
            color: ''
          },
          {
            id: '4',
            type: '2年版套餐',
            cash: '$3.50',
            step: '每月',
            alls: '收取US$84.00',
            color: ''
          }
        ],
        desc: '',
        childParams: {}
      }
    })
    function currentSelect (params) {
      state.form.cardlists[params - 1].color = 'color: #67C23A;'
      state.form.type = params
      for (let index = 0; index < state.form.cardlists.length; index++) {
        if (index !== (params - 1)) {
          state.form.cardlists[index].color = ''
          // console.log(state.form.cardlists[index].color)
          // console.log(state.form.cardlists[params - 1].color)
        }
      }
    }
    /**
     * 邮箱校验
    */
    function handleCommit () {
      const reg = /\w+([-+.]\w+)*@\w+([-.]\w+)*\.\w+([-.]\w+)*/
      if (!reg.test(state.form.mail)) {
        ElMessage(`${state.form.mail} 邮箱号码不正确，请重新填写~`)
      }
      if (state.form.type === '') {
        ElMessage('请先任意选择一个[周 、 月 或 年]的套餐~')
      }
      // if (!reg.test(state.form.mail)) {
      //   state.form.continuecmt = false
      // }
    }
    return {
      ...toRefs(state), currentSelect, handleCommit
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
  margin:10 auto;
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
.spanleft{
  text-align: left;
  display: inline-flex;
}
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
.el-card{
  /* background-color: #d7e2f3; */
}
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
.el-row{
  /* background-color: #d7e2f3; */
}
.el-col{
  /* background-color: #d7e2f3; */
  margin-top: 1px;
}
.el-card{
  margin-right: 20px;
}
.el-card:hover{
  box-shadow: 5px 5px 10px #4170b8 !important;
}

</style>
