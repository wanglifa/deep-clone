class DeepCloner {
    constructor () {
        this.cache = []
    }
    clone(source) {
        if (source instanceof Object) {
            let cacheDist = this.findCache(source)
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
                } else if (source instanceof RegExp) {
                    deepObj = new RegExp(source.source, source.flags)
                } else if (source instanceof Date) {
                    deepObj = new Date(source)
                } else {
                    deepObj = new Object()
                }
                this.cache.push([source, deepObj])
                for (let key in source) {
                    if (source.hasOwnProperty(key)) {
                        // 对对象里的每一项进行深拷贝并把这一项赋值给新的对象
                        deepObj[key] = this.clone(source[key])
                    }
                }
                return deepObj
            }
        }
        return source
    }
    findCache(source) {
        for (let i = 0; i < this.cache.length; i++) {
            if (this.cache[i][0] === source) {
                return this.cache[i][1]
            }
        }
        return undefined
    }
}

module.exports =  DeepCloner