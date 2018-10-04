# ascii-pixels

[![npm](https://img.shields.io/npm/v/ascii-pixels.svg)](https://npm.im/ascii-pixels)
![downloads](https://img.shields.io/npm/dt/ascii-pixels.svg)
[![license](https://img.shields.io/:license-MIT-blue.svg)](https://mvr.mit-license.org)


Convert raw image data to ascii art!

## install

```shell
$ npm install ascii-pixels
```

## usage

input raw image data, and optionally set contrast or invert colors

```js
var options = {
  contrast: 128,    // range -255 to +255
  invert: true      // invert brightness
}

var ascii = asciiPixels(imageData, options)
```

The raw image data has the following format:

```js
var imageData = {
  data: frameData,
  width: width,
  height: height
}
```
You may optionally provide the pixel format: `imageData.format = 'RGB24'`, by default it is `RGB32`.

## examples

Any format is supported as long as you can get the raw image data.
Here are a few examples:

### node using jpeg-js

```js
var fs = require('fs')
var jpeg = require('jpeg-js')
var asciiPixels = require('ascii-pixels')

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

## sample output
```
                                        C,                                      
                                        8@@@                                    
                                        0@@@                                    
                                        0@@@                                    
     @@             .::.             CG 8@@@         G8              ...        
 t@@@@@@@@1      .:::::::;.       @@@@@@@@@@     ,@@@@@@@@;      .        .     
@@@@@ff@@@@@    ::::;;::;:::    @@@@@0G@@@@@    @@@@@GG@@@@@    .     ..,       
@@@@    @@@@    ::::;;:;;;::    0@@@    8@@@    8@@@ ,, @@,     .     ...       
@@@@    @@@@    :::;;;;;;;::    8@@@t  ;@@@@    8@@@L           .   ...  ,      
@@@,    :@@@     ,:::;;:::,.    i@@@@@@@@@@f    ,@@@@@@8         . .      ..    
                    ,,,:           .@@@@;           8@@@            .  ,        
```

## credit

This project is based on the awesome [ascii-camera](https://github.com/idevelop/ascii-camera)
by [Andrei Gheorghe](https://github.com/idevelop)

## license

MIT
