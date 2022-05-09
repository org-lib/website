import axios from './axios'
import qs from 'qs'

function API_LOGIN(param) {
  return axios({
    method: 'post',
    url: '/users/login',
    // headers: {
    //   'X-Requested-With': 'XMLHttpRequest',
    //   'Content-Type': 'application/json; charset=UTF-8'
    // },
    data: qs.stringify(param)
  })
}
function API_REGIST(param) {
  return axios({
    method: 'post',
    url: '/users/regist',
    // headers: {
    //   'X-Requested-With': 'XMLHttpRequest',
    //   'Content-Type': 'application/json; charset=UTF-8'
    // },
    data: qs.stringify(param)
  })
}
function API_EMAILCODE(param) {
  return axios({
    method: 'post',
    url: '/users/code',
    // headers: {
    //   'X-Requested-With': 'XMLHttpRequest',
    //   'Content-Type': 'application/json; charset=UTF-8'
    // },
    data: qs.stringify(param)
  })
}
function API_HELLO() {
  return axios({
    method: 'post',
    url: '/auth/hello'
  })
}
export default {
  API_LOGIN,
  API_REGIST,
  API_EMAILCODE,
  API_HELLO
}
