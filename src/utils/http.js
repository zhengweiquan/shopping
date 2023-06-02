// 这个是axios请求文件
// axios文件
import axios from 'axios'
const http = axios.create({
  baseURL: 'http://pcapi-xiaotuxian-front-devtest.itheima.net',
  timeout: 2000  //最大请求时间
})
// 配置请求拦截器
http.interceptors.request.use(config => {   //配置请求拦截器
  // config.headers.Authorization = 'Beaer xxx'   //为当前请求配置请求 Token 字段
  return config
},function (error) {
  return Promise.reject(error)}  //对请求错误做点什么
  )
// 配置响应拦截器
http.interceptors.response.use(function (response) {
  return response
},function (error) {
  return Promise.reject(error)}  //对请求错误做点什么
)
export default http