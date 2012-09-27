function Localizacao(localizacao) {
  var instancia = this
  
  var init = function() { 
	instancia.x = localizacao['x']
	instancia.y = localizacao['y']
	instancia.coordenada = function() { return instancia.x + '-' + instancia.y }
	instancia.possuiMesmaCoordenadaQue = function(objeto) {
	return (objeto.x == instancia.x && objeto.y == instancia.y)
	}
  }
  
  init()
}

function Localizacoes(tamanho) {
  
  var localizacoes = []
  
  this.nova = function() {
    novaLocalizacao = criar()
    localizacoes.push(novaLocalizacao)
    return novaLocalizacao
  }
  
  var existe = function(nova) {
    tem = false
    $.each(localizacoes, function() {
      if(this.possuiMesmaCoordenadaQue(nova)) {
        tem = true
        return
      }
    })
    return tem
  }
  
  var criar = function() {
    novaLocalizacao = new Localizacao({ x: random(tamanho), y: random(tamanho) })
    if(existe(novaLocalizacao))
      novaLocalizacao = criar()
    return novaLocalizacao
  }
  
}