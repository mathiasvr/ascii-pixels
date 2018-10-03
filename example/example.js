var asciiPixels = require('..')

var filePath = require('path').join(__dirname, 'lena.jpg')
// var filePath = 'todo/scarlett.jpg' // todo

var buffer = require('fs').readFileSync(filePath)
var imageData = require('jpeg-js').decode(buffer)

var opts = { invert: true, contrast: 90 }

var ascii = asciiPixels(imageData, opts)
console.log(ascii)

var braille = asciiPixels.braille(imageData, opts)
console.log(braille)

var blocks = asciiPixels.blocks(imageData, opts)
console.log(blocks)
