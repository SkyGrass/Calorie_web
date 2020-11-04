export function returnStatus(status) {
    let desctription = `未审批`
    switch (status) {
        case 0:
            desctription = `未审批`
            break;
        case 1:
            desctription = `审批`
            break;
        case 2:
            desctription = `生单`
            break;
        case 3:
            desctription = `关闭`
            break;
        default:
            desctription = `未定义`
            break;
    }
    return desctription;
}

// export function returnBillType(role) {
//     let type = 1
//     switch (role) {
//         case 0:
//             desctription = `未审批`
//             break;
//         case 1:
//             desctription = `审批`
//             break;
//         case 2:
//             desctription = `生单`
//             break;
//         case 3:
//             desctription = `关闭`
//             break;
//         default:
//             desctription = `未定义`
//             break;
//     }
// }