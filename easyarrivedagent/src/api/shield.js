import axios from './axios'
import axioslocal from './axioslocal'

function API_LATEST(){
  return axios.get('/news/latest')
}
function API_DETAIL(id){
  return axios.get(`/news/${id}`)
}
function API_LOCAL(){
  return axioslocal.get('/data/getSettings')
}
function API_LOCAL_SETTINGS(params){
  return axioslocal.post('/data',params)
}
export default {
  API_LOCAL,
  API_LOCAL_SETTINGS,
  API_LATEST,
  API_DETAIL
}