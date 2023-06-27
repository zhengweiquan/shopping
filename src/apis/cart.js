// 登录状态购物车 加入购物车
import http from '../utils/http'

export const insertCartAPI = ({ skuId, count }) => {
  return http({
    url: '/member/cart',
    method: 'POST',
    data: {
      skuId,
      count,
    },
  })
}
// 获取最新购物车
export const findNewCartAPI = () => {
  return http({
    url: '/member/cart',
  })
}
// 删除购物列表
export const delCartAPI = (ids) => {
  return http({
    url: '/member/cart',
    method: 'DELETE',
    data: {
      ids,
    },
  })
}
// 合并购物车
export const mergeCartAPI = (data) => {
  return http({
    url: '/member/cart/merge',
    method: 'POST',
    data
  })
}