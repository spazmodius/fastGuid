'use strict'
const flatstr = require('flatstr')
const BUFFERSIZE = 150
const randomBuffer = require('./random')(BUFFERSIZE)
const hex = require('./hex')

let buffer = null, index = BUFFERSIZE

function v4_15() {
	if (index >= BUFFERSIZE) {
		buffer = randomBuffer()
		index = 0
	}
	buffer[index + 6] = (buffer[index + 6] & 0x0F) | 0x40
	buffer[index + 8] = (buffer[index + 8] & 0x3F) | 0x80
	return buffer.toString('hex', index, index += 15)
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
