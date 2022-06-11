import { createStore } from 'vuex'

export default createStore({
  state: {
    // 存储token
    Authorization: localStorage.getItem('Authorization') ? localStorage.getItem('Authorization') : '',
    // 存储登录状态
    Connected: localStorage.getItem('Login') ? localStorage.getItem('Login') : 'false',
    // 存储登录状态
    Expire: localStorage.getItem('Expire') ? localStorage.getItem('Expire') : 'true',
    // 存储用户名称
    User: localStorage.getItem('Mail') ? localStorage.getItem('Mail') : '',
    // 存储用户ID
    UID: localStorage.getItem('UID') ? localStorage.getItem('UID') : '',
    // 控制是否打开网络连接状态
    ConnectedNet: localStorage.getItem('ConnectedNet') ? localStorage.getItem('ConnectedNet') : 'false'
  },
  mutations: {
    // 修改token，并将token存入localStorage
    changeLogin (state, user) {
      state.Authorization = user.Authorization
      localStorage.setItem('Authorization', user.Authorization)
    },
    //
    changeTcp (state, user) {
      state.Connected = user.Connected
      localStorage.setItem('Login', user.Connected)
    }
  },
  actions: {
  },
  modules: {
  }
})
