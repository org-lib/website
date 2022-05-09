import axios from './axios'
// import qs from 'qs'

function API_SETTINGS(param) {
  return axios({
    method: 'post',
    url: '/data/settings',
    // headers: {
    //   'X-Requested-With': 'XMLHttpRequest',
    //   'Content-Type': 'application/json; charset=UTF-8'
    // },
    requestBaseUrl: 'local',
    data: param
  })
}
function API_LOCAL_SETUID(param) {
  return axios({
    method: 'post',
    url: '/data/setuser',
    // headers: {
    //   'X-Requested-With': 'XMLHttpRequest',
    //   'Content-Type': 'application/json; charset=UTF-8'
    // },
    requestBaseUrl: 'local',
    data: param
  })
}
function API_LOCAL() {
  return axios({
    method: 'get',
    url: '/data/get',
    requestBaseUrl: 'local'
  })
}
function API_LOCAL_CONNECTION() {
  return axios({
    method: 'get',
    url: '/data/state',
    requestBaseUrl: 'local'
  })
}
function API_LOCAL_OPEN(param) {
  return axios({
    method: 'post',
    url: '/data/webopen',
    // headers: {
    //   'X-Requested-With': 'XMLHttpRequest',
    //   'Content-Type': 'application/json; charset=UTF-8'
    // },
    requestBaseUrl: 'local',
    data: param
  })
}

function API_LOCAL_UID() {
  return axios({
    method: 'get',
    url: '/data/getuser',
    requestBaseUrl: 'local'
  })
}
export default {
  API_SETTINGS,
  API_LOCAL,
  API_LOCAL_CONNECTION,
  API_LOCAL_UID,
  API_LOCAL_SETUID,
  API_LOCAL_OPEN
}
