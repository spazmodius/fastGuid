# fastGuid
A very fast generator of RFC4122 version 4 UUIDs in Node

## Usage
```
var fastGuid = require('@spazmodius/fastGuid')

console.log(fastGuid())       // 056548da-d1ba-49aa-a181-d5d6f29a7300
console.log(fastGuid('D'))    // 056548da-d1ba-49aa-a181-d5d6f29a7301
console.log(fastGuid('N'))    // a1d40e3af9a84ec8bf9afa746f2e0200
console.log(fastGuid('B'))    // {f908f12a-28bc-4a80-961f-62226b4d0f00}

// or
console.log(fastGuid.D())     // 056548da-d1ba-49aa-a181-d5d6f29a7302
console.log(fastGuid.N())     // a1d40e3af9a84ec8bf9afa746f2e0201
console.log(fastGuid.B())     // {f908f12a-28bc-4a80-961f-62226b4d0f01}
```

## Note
This UUID generator is freakishly fast, and generates _unique_ UUIDs, in conformance with the [RFC](https://tools.ietf.org/html/rfc4122).  But it __does not__ generate _unguessable_ UUIDs.  In particulary, sequences of 256 UUIDs
will differ only in the last byte.  So if you've generated one, it's pretty easy to guess the next one.

However, you [should not be using UUIDs for unguessable secrets](https://tools.ietf.org/html/rfc4122#section-6) anyway; that is explicitly not one of their
properties.  They are intended to be unique, not unguessable; please use a cryptographically random source if you need secrets.
