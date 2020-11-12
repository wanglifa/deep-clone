let cache = []
function deepClone(source) {
    if (source instanceof Object) {
        let cacheDist = findCache(source)
        if (cacheDist) {
            return cacheDist
        } else {
            let deepObj
            if (source instanceof Array) {
                deepObj = new Array()
            } else if (source instanceof Function) {
                deepObj = function() {
                    return source.apply(this, arguments)
                }
            } else {
                deepObj = new Object()
            }
            cache.push([source, deepObj])
            for (let key in source) {
                // 对对象里的每一项进行深拷贝并把这一项赋值给新的对象
                deepObj[key] = deepClone(source[key])
            }
            return deepObj
        }
    }
    return source
}
function findCache(source) {
    for (let i = 0; i < cache.length; i++) {
        if (cache[i][0] === source) {
            return cache[i][1]
        }
    }
    return undefined
}
module.exports =  deepClone