export default {
    getPreSellBillNo: () => {
        const current = new Date();
        return {
            billNo: `${current.getFullYear()}${(current.getMonth() + 1) <= 9 ? '0' + (current.getMonth() + 1) : (current.getMonth() + 1)}${current.getDate() <= 9 ? '0' + current.getDate() : current.getDate()}${current.getHours()}${current.getMinutes()}${current.getSeconds()}`,
            date: current
        }
    }
}