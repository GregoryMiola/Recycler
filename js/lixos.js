var lixos = new Imagens({ seco: "images/seco.png", organico: "images/organico.png" })
var lixeiras = new Imagens({ seco: "images/reciclavel.png", organico: "images/organica.png" })

function Imagens(tipos) {
  this.imagem = function(tipo) { return novaImagem(tipos[tipo]) }  
}

function Lixo(params) { 
  var instancia = this
  var init = function() {
    instancia.localizacao = params['localizacao']
    instancia.tipo = params['tipo']
    instancia.show = lixos.imagem(instancia.tipo)
    $('#'+instancia.localizacao.coordenada()).append(instancia.show) 
  }
  init()
}

/**
 * 1 - Carga máxima deve ser definida
 * 2 - Setar posição no ambiente
 */
function Lixeira(params) {  
  var instancia = this
  var init = function() {
    instancia.localizacao = params['localizacao']
    instancia.tipo = params['tipo']
    instancia.show = lixeiras.imagem(instancia.tipo)
    instancia.capacidade = params['capacidade']
    $('#'+instancia.localizacao.coordenada()).append(instancia.show)
  }
  init()
}