import http from '../utils/http'
// 商品详情页
export const getDetail = (id) => {
  return http({
    url: '/goods',
    params: {
      id
    }
  })
}
// 24H 周热榜单
/**
 * 获取热榜商品
 * @param {Number} id - 商品id
 * @param {Number} type - 1代表24小时热销榜 2代表周热销榜
 * @param {Number} limit - 获取个数
 */
export function getHotAPI({id,type,limit=3}) {
return http({
  url: '/goods/hot',
  params: {
    id,
    type,
    limit
  }
})
}