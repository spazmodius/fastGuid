'use strict'
const { randomBytes } = require('crypto')

module.exports = function(size) {
	let reserve = null
	fillReserve()

	function fillReserve() {
		randomBytes(size, onReserve)
	}

	function onReserve(err, buf) {
		if (err) throw err
		reserve = buf
	}

	function randomBuffer() {
		if (reserve === null)
			return randomBytes(size)
		else
			return takeReserve()
	}

	function takeReserve() {
		const buf = reserve
		reserve = null
		fillReserve()
		return buf
	}

	return randomBuffer
}
