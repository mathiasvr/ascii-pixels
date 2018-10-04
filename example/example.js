var chalk = require('chalk')
var asciiPixels = require('..')

var filePath = require('path').join(__dirname, 'lena.jpg')
// var filePath = 'todo/scarlett.jpg' // todo

var buffer = require('fs').readFileSync(filePath)
var imageData = require('jpeg-js').decode(buffer)

var opts = { invert: true, contrast: 90 }

var ascii = asciiPixels.color(imageData, opts)

// ascii = chalk.rgb(255, 136, 0)(ascii)
// ascii = chalk.rgb(255, 136, 0).bold(ascii)
// ascii = chalk.bold(ascii)

console.log(ascii)

const fs = require('fs')
fs.writeFileSync('teststuff3.txt', ascii)

// var braille = asciiPixels.braille(imageData, opts)
// console.log(braille)

// var blocks = asciiPixels.blocks(imageData, opts)
// console.log(blocks)
