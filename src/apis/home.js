// 轮播图数据
import  http  from '@/utils/http'

export function getBanneeerAPI() {
  return http({
    url: 'home/banner',
  })
}
