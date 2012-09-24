function Localizacao(localizacao) {
  this.x = localizacao['x']
  this.y = localizacao['y']
  this.coordenada = function() { return this.x + '-' + this.y }
  this.possuiMesmaCoordenadaQue = function(objeto) {
    return (objeto.x == this.x && objeto.y == this.y)
  }
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