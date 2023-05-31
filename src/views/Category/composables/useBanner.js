// 轮播图模块

import { ref, onMounted } from 'vue'
import { getBanneeerAPI } from '@/apis/home.js'
export function userBanner() {
  const bannerList = ref([])
  const BanneeerAPI = async () => {
    const res = await getBanneeerAPI({
      distributionSite: '2',
    })
    bannerList.value = res.data.result
  }
  onMounted(() => {
    BanneeerAPI()
  })
  return {
    bannerList,
  }
}
