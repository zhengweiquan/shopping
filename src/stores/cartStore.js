// 封装购物车模块
import { ref, computed } from 'vue'
import { defineStore } from 'pinia'
import { useUseStore } from './user'
import { insertCartAPI, findNewCartAPI, delCartAPI } from '@/apis/cart'
export const useCartStore = defineStore(
  'cat',
  () => {
    const useStore = useUseStore() 
    const isLogin = computed(() => useStore.userInfo.token)
    // 抽离更新购物车数据函数
    const updateNewList = async()=> {
      const res = await findNewCartAPI()
      cartList.value = res.data.result
    }
    // 定义state
    const cartList = ref([])
    // 添加商品 函数
    const addCart = async (goods) => {
      // 如果登录了
      if (isLogin.value) {
        // 添加购物车
        const { skuId, count } = goods
        await insertCartAPI({ skuId, count })
        // 获取购物车
        updateNewList()
      } else {
        // 判断cartList里面是否有对应的商品
        const item = cartList.value.find((item) => goods.skuId === item.skuId)
        if (item) {
          // 找到了
          item.count++
        } else {
          cartList.value.push(goods)
        }
        console.log(cartList.value)
      }
    }

    // 删除商品
    const delCart = async (skuId) => {
      if (isLogin.value) {
        // 调接口删除
        await delCartAPI([skuId])
        // 获取购物车
        updateNewList()
      } else {
        // 删除方法1: 利用findIndex找到相应的序号,再使用splice进行删除
        //findIndex 找到相应的skuid的值的序号
        // const idx = cartList.value.findIndex((item)=> skuId === item.skuId)
        // cartList.value.splice(idx,1)   //从第idx开始删除,删除1个
        // // 删除方法2: 数组过滤
        cartList.value = cartList.value.filter((item) => item.skuId != skuId)
      }
    }
    // 总的件数
    const sumcount = computed(() => {
      let sumcounts = 0
      cartList.value.forEach((item) => {
        sumcounts += item.count
      })
      return sumcounts
    })
    // 总价格
    const summoney = computed(() => {
      let sum = 0
      cartList.value.forEach((item) => {
        sum += item.price * item.count
      })
      return sum
    })
    // 退出登录清除购物车
    const clearCart = ()=> {
      cartList.value = []
    }
    // 单选框修改
    const singleCheck = (skuId, selected) => {
      const item = cartList.value.find((item) => item.skuId === skuId)
      item.selected = selected //这里修改item的值为什么会修改到cartList的值
    }
    // 全选按钮
    const isAll = computed(() => cartList.value.every((item) => item.selected))
    const allCheck = (selected) => {
      cartList.value.forEach((item) => (item.selected = selected))
    }
    // 统计已经选择的商品数量
    // let sumcheck = 0
    //   cartList.value.filter((item)=>item.selected).forEach((item)=> {
    //     sumcheck += item.count
    //   })
    const sumcheck = computed(() => {
      let count = 0
      cartList.value
        .filter((item) => item.selected)
        .forEach((item) => {
          count += item.count
        })
      return count
    })
    return {
      cartList,
      addCart,
      delCart,
      sumcount,
      summoney,
      singleCheck,
      isAll,
      allCheck,
      sumcheck,
      updateNewList,
      clearCart
    }
  },
  {
    persist: true, //开启同步进本地存储
  }
)
