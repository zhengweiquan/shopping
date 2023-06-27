// 这个是axios请求文件
// axios文件
import { ElMessage } from 'element-plus'
import { useUseStore } from '@/stores/user'
import router from '@/router/index'
import 'element-plus/theme-chalk/el-message.css'
import axios from 'axios'
const http = axios.create({
  baseURL: 'http://pcapi-xiaotuxian-front-devtest.itheima.net',
  timeout: 5000, //最大请求时间
})
// 配置请求拦截器
http.interceptors.request.use(
  (config) => {
    //配置请求拦截器
    // 请求接口携带token
    const useStore = useUseStore() //不知道为什么要在这里声明 usetore 而在导入那里声明不行
    const token = useStore.userInfo.token
    if (token) {
      config.headers.Authorization = `Bearer ${token}` //为当前请求配置请求 Token 字段
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
