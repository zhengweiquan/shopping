// 管理用户登录数据
import { ref } from 'vue'
import { loginAPI } from '@/apis/user' //数据提交登录
import { defineStore } from 'pinia'
const userInfo = ref({})
export const useUseStore = defineStore(
  'user',
  () => {
    const getUserInfo = async ({ account, password }) => {
      const res = await loginAPI({ account, password })
      userInfo.value = res.data.result
    }
    const clearUserInfo = () => {
      userInfo.value = {} //插件会自动把本地存储的userInfo给清空
    }
    return {
      userInfo,
      getUserInfo,
      clearUserInfo
    }
  },
  {
    persist: true
  }
)
