// 管理用户登录数据
import { ref } from 'vue'
import { loginAPI } from '@/apis/user' //数据提交登录
import { defineStore } from 'pinia'
import { useCartStore } from './cartStore'
import { mergeCartAPI } from '@/apis/cart'

const userInfo = ref({}) 
export const useUseStore = defineStore('user',() => {
    const CartStore = useCartStore()
    const getUserInfo = async ({ account, password }) => {
      const res = await loginAPI({ account, password })
      userInfo.value = res.data.result
      // 合并购物车 调函数
      await mergeCartAPI(CartStore.cartList.map((item)=> {  //map 经过移动处理返回一各全新的数组
        return {
          skuId: item.skuId,
          selected: item.selected,
          count: item.count
        }
      }))
      CartStore.updateNewList()
    }
    // 退出登录
    const clearUserInfo = () => {
      userInfo.value = {} //插件会自动把本地存储的userInfo给清空
      CartStore.clearCart()
    }
    return {
      userInfo,
      getUserInfo,
      clearUserInfo,
    }
  },
  {
    persist: true,
  }
)
