import { getMenuByRole } from '@/api/menu'
const menu = {
  state: {
    menudata: []
  },
  mutations: {
    SET_MENUDATA: (state, menudata) => {
      state.menudata = menudata
    }
  },
  actions: {
    // 根据角色获取菜单
    GetMenuByRole({ commit }, role) {
      return new Promise((resolve, reject) => {
        getMenuByRole(role).then(response => {
          const data = response.data
          commit('SET_MENUDATA', data)
          console.log(data)
          resolve()
        }).catch(error => {
          reject(error)
        })
      })
    },
  }
}

export default menu
