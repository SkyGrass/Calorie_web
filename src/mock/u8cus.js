const u8CusList = {
    items: [
        {
            "ccuscode": "0204155",
            "ccusname": "0204155绍兴市新昌县南明街道办事处"
        },
        {
            "ccuscode": "0401001",
            "ccusname": "REX POLYEXTRUSION LTD"
        },
        {
            "ccuscode": "0401002",
            "ccusname": "SEIKI AUTO INDIA PVT LTED"
        },
        {
            "ccuscode": "0401003",
            "ccusname": "KIRAN INFRA TECH"
        },
        {
            "ccuscode": "0403001",
            "ccusname": "EGYPTIAN GERMAN FOR CONSTRUCTION INDUSTRIES SAE"
        },
        {
            "ccuscode": "0406001",
            "ccusname": "SPECIALIZED CO FOR PLASTIC INDUSTRIES"
        }
    ],
    total: 6
}


export default {
    getAllU8CusList: (config) => {
        const { body } = config
        return u8CusList
    },

    //根据经销商编码返回与其绑定的客户列表
    getU8CusListFromTrader: (config) => {
        const { body } = config;
        return u8CusList;
    }
}