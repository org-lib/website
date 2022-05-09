import axios from 'axios'
import qs from 'qs'

// axios.defaults.baseURL = ''
axios.defaults.baseURL = process.env.VUE_APP_BASE_API
// Access-Control-Allow-Credentials设置为true的情况下
// Access-Control-Allow-Origin不能设置为*
axios.defaults.withCredentials = false

// 这是一对儿的
axios.defaults.headers['Content-Type'] = 'application/x-www-form-urlencoded'
// axios.defaults.transformRequest = data => JSON.stringify(data)
// axios.defaults.headers['Content-Type'] = 'application/json'
// axios.defaults.transformRequest = data => qs.stringify(data)

axios.interceptors.request.use(config => {
  // if (config.type === 'formData' || config.method !== 'post') {
  //   return config
  // }
  // config.data = qs.stringify(config.data)
  if (config.requestBaseUrl === 'local') { // localapi.js
    config.baseURL = process.env.VUE_APP_LOCAL_API
  }
  // if (config.method === 'post') {
  //   config.data = qs.stringify(config.data)
  // }
  // 添加请求拦截器，在请求头中加token
  if (localStorage.getItem('Authorization')) {
    config.headers.token = localStorage.getItem('Authorization')
  }
  return config
})

axios.interceptors.response.use(response => {
  return response.data
})
export default axios
