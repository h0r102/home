function sort(json) {

    // ソートする
    const sorted = Object.entries(json).sort();

    // valueを調べ、objectならsorted entriesに変換する
    for (let i in sorted) {
        const val = sorted[i][1];
        if (typeof val === "object") {
            sorted[i][1] = objectSort(val);
        }
    }

    return sorted;
}

function isEqual(json1, json2) {
    const stringifyJson1 = JSON.stringify(objectSort(json1))
    const stringifyJson2 = JSON.stringify(objectSort(json2))
    return stringifyJson1 === stringifyJson2
}

module.exports = {
    sort,
    isEqual
}