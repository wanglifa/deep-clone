const chai = require('chai')
const sinon = require('sinon')
const sinonChai = require('sinon-chai')
chai.use(sinonChai)
const assert = chai.assert
const DeepCloner = require('../src/index')
describe('DeepCloner', () => {
    it('是一个类', () => {
        assert.isFunction(DeepCloner)
    })
    it('可以复制基本类型', () => {
        const n = 123
        const n2 = new DeepCloner().clone(n)
        assert(n ===n2)
        const b = '123456'
        const b2 = new DeepCloner().clone(b)
        assert(b === b2)
        const c = undefined
        const c2 = new DeepCloner().clone(c)
        assert(c === c2)
        const d = null
        const d2 = new DeepCloner().clone(d)
        assert(d === d2)
        const e = true
        const e2 = new DeepCloner().clone(e)
        assert(e === e2)
        const f = Symbol()
        const f2 = new DeepCloner().clone(f)
        assert(f === f2)
    })
    it('可以复制普通对象', () => {
        const a = { name: '立发', child: { name: '小立发'}}
        const a2 = new DeepCloner().clone(a)
        assert(a !== a2)
        assert(a.name === a2.name)
        assert(a.child !== a2.child)
        assert(a.child.name === a2.child.name)
    })
    it('可以复制数组对象', () => {
        const a = [[1, 2], [4, 5], [6, 7]]
        const a2 = new DeepCloner().clone(a)
        assert(a !== a2)
        assert(a[0] !== a2[0])
        assert(a[1] !== a2[1])
        assert(a[2] !== a2[2])
        assert.deepEqual(a, a2)
    })
    it('可以复制函数', () => {
        const a = function(x, y) {
            return x + y
        }
        a.xxx = { yyy: { zzz: 1 } }
        const a2 = new DeepCloner().clone(a)
        assert(a !== a2)
        assert(a.xxx.yyy.zzz === a2.xxx.yyy.zzz)
        assert(a.xxx.yyy !== a2.xxx.yyy)
        assert(a.xxx !== a2.xxx)
        assert(a(1,2) === a2(1,2))
    })
    it('环也能复制', () => {
        const a = { name: '立发'}
        a.self = a
        const a2 = new DeepCloner().clone(a)
        assert(a !== a2)
        assert(a.name === a2.name)
        assert(a.self !== a2.self)
    })
    it('可以复制正则表达式', () => {
        const a = new RegExp("hi\\d+", 'gi')
        a.xxx = { yyy: { zzz: 1} }
        const a2 = new DeepCloner().clone(a)
        assert(a.source === a2.source)
        assert(a.flags === a2.flags)
        assert(a !== a2)
        assert(a.xxx.yyy.zzz === a2.xxx.yyy.zzz)
        assert(a.xxx.yyy !== a2.xxx.yyy)
        assert(a.xxx !== a2.xxx)
    })
    it('可以复制日期', () => {
        const a = new Date()
        a.xxx = { yyy: { zzz: 1} }
        const a2 = new DeepCloner().clone(a)
        assert(a.getTime() === a2.getTime())
        assert(a !== a2)
        assert(a.xxx.yyy.zzz === a2.xxx.yyy.zzz)
        assert(a.xxx.yyy !== a2.xxx.yyy)
        assert(a.xxx !== a2.xxx)
    })
    it('自行跳过原型属性', () => {
        const a = Object.create( { name: 'lifa' })
        a.xxx = { yyy: { zzz: 1} }
        const a2 = new DeepCloner().clone(a)
        //a2上没有name属性
        assert.isFalse('name' in a2)
        assert(a !== a2)
        assert(a.xxx.yyy.zzz === a2.xxx.yyy.zzz)
        assert(a.xxx.yyy !== a2.xxx.yyy)
        assert(a.xxx !== a2.xxx)
    })
})