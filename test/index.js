const chai = require('chai')
const sinon = require('sinon')
const sinonChai = require('sinon-chai')
const deepCLone = require('../src/index')
chai.use(sinonChai)
const assert = chai.assert
const deepClone = require('../src/index')
describe('deepClone', () => {
    it('是一个函数', () => {
        assert.isFunction(deepCLone)
    })
})