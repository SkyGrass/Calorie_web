const invList = {
  items: [
    {
      cinvccode: "0510504",
      cinvcode: "051100406046",
      cinvname: "沉泥室四通井座ID1000xID1000",
      cinvstd: null,
      ccomunitcode: "102",
      ccomunitname: "个",
      ivolume: "5.3431",
      fminquantity: 0.1,
      iuprice: 15,
      iinvnowcost: 1
    },
    {
      cinvccode: "0510504",
      cinvcode: "051100406047",
      cinvname: "沉泥室四通井座ID1000xID1000",
      cinvstd: null,
      ccomunitcode: "102",
      ccomunitname: "个",
      ivolume: "5.3431",
      fminquantity: 0.1,
      iuprice: 2.99,
      iinvnowcost: 1
    },
    {
      cinvccode: "0510504",
      cinvcode: "051100406048",
      cinvname: "沉泥室四通井座ID1000xID1000",
      cinvstd: null,
      ccomunitcode: "102",
      ccomunitname: "个",
      ivolume: "5.3431",
      fminquantity: 0.1,
      iuprice: 3.99,
      iinvnowcost: 1
    },
    {
      cinvccode: "0510504",
      cinvcode: "051100406049",
      cinvname: "沉泥室四通井座ID1000xID1000",
      cinvstd: null,
      ccomunitcode: "102",
      ccomunitname: "个",
      ivolume: "5.3431",
      fminquantity: 0.1,
      iuprice: 4.99,
      iinvnowcost: 1
    },
    {
      cinvccode: "0510504",
      cinvcode: "051100406050",
      cinvname: "沉泥室四通井座ID1000xID1000",
      cinvstd: null,
      ccomunitcode: "102",
      ccomunitname: "个",
      ivolume: "5.3431",
      fminquantity: 0.1,
      iuprice: 5.99,
      iinvnowcost: 1
    },
    {
      cinvccode: "0510504",
      cinvcode: "051100406051",
      cinvname: "沉泥室四通井座ID1000xID1000",
      cinvstd: null,
      ccomunitcode: "102",
      ccomunitname: "个",
      ivolume: "5.3431",
      fminquantity: 0.1,
      iuprice: 6.99,
      iinvnowcost: 1
    },
    {
      cinvccode: "0510504",
      cinvcode: "051100406052",
      cinvname: "沉泥室四通井座ID1000xID1000",
      cinvstd: null,
      ccomunitcode: "102",
      ccomunitname: "个",
      ivolume: "5.3431",
      fminquantity: 0.1,
      iuprice: 7.99,
      iinvnowcost: 1
    }
  ],
  total: 5
};

const cusInvList = {
  items: [
    {
      ccuscode: "0220001",
      cinvcode: "042020503",
      iinvnowcost: "1215.00000000"
    }
  ],
  total: 1
};

export default {
  getInvtList: () => {
    return invList;
  },
  getCusInvtList: config => {
    const { body } = config;
    return 10.0;
  }
};
