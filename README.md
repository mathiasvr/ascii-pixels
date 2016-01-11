# Ascii Pixels [![npm][npm-image]][npm-url]

[npm-image]: https://img.shields.io/npm/v/ascii-pixels.svg
[npm-url]: https://www.npmjs.com/package/ascii-pixels

Convert raw image data to ascii art!

## install

```
npm install ascii-pixels
```

## usage

input raw image data, and optionally set contrast or invert colors

```js
var options = { contrast: 128, invert: true }

var ascii = asciiPixels(imageData, options)
```

## examples

Any format is supported as long as you can get the raw image data.
Here are a few examples:

### node using jpeg-js

```js
var fs = require('fs')
var jpeg = require('jpeg-js')
var asciiPixels = require('.')

var buffer = fs.readFileSync('image.jpg')

var imageData = jpeg.decode(buffer)

var ascii = asciiPixels(imageData)
console.log(ascii)
```

### browser using canvas

```js
var asciiPixels = require('ascii-pixels')

var img = new Image()

img.onload = function () {
  var canvas = document.createElement('canvas')
  canvas.width = img.width
  canvas.height = img.height

  var context = canvas.getContext('2d')
  context.drawImage(img, 0, 0, img.width, img.height)

  var imageData = context.getImageData(0, 0, canvas.width, canvas.height)

  var ascii = asciiPixels(imageData)
  console.log(ascii)
}

img.src = './nodejs-logo.png'
```

### node using canvas

```js
var fs = require('fs')
var Canvas = require('canvas')
var asciiPixels = require('ascii-pixels')

var img = new Canvas.Image
img.src = fs.readFileSync('nodejs-logo.png')

var canvas = new Canvas(img.width, img.height)
var context = canvas.getContext('2d')

context.drawImage(img, 0, 0, img.width, img.height)

var imageData = context.getImageData(0, 0, canvas.width, canvas.height)

var ascii = asciiPixels(imageData)

console.log(ascii)
```

## license

MIT