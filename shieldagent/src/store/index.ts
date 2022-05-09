import { createStore } from 'vuex'

export default createStore({
  state: {
    // 存储token
    Authorization: localStorage.getItem('Authorization') ? localStorage.getItem('Authorization') : '',
    // 存储登录状态
    Connected: localStorage.getItem('Connected') ? localStorage.getItem('Connected') : false,
    // 存储用户名称
    User: localStorage.getItem('Mail') ? localStorage.getItem('Mail') : '',
    // 存储用户ID
    UID: localStorage.getItem('UID') ? localStorage.getItem('UID') : '',
    // 存储用户ID
    Cancel: localStorage.getItem('Cancel') ? localStorage.getItem('Cancel') : false,
    // 控制是否打开网络连接状态
    ConnectedNet: localStorage.getItem('ConnectedNet') ? localStorage.getItem('ConnectedNet') : false
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
      localStorage.setItem('Connected', user.Connected)
    }
  },
  actions: {
  },
  modules: {
  }
})
