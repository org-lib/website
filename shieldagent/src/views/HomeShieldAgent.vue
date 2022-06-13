<template>
  <el-container>
    <el-header style="text-align: right; font-size: 12px">
      <el-row class="block-col-2">
        <el-col :span="8" style="text-align: left;">
          <Header/>
        </el-col>
        <el-col :span="8">
          <Centor/>
        </el-col>
        <el-col :span="8" v-if="isRouterAlive">
          <Footer/>
        </el-col>
      </el-row>
    </el-header>
    <el-container>
      <el-aside width="100px">
        <el-menu
        background-color="#222832"
        text-color="#fff"
        :router="true"
        :default-active='state.currentPath'
        >
          <el-menu-item index="/shieldAgent">
              <!-- <span class="el-icon-s-home"></span> -->
              <el-icon class="yes"><HomeFilled /></el-icon>
              <span>主页</span>
          </el-menu-item>
          <el-menu-item index="/about">
              <!-- <span class="el-icon-discover"></span> -->
              <el-icon class="yes"><Compass /></el-icon>
              <span>发现</span>
          </el-menu-item>
          <el-menu-item index="/settings">
              <!-- <span class="el-icon-discover"></span> -->
                        <!-- // 开机启动配置，true 表示已经是启动状态，false 表示开机并不会随着电脑启动
          // const {getswitch} = API.shield.API_LOCAL() -->

              <el-icon class="yes"><Tools /></el-icon>
              <span>设置</span>
          </el-menu-item>
        </el-menu>
      </el-aside>
      <el-container class="content">
        <!-- <Header /> -->
        <div class="main">
          <router-view />
        </div>
        <!-- <Footer /> -->
      </el-container>
    </el-container>

    <!-- <el-main>
      <img alt="Shield logo" src="https://product-1256865522.cos.ap-shanghai.myqcloud.com/websit%2Fshield%2F128.png">
      <ShieldAgent msg="购买专业版"/>
      <router-view/>

    </el-main> -->
  </el-container>
</template>

<script lang="ts">
import { defineComponent, onUnmounted, reactive, provide, nextTick, ref } from 'vue'
import Header from '@/components/Head/Header.vue'
import Centor from '@/components/Head/Centor.vue'
import Footer from '@/components/Head/Footer.vue'
import { useRouter } from 'vue-router'
import { HomeFilled, Compass, Tools } from '@element-plus/icons'

export default defineComponent({
  name: 'HomeAgent',
  components: {
    Header,
    Centor,
    Footer,
    HomeFilled,
    Compass,
    Tools
  },
  setup () {
    const router = useRouter()
    const state = reactive({
      currentPath: '/shieldAgent'
    })
    const unwatch = router.beforeEach((to, from, next) => {
      next()
      state.currentPath = to.path
    })

    onUnmounted(() => {
      unwatch()
    })
    // 局部刷新重新加载组件状态
    const isRouterAlive = ref(true)
    const reload = () => {
      isRouterAlive.value = false
      nextTick(() => {
        isRouterAlive.value = true
      })
    }
    provide('reload', reload)
    return {
      state,
      isRouterAlive
    }
  }
})
</script>
<style scoped>
.el-header {
  /* background-color: ; */
  /* background-color: #d7e2f3; */
  color: #333;
  text-align: center;
  line-height: 60px;
  display: flex;
  flex-direction: column;
  max-height: 100vh;
  overflow: hidden;
  margin-top: 10px;
  border-top: 2px solid #d7e2f3;
  border-bottom: 2px solid #d7e2f3;
}
.el-aside {
  /* background-color: #D3DCE6; */
  margin-top: 10px;
  margin-right: 5px;
  /* background-color: white; */
  color: #333;
  text-align: center;
  line-height: 70px;
  /* background-color: #d7e2f3; */
  overflow: hidden;
  overflow-y: auto;
  -ms-overflow-style: none;
  overflow: -moz-scrollbars-none;
  height: calc(100vh - 12vh);
  border-right: 2px solid #d7e2f3;
}
.el-menu-item{
  background-color: white;
  color: #333;
  --el-menu-hover-background-color:#d7e2f3 ;
}
.el-menu-item.is-active {
  background: rgb(235,238,245) !important;
  background-color: #8bb1e2;
}
.el-menu-vertical-demo {
  padding: 5px;
}
.content {
  height: calc(100vh - 11vh);
  /* background-color: white; */
  display: flex;
  flex-direction: column;
  max-height: 100vh;
  overflow: hidden;
  text-align: center;
}
.main {
  /* background-color: #d7e2f3; */
  height: calc(100vh - 8.5vh);
  overflow: auto;
  padding: 10px;
  margin-top: 10px;
  padding-left: 0px;
  border-left: 2px solid #d7e2f3;
}
</style>
