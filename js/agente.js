var direcao = [ "cima", "esquerda", "baixo", "direita" ]

function Agente(params) {
  
  var instancia = this
  var verificaObjeto = params["procurar"]
  var recolherLixo = params["remover"]
  
  var init = function() { 
    instancia.localizacao = params['localizacao']
    instancia.maximo = tamanho - 1
    instancia.lixeiras = params["lixeiras"]
    instancia.saco = []
    instancia.saco['seco'] = new Saco({ tipo: 'seco', capacidade: params['capacidade'] })
    instancia.saco['organico'] = new Saco({ tipo: 'organico', capacidade: params['capacidade'] })
    $("#"+instancia.localizacao.coordenada()).append(show()) 
  }
  
  var andar = function() {
    switch (direcao[random(4)]) {
      case "cima":
        movimentoHelper("x", false)
        break
      case "baixo":
        movimentoHelper("x", true)
        break
      case "esquerda":
        movimentoHelper("y", false)
        break;
      case "direita":
        movimentoHelper("y", true)
        break;
    }
    return instancia.localizacao.coordenada()
  }
  
  var movimentoHelper = function (prop, avancar) {
    // se deve incrementar na coordenada (cima e esquerda)
    if(avancar)
      incrementar(prop)
    // se deve decrementar na coordenada (cima e esquerda)
    else
      decrementar(prop)
  }
  
  var incrementar = function(prop) {
    if (instancia.localizacao[prop] < instancia.maximo && instancia.localizacao[prop] != instancia.maximo) {
      // avança coordenada
      instancia.localizacao[prop] += 1
      // Verifica se a nova coordenada está ocupada por algum elemento
      if (ocupado()) {
        // Valida com o ambiente que elemento está na nova coordenada
        obj = verificaObjeto(instancia.localizacao)
        // se for nulo (agente), lixeira ou o não conseguir recolher o lixo
        // (no caso de estar cheio o saco apropriado) então ele 
        // continua na mesma coordenada
        if (obj == null || obj instanceof Lixeira || !recolher(obj)) {
          instancia.localizacao[prop] -= 1
        }
      }
    }
  }
  
  var decrementar = function(prop) {
    if (instancia.localizacao[prop] > 0 && instancia.localizacao[prop] != 0) {
      // retrocede coordenada
      instancia.localizacao[prop] -= 1
      // Verifica se a nova coordenada está ocupada por algum elemento
      if (ocupado()) {
        // Valida com o ambiente que elemento está na nova coordenada
        obj = verificaObjeto(instancia.localizacao)
        // se for nulo (agente), lixeira ou o não conseguir recolher o lixo
        // (no caso de estar cheio o saco apropriado) então ele 
        // continua na mesma coordenada
        if (obj == null || obj instanceof Lixeira || !recolher(obj)) {
          instancia.localizacao[prop] += 1
        }
      }
    }
  }
  
  var ocupado = function() {
    return $('#'+instancia.localizacao.coordenada()).children().length > 0
  }
  
  var recolher = function(lixo) {
    if(instancia.saco[obj.tipo].adicionar()) {
      recolherLixo(lixo)
      limpar()
      return true
    }
    return false
  }
  
  var show = function() { return novaImagem('images/agente.png') }
  
  instancia.anda = function() {
    limpar()
    $('#'+andar()).append(show())
  }
  
  var limpar = function() {
    $('#'+instancia.localizacao.coordenada()).empty()
  }
  
  init()
}