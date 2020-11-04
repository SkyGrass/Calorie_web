import { constantRouterMap, routerMap } from "@/router";
import { getMenuByRole } from "@/api/menu";

/**
 * 通过meta.role判断是否与当前用户权限匹配
 * @param roles
 * @param route
 */
function hasPermission(roles, route) {
  if (route.meta && route.meta.roles) {
    return roles.some(role => route.meta.roles.includes(role));
  } else {
    return true;
  }
}

function generateAsyncRouter(routerMap, serverRouterMap) {
  serverRouterMap.forEach(function(item, index) {
    item.component = routerMap[item.component];
    if (item.children && item.children.length > 0) {
      generateAsyncRouter(routerMap, item.children);
    }
  });
  return serverRouterMap;
}

/*
 * 删除子节点下的redirect属性
 * 将meta属性中的title 提到 根属性上
 * 将isclosed 属性复制到 disabled
 * */
function deleteChildrenMenuRedirectPro(menu) {
  if (menu) {
    menu.forEach(item => {
      if (item.meta) {
        item.title = item.meta.title;
      }

      item.disabled = item.isclosed;
      item.children.forEach(child => {
        delete child.redirect;
        if (menu.children && menu.children.length > 0) {
          deleteChildrenMenuRedirectPro(child.children);
        }
      });
    });

    return menu;
  }
  return undefined;
}

/**
 * 递归过滤异步路由表，返回符合用户角色权限的路由表
 * @param routes asyncRouterMap
 * @param roles
 */
function filterAsyncRouter(routes, roles) {
  const res = [];

  routes.forEach(route => {
    const tmp = { ...route };
    if (hasPermission(roles, tmp)) {
      if (tmp.children) {
        tmp.children = filterAsyncRouter(tmp.children, roles);
      }
      res.push(tmp);
    }
  });

  return res;
}

const permission = {
  state: {
    routers: [],
    addRouters: []
  },
  mutations: {
    SET_ROUTERS: (state, routers) => {
      state.addRouters = routers;
      state.routers = constantRouterMap.concat(routers);
    }
  },
  actions: {
    GenerateRoutes({ commit }, data) {
      return new Promise((resolve, reject) => {
        const { roles } = data;
        let accessedRouters = [];
        getMenuByRole(roles)
          .then(response => {
            let { data, state, message } = response.data;
            if (state === `success`) {
              data = deleteChildrenMenuRedirectPro(data);
              const serverRouterMap = generateAsyncRouter(routerMap, data);
              accessedRouters = filterAsyncRouter(serverRouterMap, roles);
              commit("SET_ROUTERS", accessedRouters);
              resolve();
            } else {
              reject(message);
            }
          })
          .catch(error => {
            reject(error);
          });

        // let accessedRouters
        // if (roles.includes('admin')) {
        //   accessedRouters = asyncRouterMap
        // } else {
        //   accessedRouters = filterAsyncRouter(asyncRouterMap, roles)
        // }
        // commit('SET_ROUTERS', accessedRouters)
        // resolve()
      });
    }
  }
};

export default permission;
