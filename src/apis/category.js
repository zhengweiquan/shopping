import http from '../utils/http'
export function getidAPI(id) {
  return http({
    url: '/category',
    params: {
      id,
    },
  })
}
// 全部分类  利用id进行数据获取
export function getCategoryFilterAPI(id) {
  return http({
    url: '/category/sub/filter',
    params: {
      id
    },
  })
}
