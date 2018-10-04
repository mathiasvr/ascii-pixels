// Based on the awesome https://github.com/idevelop/ascii-camera by Andrei Gheorghe

var characters = ' .,:;i1tfLCG08@'.split('')

// var chalk = require('chalk')
// console.log('lvl', chalk.level)
// chalk.level = 1
// const ctx = new chalk.constructor({level: 0}); // todo
const style = require('ansi-styles')

function getBrightness (r, g, b) {
  // calculate pixel brightness
  // http://stackoverflow.com/questions/596216/formula-to-determine-brightness-of-rgb-color
  var brightness = (0.299 * r + 0.587 * g + 0.114 * b) / 255
  return brightness
}

function prepare (imageData, options) {
  var width = imageData.width
  var height = imageData.height
  // var data = imageData.data // todo: data not yet 'important'
  var bytesPerPixel = imageData.format === 'RGB24' ? 3 : 4

  // calculate contrast factor
  // http://www.dfstudios.co.uk/articles/image-processing-algorithms-part-5/
  var contrastFactor = (259 * (options.contrast + 255)) / (255 * (259 - options.contrast))

  var getColor = function (x, y, bitmap) {
    var offset = (y * width + x) * bytesPerPixel

    // pixel color at offset
    var r = bitmap[offset]
    var g = bitmap[offset + 1]
    var b = bitmap[offset + 2]

    // increase the contrast of the image
    r = clamp(contrastFactor * (r - 128) + 128, 0, 255)
    g = clamp(contrastFactor * (g - 128) + 128, 0, 255)
    b = clamp(contrastFactor * (b - 128) + 128, 0, 255)

    return [r, g, b]
  }

  return function (bitmap) {
    var ascii = ''
    var lastColor = ''

    // skip every second row, because ascii characters are not squares
    for (var y = 0; y < height; y += 2) {
      for (var x = 0; x < width; x++) {
        var [r, g, b] = getColor(x, y, bitmap)

        var brightness = getBrightness(r, g, b)
        if (!options.invert) brightness = 1 - brightness // todo: move to getBr

        // console.log(style.color.ansi.rgb(120, 80, 72) + 'Hello world!' + style.bgColor.close);

        // ascii += chalk.rgb(r, g, b)(characters[Math.round(brightness * (characters.length - 1))])
        // ascii += chalk.rgb(r, g, b)('@')
        var color = style.color.ansi.rgb(r, g, b)
        if (color !== lastColor) {
          ascii += color
          lastColor = color
        }
        // ascii += col === lastc ? '@' : col + '@'
        // ascii += style.color.ansi256.rgb(r, g, b) + '@'

        ascii += characters[Math.round(brightness * (characters.length - 1))]
        // ascii += '@'
      }

      ascii += '\n'
    }

    return ascii + style.color.close
  }
}

function imageToAscii (imageData, options) {
  var width = imageData.width
  var height = imageData.height
  var data = imageData.data
  var bytesPerPixel = imageData.format === 'RGB24' ? 3 : 4

  // calculate contrast factor
  // http://www.dfstudios.co.uk/articles/image-processing-algorithms-part-5/
  var contrastFactor = (259 * (options.contrast + 255)) / (255 * (259 - options.contrast))

  var ascii = ''
  var lastColor = ''

  // skip every second row, because ascii characters are not squares
  for (var y = 0; y < height; y += 2) {
    for (var x = 0; x < width; x++) {
      var offset = (y * width + x) * bytesPerPixel

      // pixel color at offset
      var r = data[offset]
      var g = data[offset + 1]
      var b = data[offset + 2]

      // increase the contrast of the image
      r = clamp(contrastFactor * (r - 128) + 128, 0, 255)
      g = clamp(contrastFactor * (g - 128) + 128, 0, 255)
      b = clamp(contrastFactor * (b - 128) + 128, 0, 255)

      // calculate pixel brightness
      // http://stackoverflow.com/questions/596216/formula-to-determine-brightness-of-rgb-color
      var brightness = (0.299 * r + 0.587 * g + 0.114 * b) / 255

      if (!options.invert) brightness = 1 - brightness

      // console.log(style.color.ansi.rgb(120, 80, 72) + 'Hello world!' + style.bgColor.close);

      // ascii += chalk.rgb(r, g, b)(characters[Math.round(brightness * (characters.length - 1))])
      // ascii += chalk.rgb(r, g, b)('@')
      var color = style.color.ansi.rgb(r, g, b)
      if (color !== lastColor) {
        ascii += color
        lastColor = color
      }
      // ascii += col === lastc ? '@' : col + '@'
      // ascii += style.color.ansi256.rgb(r, g, b) + '@'

      ascii += characters[Math.round(brightness * (characters.length - 1))]
      // ascii += '@'
    }

    ascii += '\n'
  }

  return ascii + style.color.close
}

function clamp (value, min, max) {
  return Math.min(Math.max(value, min), max)
}

module.exports = imageToAscii
