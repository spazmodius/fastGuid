
var hex = (function() {
	var hex = []
	for (var i = 0; i < 256; ++i) {
		hex[i] = (i > 0xF ? '' : '0') + i.toString(16)
	}
	return hex
})()

var random_15 = require('crypto').randomBytes.bind(null, 15)

function v4_15() {
	var buf = random_15()
	buf[6] = (buf[6] & 0x0F) | 0x40
	buf[8] = (buf[8] & 0x3F) | 0x80
	return buf
}

function generator(sep, braces) {
	var leftBrace = braces && braces.charAt(0) || '' , rightBrace = braces && braces.charAt(1) || ''

	function format(buf) {
		return  leftBrace + hex[buf[0]] + hex[buf[1]] + hex[buf[2]] + hex[buf[3]] + sep +
			hex[buf[4]] + hex[buf[5]] + sep +
			hex[buf[6]] + hex[buf[7]] + sep +
			hex[buf[8]] + hex[buf[9]] + sep +
			hex[buf[10]] + hex[buf[11]] + hex[buf[12]] + hex[buf[13]] + hex[buf[14]]
	}

	var formatted15, i = 255
	return function() {
		if (++i >= 256) {
			formatted15 = format( v4_15() )
			i = 0
		}
		return formatted15 + hex[i] + rightBrace
	}
}

function fastGuid(formatSpecifier) {
	var generate = fastGuid[formatSpecifier || 'D']
	if (!generate)
		throw new RangeError("Invalid format specifier")
	return generate()
}

fastGuid.D = generator('-')
fastGuid.N = generator('')
fastGuid.B = generator('-', '{}')

module.exports = fastGuid
