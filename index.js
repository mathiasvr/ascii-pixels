// Based on the awesome https://github.com/idevelop/ascii-camera by Andrei Gheorghe

var characters = ' .,:;i1tfLCG08@'.split('')

function imageToAscii (imageData, options) {
  var width = imageData.width
  var height = imageData.height
  var data = imageData.data

  // calculate contrast factor
  // http://www.dfstudios.co.uk/articles/image-processing-algorithms-part-5/
  var contrastFactor = (259 * (options.contrast + 255)) / (255 * (259 - options.contrast))

  var ascii = ''

  for (var y = 0; y < height; y += 2) {
    for (var x = 0; x < width; x++) {
      var offset = (y * width + x) * 4

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

      ascii += characters[Math.round(brightness * (characters.length - 1))]
    }

    ascii += '\n'
  }

  return ascii
}

function clamp (value, min, max) {
  return Math.min(Math.max(value, min), max)
}

module.exports = function (imageData, options) {
  if (!options) options = { }
  if (typeof options.contrast === 'undefined') options.contrast = 128
  if (typeof options.invert === 'undefined') options.invert = false

  return imageToAscii(imageData, options)
}
