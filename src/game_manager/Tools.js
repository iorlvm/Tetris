class Tools {
    static arrayDeepCopy(array) {
        let res = [];
        for (let i = 0; i < array.length; i++) {
            if (Array.isArray(array[i])) {
                res.push(Tools.arrayDeepCopy(array[i]));
            } else {
                res.push(array[i]);
            }
        }
        return res;
    }
}

export { Tools };