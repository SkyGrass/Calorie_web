import request from "@/utils/request";


export function fetchU8CusList(data) {
  return request({
    url: "/u8cus/getallu8cuslist",
    method: "post",
    data
  });
}


export function fetchU8CusListForCanBind(data) {
  return request({
    url: "/u8cus/getallu8cuslistforcanbind",
    method: "post",
    data
  });
}

export function fetchU8CusListWithCode(data) {
  return request({
    url: "/u8cus/getallu8cuslistwithcode",
    method: "post",
    data
  });
}

export function fetchU8CusListForBind(data) {
  return request({
    url: "/u8cus/getallu8cuslistforbind",
    method: "post",
    data
  });
}
export function fetchU8CusListHaveBind(data) {
  return request({
    url: "/u8cus/getallu8cuslisthavebind",
    method: "post",
    data
  });
}

export function saveTraderBindCus(data) {
  return request({
    url: "/u8cus/saveTraderBindCus",
    method: "post",
    data
  });
}
