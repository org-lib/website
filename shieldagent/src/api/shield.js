import axios from './axios'
// import qs from 'qs'

function API_GOPAY(param) {
  return axios({
    method: 'post',
    url: '/auth/pay/qrcode',
    // headers: {
    //   'X-Requested-With': 'XMLHttpRequest',
    //   'Content-Type': 'application/json; charset=UTF-8'
    // },
    data: param
  })
}
function API_GOPAYORDERNO(param) {
  return axios({
    method: 'post',
    url: '/auth/pay/order',
    // headers: {
    //   'X-Requested-With': 'XMLHttpRequest',
    //   'Content-Type': 'application/json; charset=UTF-8'
    // },
    data: param
  })
}
function API_GOBAR(param) {
  return axios({
    method: 'post',
    url: '/auth/pay/bar',
    // headers: {
    //   'X-Requested-With': 'XMLHttpRequest',
    //   'Content-Type': 'application/json; charset=UTF-8'
    // },
    data: param
  })
}
export default {
  API_GOPAY,
  API_GOPAYORDERNO,
  API_GOBAR
}
