
const hex = new Array(256)
for (let i = 0xff; i >= 0x10; --i)
	hex[i] = i.toString(16)
for (let i = 0xf; i >= 0; --i)
	hex[i] = '0' + i.toString(16)

const crypto = require('crypto')
const random_15 = () => crypto.randomBytes(15)

function v4_15() {
	const buf = random_15()
	buf[6] = (buf[6] & 0x0F) | 0x40
	buf[8] = (buf[8] & 0x3F) | 0x80
	return buf
}

function format(buf, leftBrace, sep) {
	return  leftBrace + hex[buf[0]] + hex[buf[1]] + hex[buf[2]] + hex[buf[3]] + sep +
		hex[buf[4]] + hex[buf[5]] + sep +
		hex[buf[6]] + hex[buf[7]] + sep +
		hex[buf[8]] + hex[buf[9]] + sep +
		hex[buf[10]] + hex[buf[11]] + hex[buf[12]] + hex[buf[13]] + hex[buf[14]]
}

function generator(sep, braces) {
	const leftBrace = braces && braces.charAt(0) || '' , rightBrace = braces && braces.charAt(1) || ''
	let formatted15, i = 255
	return function() {
		if (++i >= 256) {
			formatted15 = format( v4_15(), leftBrace, sep )
			i = 0
		}
		return formatted15 + hex[i] + rightBrace
	}
}

function fastGuid(formatSpecifier) {
	const generate = fastGuid[formatSpecifier || 'D']
	if (!generate)
		throw new RangeError("Invalid format specifier")
	return generate()
}

fastGuid.D = generator('-')
fastGuid.N = generator('')
fastGuid.B = generator('-', '{}')

module.exports = fastGuid
