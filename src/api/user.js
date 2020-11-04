import request from "@/utils/request";

export function fetchList(data) {
  return request({
    url: "/user/getalluserlist",
    method: "post",
    data
  });
}

export function fetchUser(data) {
  return request({
    url: "/user/getuser",
    method: "post",
    data
  });
}

export function createUser(data) {
  return request({
    url: "/user/createuser",
    method: "post",
    data
  });
}

export function updateUser(data) {
  return request({
    url: "/user/updateuser",
    method: "post",
    data
  });
}

export function delUser(data) {
  return request({
    url: "/user/deluser",
    method: "post",
    data
  });
}

export function reSetUserPwd(data) {
  return request({
    url: "/user/resetuserpwd",
    method: "post",
    data
  });
}

export function fetchTraderList(data) {
  return request({
    url: `/user/getalltraderlist`,
    method: `post`,
    data
  });
}

export function fetchCustomerList(data) {
  return request({
    url: `/user/getallcustomerlist`,
    method: `post`,
    data
  });
}

export function modifyPassword(data) {
  return request({
    url: `/user/modifypassword`,
    method: `post`,
    data
  });
}

export function removeUser(data) {
  return request({
    url: `/user/removeuser`,
    method: `post`,
    data
  });
}

export function syncUser(data) {
  return request({
    url: `/user/syncuser`,
    method: `get`
  });
}
