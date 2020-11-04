import { loginByUsername, logout, getUserInfo } from "@/api/login";
import { getToken, setToken, removeToken } from "@/utils/auth";

const user = {
  state: {
    user: "",
    status: "",
    code: "",
    token: getToken(),
    username: ``,
    name: "",
    avatar: "",
    introduction: "",
    cuscode: "",
    roles: [],
    setting: {
      articlePlatform: []
    },
    userId: ""
  },

  mutations: {
    SET_CODE: (state, code) => {
      state.code = code;
    },
    SET_TOKEN: (state, token) => {
      state.token = token;
    },
    SET_INTRODUCTION: (state, introduction) => {
      state.introduction = introduction;
    },
    SET_SETTING: (state, setting) => {
      state.setting = setting;
    },
    SET_STATUS: (state, status) => {
      state.status = status;
    },
    SET_NAME: (state, name) => {
      state.name = name;
    },
    SET_USERNAME: (state, username) => {
      state.username = username;
    },
    SET_AVATAR: (state, avatar) => {
      state.avatar = avatar;
    },
    SET_ROLES: (state, roles) => {
      state.roles = roles;
    },
    SET_CUSCODE: (state, cuscode) => {
      state.cuscode = cuscode;
    },
    SET_USERID: (state, userId) => {
      state.userId = userId;
    }
  },

  actions: {
    // 用户名登录
    LoginByUsername({ commit }, userInfo) {
      const username = userInfo.username.trim();
      return new Promise((resolve, reject) => {
        loginByUsername(username, userInfo.password)
          .then(response => {
            const { data, state, message } = response.data;
            if (state === `success`) {
              commit("SET_TOKEN", data.token);
              setToken(data.token);
              resolve();
            } else {
              reject(message);
            }
          })
          .catch(error => {
            reject(error);
          });
      });
    },

    // 获取用户信息
    GetUserInfo({ commit, state }) {
      return new Promise((resolve, reject) => {
        getUserInfo(state.token)
          .then(response => {
            // 由于mockjs 不支持自定义状态码只能这样hack
            if (!response.data) {
              reject("Verification failed, please login again.");
            }
            const { data, state, message } = response.data;
            if (state === `success`) {
              if (data.roles && data.roles.length > 0) {
                // 验证返回的roles是否是一个非空数组
                commit("SET_ROLES", data.roles);
              } else {
                reject("getInfo: roles must be a non-null array!");
              }
              commit("SET_USERID", data.userId);
              commit("SET_NAME", data.name);
              commit("SET_USERNAME", data.username);
              commit("SET_AVATAR", data.avatar);
              commit("SET_INTRODUCTION", data.introduction);
              commit("SET_CUSCODE", data.cuscode);
              resolve(response);
            } else {
              reject(message);
            }
          })
          .catch(error => {
            reject(error);
          });
      });
    },

    // 第三方验证登录
    // LoginByThirdparty({ commit, state }, code) {
    //   return new Promise((resolve, reject) => {
    //     commit('SET_CODE', code)
    //     loginByThirdparty(state.status, state.email, state.code).then(response => {
    //       commit('SET_TOKEN', response.data.token)
    //       setToken(response.data.token)
    //       resolve()
    //     }).catch(error => {
    //       reject(error)
    //     })
    //   })
    // },

    // 登出
    LogOut({ commit, state }) {
      return new Promise((resolve, reject) => {
        logout(state.token)
          .then(() => {
            commit("SET_TOKEN", "");
            commit("SET_ROLES", []);
            removeToken();
            resolve();
          })
          .catch(error => {
            reject(error);
          });
      });
    },

    // 前端 登出
    FedLogOut({ commit }) {
      return new Promise(resolve => {
        commit("SET_TOKEN", "");
        removeToken();
        resolve();
      });
    },

    // 动态修改权限
    ChangeRoles({ commit, dispatch }, role) {
      return new Promise(resolve => {
        commit("SET_TOKEN", role);
        setToken(role);
        getUserInfo(role).then(response => {
          const data = response.data;
          commit("SET_ROLES", data.roles);
          commit("SET_NAME", data.name);
          commit("SET_USERNAME", data.username);
          commit("SET_AVATAR", data.avatar);
          commit("SET_INTRODUCTION", data.introduction);
          dispatch("GenerateRoutes", data); // 动态修改权限后 重绘侧边菜单
          resolve();
        });
      });
    }
  }
};

export default user;
