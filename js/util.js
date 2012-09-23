function random(max) {
  return Math.floor(Math.random() * max)
}

var lixos = new Imagens({ seco: "images/seco.png", organico: "images/organico.png" })
var lixeiras = new Imagens({ seco: "images/reciclavel.png", organico: "images/organica.png" })

function Imagens(tipos) {
  this.imagem = function(tipo) { return novaImagem(tipos[tipo]) }  
}

function novaImagem(src) {
  img = new Image()
  img.src = src
  return img
}

function setColor(element, color) {
  $('#' + element).css("background-color", color)
}