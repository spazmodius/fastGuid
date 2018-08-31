'use strict'
const { randomBytes } = require('crypto')
const flatstr = require('flatstr')

const hex = new Array(256)
for (let i = 0; i <= 0xf; ++i)
	hex[i] = '0' + i.toString(16)
for (let i = 0x10; i <= 0xff; ++i)
	hex[i] = i.toString(16)


function v4_15() {
	const buf = randomBytes(15)
	buf[6] = (buf[6] & 0x0F) | 0x40
	buf[8] = (buf[8] & 0x3F) | 0x80
	return buf.toString('hex')
}

function addDashes(hex) {
	return  flatstr(hex.slice(0, 8) + '-' + hex.slice(8, 12) + '-' + hex.slice(12, 16) + '-' + hex.slice(16, 20) + '-' + hex.slice(20))
}

function surroundWithBraces(dashed) {
	return '{' + dashed + '}'
}

let hex15, dashed15 = null, lowByte = 255

function next() {
	if (++lowByte === 256) {
		hex15 = v4_15()
		dashed15 = null
		// dashed15 = addDashes(hex15)
		lowByte = 0
	}
}

function N() {
	next()
	return hex15 + hex[lowByte]
}

function D() {
	next()
	if (dashed15 === null)
		dashed15 = addDashes(hex15)
	return dashed15 + hex[lowByte]
}

function B() {
	return surroundWithBraces(D())
}

function fastGuid(formatSpecifier) {
	const generate = fastGuid[formatSpecifier || 'D']
	if (!generate)
		throw new RangeError("Invalid format specifier")
	return generate()
}

fastGuid.D = D
fastGuid.N = N
fastGuid.B = B

module.exports = fastGuid
