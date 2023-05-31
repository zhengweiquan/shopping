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
// 全部分类二级菜单里面
/**
 * @description: 获取导航数据
 * @data { 
     categoryId: 1005000 ,
     page: 1,
     pageSize: 20,
     sortField: 'publishTime' | 'orderNum' | 'evaluateNum'
   } 
 * @return {*}
 */
   export const getSubCategoryAPI = (data) => {
    return http({
      url:'/category/goods/temporary',
      method:'POST',
      data
    })
  }
