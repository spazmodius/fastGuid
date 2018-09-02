'use strict'

const hex = new Array(256)
for (let i = 0; i <= 0xf; ++i)
	hex[i] = '0' + i.toString(16)
for (let i = 0x10; i <= 0xff; ++i)
	hex[i] = i.toString(16)

module.exports = hex