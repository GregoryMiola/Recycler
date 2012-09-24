var direcao = [ "cima", "esquerda", "baixo", "direita" ]

function Agente(params) {
  var instancia = this
  var init = function() { 
	instancia.localizacao = params['localizacao']
	instancia.maximo = tamanho - 1
	$("#"+instancia.localizacao.coordenada()).append(show()) 
  }
  
  var andar = function() {
    switch (direcao[random(4)]) {
      case "cima":
        if(instancia.localizacao.x > 0 && instancia.localizacao.x != 0) instancia.localizacao.x -= 1
		else andar()
        break
      case "baixo":
        if(instancia.localizacao.x < instancia.maximo && instancia.localizacao.x != instancia.maximo) instancia.localizacao.x += 1
		else andar()
        break
      case "esquerda":
        if(instancia.localizacao.y > 0 && instancia.localizacao.y != 0) instancia.localizacao.y -= 1
		else andar()
        break;
      case "direita":
        if(instancia.localizacao.y < instancia.maximo && instancia.localizacao.y != instancia.maximo) instancia.localizacao.y += 1
		else andar()
        break;
    }
    return instancia.localizacao.coordenada()
  }
  
  var show = function() { return novaImagem('images/agente.png') }
  
  instancia.anda = function() {
    $('#'+instancia.localizacao.coordenada()).empty()
    $('#'+andar()).append(show())
  }
  
  var criarSacos = function() {
    instancia.saco['seco'] = novoSaco('seco')
    instancia.saco['organico'] = novoSaco('organico')
  }
  
  var novoSaco = function(tp) { return new Saco({ tipo: tp, capacidade: params['capacidade'] })}
  
  init()
}