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
	instancia.id = params["id"]
	instancia.id = params["id"]
    instancia.localizacao = params['localizacao']
    instancia.tipo = params['tipo']
    instancia.show = lixeiras.imagem(instancia.tipo)
    instancia.quantidade = 0
    instancia.capacidade = params['capacidade']
    $('#'+instancia.localizacao.coordenada()).append(instancia.show)
  }
  
  instancia.recebe = function(saco) {
    if(saco.quantidade_ocupada > (instancia.capacidade - instancia.quantidade)) {
      saco.quantidade_ocupada -= (instancia.capacidade - instancia.quantidade)
      instancia.quantidade = instancia.capacidade
    } else {
      instancia.quantidade += saco.quantidade_ocupada
      saco.quantidade_ocupada = 0
    }
  }
  
  instancia.estaLotada = function() {
    return instancia.capacidade == instancia.quantidade_ocupada
  }
  
  init()
}