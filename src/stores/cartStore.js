// 封装购物车模块
import { ref, computed } from 'vue'
import { defineStore } from 'pinia'
export const useCartStore = defineStore(
  'cat',
  () => {
    // 定义state
    const cartList = ref([])
    // 添加商品 函数
    const addCart = (goods) => {
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
    // 删除商品
    const delCart = (skuId) => {
      // 删除方法1: 利用findIndex找到相应的序号,再使用splice进行删除
      //findIndex 找到相应的skuid的值的序号
      // const idx = cartList.value.findIndex((item)=> skuId === item.skuId)
      // cartList.value.splice(idx,1)   //从第idx开始删除,删除1个
      // // 删除方法2: 数组过滤
      cartList.value = cartList.value.filter((item) => item.skuId != skuId)
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
    // 单选框修改
    const singleCheck = (skuId, selected) => {
      const item = cartList.value.find((item) => item.skuId === skuId)
      item.selected = selected //这里修改item的值为什么会修改到cartList的值
    }
    // 全选按钮
    const isAll = computed(()=> cartList.value.every(item => item.selected))
    const allCheck = (selected)=> {
      cartList.value.forEach((item)=> item.selected = selected)
    }
    return {
      cartList,
      addCart,
      delCart,
      sumcount,
      summoney,
      singleCheck,
      isAll,
      allCheck
    }
  },
  {
    persist: true, //开启同步进本地存储
  }
)
