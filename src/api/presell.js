import request from "@/utils/request";

export function getPreSellBillNo(data) {
  return request({
    url: "/presell/getpresellbillno",
    method: "post",
    data
  });
}
export function savePreSell(data) {
  return request({
    url: "/presell/savePreSell",
    method: "post",
    data
  });
}

export function getPreSellList(data) {
  return request({
    url: "/presell/getpreselllist",
    method: "post",
    data
  });
}

export function getPreSellForMonthList(data) {
  return request({
    url: "/presell/getpresellformonthlist",
    method: "post",
    data
  });
}

export function getPreSellInfo(data) {
  return request({
    url: "/presell/getpresellinfo",
    method: "post",
    data
  });
}

export function getPreSellForMonthInfo(data) {
  return request({
    url: "/presell/getpresellformonthinfo",
    method: "post",
    data
  });
}

export function auditPresell(data) {
  return request({
    url: "/presell/auditpresell",
    method: "post",
    data
  });
}

export function unAuditPresell(data) {
  return request({
    url: "/presell/unauditpresell",
    method: "post",
    data
  });
}

export function buildU8So(data) {
  return request({
    url: "/presell/buildu8so",
    method: "post",
    data
  });
}

export function delPreSell(data) {
  return request({
    url: "/presell/delPreSell",
    method: "post",
    data
  });
}

export function GetPreviewData(data){
  return request({
    url: "/presell/GetPreviewData",
    method: "post",
    data
  });
}
