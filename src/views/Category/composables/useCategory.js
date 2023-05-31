// 封装分类数据业务相关代码
import { ref, onMounted } from 'vue'
import { onBeforeRouteUpdate } from 'vue-router'
import { useRoute } from 'vue-router' //获取路由参数id
import { getidAPI } from '@/apis/category.js'

export function useCategory() {
  const routerid = useRoute() //存 路由获取到的id
  const idata = ref({})
  const idAPI = async (id = routerid.params.id) => {
    const res = await getidAPI(id) //将id传进去
    idata.value = res.data.result
  }
  // 解决路由缓存问题 路由参数变化的时候可以把分类数据接口重新发送
  onBeforeRouteUpdate((to) => {
    idAPI(to.params.id)
  })
  onMounted(() => {
    idAPI()
  })
  return {
    idata
  }
}
