import http from "@/utils/http"
export const getOederAPI = (id)=> {
  return http({
    url: `/member/order/${id}`
  })
}