/* eslint-disable vue/multi-word-component-names */
// 把components 所有组件进行全局注册   这个写好了之后去main.js里面注册
import ImageView from './ImageView/ImageView.vue'
import Sku from './XtxSku/index.vue'
export const componentPlugin = {
  install (app) {
    // app.component('组件名字','组件的配置对象')
    app.component('ImageView',ImageView)
    app.component('Sku',Sku)
  }
}