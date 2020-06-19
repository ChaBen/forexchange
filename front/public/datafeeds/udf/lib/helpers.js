export function getPrecision(val) {
    var res = ("" + +val).split('.');
    return res.length !== 2 ? 0 : res[1].length;
}
