# Spaz's fastGuid
Blazingly fast UUIDs in Node.js.

## Install
`npm install spazmodius/fastGuid`

## Usage
```
const fastGuid = require('@spazmodius/fastGuid')

console.log(fastGuid())       // 21004214-9c2d-4730-813b-fbe35848fc00
console.log(fastGuid('D'))    // 21004214-9c2d-4730-813b-fbe35848fc01
console.log(fastGuid('N'))    // 210042149c2d4730813bfbe35848fc02
console.log(fastGuid('B'))    // {21004214-9c2d-4730-813b-fbe35848fc03}

// or
console.log(fastGuid.D())     // 21004214-9c2d-4730-813b-fbe35848fc04
console.log(fastGuid.N())     // 210042149c2d4730813bfbe35848fc05
console.log(fastGuid.B())     // {21004214-9c2d-4730-813b-fbe35848fc06}
```

## Note
This UUID generator is freakishly fast, and generates _unique_ UUIDs, in conformance with [RFC 4122](https://tools.ietf.org/html/rfc4122).  But it __does not__ generate _unguessable_ UUIDs.  In particulary, sequences of 256 UUIDs
will differ only in the last byte.  So if you've generated one, it's pretty easy to guess the next one.

However, you [should not be using UUIDs for unguessable secrets](https://tools.ietf.org/html/rfc4122#section-6) anyway; that is explicitly not one of their
properties.  They are intended to be unique, not unguessable; please use a cryptographically random source if you need secrets.
