function deepClone(source) {
    if (source instanceof Object) {
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
    
        for (let key in source) {
            // 对对象里的每一项进行深拷贝并把这一项赋值给新的对象
            deepObj[key] = deepClone(source[key])
        }
        return deepObj
    }
    return source
}
module.exports =  deepClone