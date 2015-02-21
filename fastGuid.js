
module.exports = (function() {
	var i, partial15
	
	var hex = []
	for (i = 0; i < 256; ++i) {
	  hex[i] = (i > 0xF ? '' : '0') + i.toString(16)
	}

	function format15(buf) {
		return  hex[buf[0]] + hex[buf[1]] + hex[buf[2]] + hex[buf[3]] + '-' +
			hex[buf[4]] + hex[buf[5]] + '-' +
			hex[(buf[6] & 0x0F) | 0x40] + hex[buf[7]] + '-' +
			hex[(buf[8] & 0x3F) | 0x80] + hex[buf[9]] + '-' +
			hex[buf[10]] + hex[buf[11]] + hex[buf[12]] + hex[buf[13]] + hex[buf[14]]
	}
  
	var random15 = require('crypto').randomBytes.bind(null, 15)
	
	return function fastGuid(){
		if (++i >= 256) {
			partial15 = format15( random15() )
			i = 0
		}
		return partial15 + hex[i]
	}
})()