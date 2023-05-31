// 轮播图数据
import  http  from '@/utils/http'

export function getBanneeerAPI(params = {}) {
  const { distributionSite = '1'} = params
  return http({
    url: 'home/banner',
    params: {
      distributionSite
    }
  })
}
// 新鲜好物
export function getHomeNewAPI() {
  return http({
    url:'home/new'
  })
}
// 人气推荐
export function getHotAPI() {
  return http({
    url: 'home/hot'
  }) 
}
export function getProductAPI() {
  return http({
    url: '/home/goods'
  })
}