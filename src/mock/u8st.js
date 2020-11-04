const u8StList = {
    items: [
        {
            "cstcode": "01",
            "cstname": "正常合同销售"
        },
        {
            "cstcode": "02",
            "cstname": "项目特价销售"
        },
        {
            "cstcode": "03",
            "cstname": "促销销售"
        },
        {
            "cstcode": "04",
            "cstname": "退货销售"
        }
    ],
    total: 4
}


export default {
    getAllU8StList: () => {
        return u8StList
    }
}