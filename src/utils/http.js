// 这个是axios请求文件
// axios文件
import { ElMessage } from 'element-plus'
import { useUseStore } from '@/stores/user'
import router from '@/router/index'
import 'element-plus/theme-chalk/el-message.css'
import axios from 'axios'
const http = axios.create({
  baseURL: 'http://pcapi-xiaotuxian-front-devtest.itheima.net',
  timeout: 2000, //最大请求时间
})
// 配置请求拦截器
http.interceptors.request.use(
  (config) => {
    //配置请求拦截器
    // 好物推荐模块携带token会校验失败所以去除这个接口携带token
    if(config.url === '/goods') {
      return config
    }
    // 请求接口携带token
    const usetore = useUseStore() //不知道为什么要在这里声明 usetore 而在导入那里声明不行
    const token = usetore.userInfo.token
    if (token) {
      config.headers.Authorization = `Beaer ${token}` //为当前请求配置请求 Token 字段
    }
    return config
  },
  function (error) {
    return Promise.reject(error)
  } //对请求错误做点什么
)
// 配置响应拦截器
http.interceptors.response.use(
  function (response) {
    return response
  },
  function (error) {
    ElMessage({
      type: 'warning',
      message: error.response.data.message,
    })
    // 401token失效
    if (error.response.status === 401) {
      const usetore = useUseStore()
      usetore.clearUserInfo()
      router.push('/login')
    }
    return Promise.reject(error) //对请求错误做点什么
  }
)
export default http
