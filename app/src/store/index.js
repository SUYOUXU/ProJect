import Vue from 'vue'
import Vuex from 'vuex'

Vue.use(Vuex)
const store=new Vuex.Store({
  state: {
    userInfo:[],
    showTabbr:true,
    goodsList: [
        // {
        //   gender: "相机",
        //   id: "60949595137",
        //   imgurl:
        //     "https://img12.360buyimg.com/n7/jfs/t1/176522/23/18099/473978/60e19095Effc71825/f804b7341b8b9ec4.png",
        //   name: "佳能200d二代 2代  入门级单反相机 vlog便携家用迷你单反数码照相机 黑色200DII EF-S18-55套机 套餐一【入门配置 再送599元大礼包】",
        //   price: "5598.00",
        //   _id: "60e6936c99bb9833ac73510c",
        //   qty: 3,
        // },

    ],
  },
 

  getters:{

    // isLogin(){
    //   return !!userInfo
    // }
  },
  //修改state的唯一方法
  //store.commit('showTbbar')
  mutations: {

    showTabbr(state,payload){
      state.tabbarVisibility=payload
    },
    updateCart(state,goodsList){
      state.goodsList=goodsList
    },
    userInfo(state,userInfo){
      state.userInfo=userInfo
    },
  },
  actions: {

    
  },
  modules: {
  }
})
export default store