import request from "@/utils/request";

export function fetchU8StList(data) {
  return request({
    url: "/u8st/getallu8stlist",
    method: "post",
    data
  });
}