
// todo: worst function ever
function getBrightness (x, y, width, height, data, bytesPerPixel, contrastFactor, options) {
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

  return options.invert ? brightness : 1 - brightness
}

const blocks = ' ▘▝▀▖▌▞▛▗▚▐▜▄▙▟█'.split('')

function getUnicodeCharacter (dots) {
  var charCode = 0
  for (var i = 0; i < 4; i++) {
    charCode |= dots[i] << i
  }

  return blocks[charCode]
  // return String.fromCharCode(charCode)
}

module.exports = function imageToBlocks (imageData, options) {
  var width = imageData.width
  var height = imageData.height
  var data = imageData.data
  var bytesPerPixel = imageData.format === 'RGB24' ? 3 : 4

  // calculate contrast factor
  // http://www.dfstudios.co.uk/articles/image-processing-algorithms-part-5/
  var contrastFactor = (259 * (options.contrast + 255)) / (255 * (259 - options.contrast))

  var ascii = ''

  // todo : braille style
  for (var y = 0; y < height; y += 2 + 2) {
    for (var x = 0; x < width; x += 2) {
      var c = (x, y) => Math.round(getBrightness(x, y, width, height, data, bytesPerPixel, contrastFactor, options))

      // unicode block elements
      var blockElement = [
        c(x, y + 0), c(x + 1, y + 0),
        c(x, y + 1 + 1), c(x + 1, y + 1 + 1)
      ]

      ascii += getUnicodeCharacter(blockElement)
    }

    ascii += '\n'
  }

  return ascii
}

function clamp (value, min, max) {
  return Math.min(Math.max(value, min), max)
}
