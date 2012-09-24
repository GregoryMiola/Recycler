var direcao = [ "cima", "esquerda", "baixo", "direita" ]

function Agente(params) {

  var instancia = this
  var verificaObjeto = params["procurar"]
  
  var init = function() { 
    instancia.localizacao = params['localizacao']
    instancia.maximo = tamanho - 1
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
    avancar = true
    // se deve incrementar na coordenada (direita e baixo)
    if(avancar) {
      incrementa(prop)
    }
    // se deve decrementar na coordenada (cima e esquerda)
    else if (instancia.localizacao[prop] > 0 && instancia.localizacao[prop] != 0) {
      instancia.localizacao[prop] -= 1
    }
    // Se não deve ir para nenhuma randomiza novamente
    else
      andar()
  }
  
  var incrementa = function(prop) {
    if (instancia.localizacao[prop] < instancia.maximo && instancia.localizacao[prop] != instancia.maximo) {
      instancia.localizacao[prop] += 1
      if(ocupado()) {
        obj = verificaObjeto(instancia.localizacao)
        // se for agente ou lixeira
        if((obj == null || typeof(obj) == "Lixeira") || !recolher(obj)) {
          instancia.localizacao[prop] -= 1
        }
      }
    }
  }

  var ocupado = function() {
    return $('#'+instancia.localizacao.coordenada()).children().length > 0
  }

  var recolher = function(lixo) {
    console.log("recolhendo")
    if(instancia.saco[obj.tipo].adicionar()) {
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