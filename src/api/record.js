import request from "@/utils/request";

export function fetchRecord(data) {
  return request({
    url: "/record/getrecord",
    method: "get",
    params: data
  });
}

export function fetchMealList(data) {
  return request({
    url: "/record/getmealrecord",
    method: "get",
    params: data
  });
}

export function fetchFavMealList(data) {
  return request({
    url: "/record/getfavMeal",
    method: "get",
    params: data
  });
}
