// Based on the awesome https://github.com/idevelop/ascii-camera by Andrei Gheorghe

var characterList = ' .,:;i1tfLCG08@'.split('')

function imageToAscii (imageData, options) {
  var width = imageData.width
  var height = imageData.height
  var data = imageData.data

  var characters = ''

  // calculate contrast factor
  // http://www.dfstudios.co.uk/articles/image-processing-algorithms-part-5/
  var contrastFactor = (259 * (options.contrast + 255)) / (255 * (259 - options.contrast))

  for (var y = 0; y < height; y += 2) {
    for (var x = 0; x < width; x++) {
      // pixel color at offset
      var offset = (y * width + x) * 4
      
      var red = data[offset]
      var green = data[offset + 1]
      var blue = data[offset + 2]

      // increase the contrast of the image
      red = clamp(contrastFactor * (red - 128) + 128, 0, 255)
      green = clamp(contrastFactor * (green - 128) + 128,0, 255)
      blue = clamp(contrastFactor * (blue - 128) + 128, 0, 255)

      // calculate pixel brightness
      // http://stackoverflow.com/questions/596216/formula-to-determine-brightness-of-rgb-color    
      var brightness = (0.299 * red + 0.587 * green + 0.114 * blue) / 255

      if (!options.invert) brightness = 1 - brightness

      characters += characterList[Math.round(brightness * (characterList.length - 1))]
    }

    characters += '\n'
  }

  return characters
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
