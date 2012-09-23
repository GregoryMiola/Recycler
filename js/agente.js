var direcao = [ "cima", "esquerda", "baixo", "direita" ]

function Agente(params) {

  var localizacao = params['localizacao']

  var init = function() { $("#"+localizacao.coordenada()).append(show()) }
  
  var maximo = tamanho - 1
  
  var andar = function() {
    switch (direcao[random(4)]) {
      case "cima":
        if(localizacao.x > 0) localizacao.x -= 1
        break
      case "baixo":
        if(localizacao.x < maximo) localizacao.x += 1
        break
      case "esquerda":
        if(localizacao.y > 0) localizacao.y -= 1
        break;
      case "direita":
        if(localizacao.y < maximo) localizacao.y += 1
        break;
    }
    return localizacao.coordenada()
  }
  
  var show = function() { return novaImagem('images/agente.png') }
  
  this.anda = function() {
    $('#'+localizacao.coordenada()).empty()
    $('#'+andar()).append(show())
  }
  
  init()
}