
const uuid_v4 = require('uuid').v4
const uuid = () => uuid_v4()

const _fastguid = require('./fastGuid')

const fastguid = () => _fastguid()
const fastguid_D = () => _fastguid.D()
const fastguid_N = () => _fastguid.N()
const fastguid_B = () => _fastguid.B()

exports.compare = {
	uuid,
	fastguid,
	fastguid_D,
	fastguid_N,
	fastguid_B,
}
require("bench").runMain()