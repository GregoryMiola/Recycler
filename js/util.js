function random(max) {
  return Math.floor(Math.random() * max)
}

function novaImagem(src) {
  img = new Image()
  img.src = src
  return img
}