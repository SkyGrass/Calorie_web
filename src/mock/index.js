import Mock from "mockjs";
import loginAPI from "./login";
import articleAPI from "./article";
import remoteSearchAPI from "./remoteSearch";
import transactionAPI from "./transaction";

import menuAPI from "./menu";
import roleAPI from "./role";
import useAPI from "./user";
import u8CusAPI from "./u8cus";
import u8STAPI from "./u8st";
import invAPI from "./inv";
import presellAPI from "./presell";

// 修复在使用 MockJS 情况下，设置 withCredentials = true，且未被拦截的跨域请求丢失 Cookies 的问题
// https://github.com/nuysoft/Mock/issues/300
Mock.XHR.prototype.proxy_send = Mock.XHR.prototype.send;
Mock.XHR.prototype.send = function() {
  if (this.custom.xhr) {
    this.custom.xhr.withCredentials = this.withCredentials || false;
  }
  this.proxy_send(...arguments);
};

// Mock.setup({
//   timeout: '350-600'
// })

// 登录相关
// Mock.mock(/\/login\/login/, 'post', loginAPI.loginByUsername)
// Mock.mock(/\/login\/logout/, 'post', loginAPI.logout)
// Mock.mock(/\/user\/info\.*/, 'get', loginAPI.getUserInfo)

// 文章相关
Mock.mock(/\/article\/list/, "get", articleAPI.getList);
Mock.mock(/\/article\/detail/, "get", articleAPI.getArticle);
Mock.mock(/\/article\/pv/, "get", articleAPI.getPv);
Mock.mock(/\/article\/create/, "post", articleAPI.createArticle);
Mock.mock(/\/article\/update/, "post", articleAPI.updateArticle);

// 搜索相关
Mock.mock(/\/search\/user/, "get", remoteSearchAPI.searchUser);

// 账单相关
Mock.mock(/\/transaction\/list/, "get", transactionAPI.getList);

// 菜单权限相关
// Mock.mock(/\/menu\/getmenubyrole/, 'post', menuAPI.getAllMenuByRole)
Mock.mock(/\/menu\/getallmenu/, "post", menuAPI.getAllMenu);
Mock.mock(/\/role\/getallmenuscanuse/, "post", menuAPI.getAllMenuCanUse);

// 角色相关
// Mock.mock(/\/role\/getallrolelist/, 'post', roleAPI.getAllRoleList)
// Mock.mock(/\/role\/createrole/, 'post', roleAPI.createRole)
// Mock.mock(/\/role\/delrole/, 'post', roleAPI.delRole)
// Mock.mock(/\/role\/updaterole/, 'post', roleAPI.updateRole)
// Mock.mock(/\/role\/getroleforselect/, 'post', roleAPI.getRoleForSelect)

// 用户相关
// Mock.mock(/\/user\/getalluserlist/, 'post', useAPI.getAllUserList)
// Mock.mock(/\/user\/createuser/, 'post', useAPI.createUser)
// Mock.mock(/\/user\/deluser/, 'post', useAPI.delUser)
// Mock.mock(/\/user\/updateuser/, 'post', useAPI.updateUser)
// Mock.mock(/\/user\/resetuserpwd/, 'post', useAPI.reSetUserPwd)
// Mock.mock(/\/user\/getalltraderlist/, 'post', useAPI.getAllTraderList)
Mock.mock(/\/user\/getallcustomerlist/, "post", useAPI.getAllCustomerList);

//U8客户档案
// Mock.mock(/\/u8cus\/getallu8cuslist/, 'post', u8CusAPI.getAllU8CusList)
Mock.mock(
  /\/u8cus\/getu8cuslistfromtrader/,
  "post",
  u8CusAPI.getU8CusListFromTrader
);

//U8ST
// Mock.mock(/\/u8st\/getallu8stlist/, "post", u8STAPI.getAllU8StList);

//inv
// Mock.mock(/\/inv\/getinvlist/, "post", invAPI.getInvtList);
Mock.mock(/\/inv\/getcusinvlist/, "post", invAPI.getCusInvtList);

//presell
// Mock.mock(/\/presell\/getpresellbillno/, "post", presellAPI.getPreSellBillNo);

export default Mock;
