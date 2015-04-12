
module.exports = (function() {
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
	
	function formatWith(sep, buf) {
		return  hex[buf[0]] + hex[buf[1]] + hex[buf[2]] + hex[buf[3]] + sep +
			hex[buf[4]] + hex[buf[5]] + sep +
			hex[buf[6]] + hex[buf[7]] + sep +
			hex[buf[8]] + hex[buf[9]] + sep +
			hex[buf[10]] + hex[buf[11]] + hex[buf[12]] + hex[buf[13]] + hex[buf[14]]
	}
	
	function surroundWith(braces, text) {
		return braces? braces[0] + text + braces[1]: text
	}
	
	function generator(sep, braces) {
		var format = formatWith.bind(null, sep || '')
		var surround = surroundWith.bind(null, braces)
		var formatted15, i = 255
		return function() {
			if (++i >= 256) {
				formatted15 = format( v4_15() )
				i = 0
			}
			return surround(formatted15 + hex[i])
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
	
	return fastGuid
})()