var direcao = [ "cima", "direita", "baixo", "esquerda" ]

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
  
  var tentativas = 0
  var indiceDirecao = 0
  var proximaDirecao
  var encontrou = false
  
  var andar = function() {
    // Se não achou algo na tentativa anterior, segue para a proxima direcao
    if(!encontrou) {
      selecionaDirecao()
    } else { // Segue para a mesma direção
      console.log(proximaDirecao)
      switch (proximaDirecao) {
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
    }
    console.log("movimento encerrado!")
    tentativas = 0
    return instancia.localizacao.coordenada()
  }
  
  var selecionaDirecao = function() {
    tentativas++
    if(tentativas == 1) {
      indiceDirecao = random(4)
      proximaDirecao = direcao[indiceDirecao]
    } else {
      mudaDirecao()
    }
  }
  
  var mudaDirecao = function() {
    if (indiceDirecao == 3)
      indiceDirecao = 0
    else
      indiceDirecao++
      
    console.log(tentativas)
    console.log(direcao[indiceDirecao])
      
    proximaDirecao = direcao[indiceDirecao]
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
    // verifica se não está tentando sair do mapa
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
      } else { // Se não está ocupado irá olhar na segunda casa na mesma direção
        if (tentativas < 5) { // isso se ele não tiver olhado para os quatro lados
          instancia.localizacao[prop] += 1 // foram +2 com o de cima
          // verifica se a segunda casa está ocupada
          if(ocupado()) {
            // Valida com o ambiente que elemento está na nova coordenada
            obj = verificaObjeto(instancia.localizacao)
            if (obj == null || obj instanceof Lixeira) {
              // se está ocupada por um dos elementos que não deve pegar
              // então retrocede a coordenada
              instancia.localizacao[prop] -= 2
              andar()
            } else {
              // achamos um lixo, então andaremos uma casa
              instancia.localizacao[prop] -= 1
              encontrou = true
            }
          } else {
            instancia.localizacao[prop] -= 2
            andar()
          }
        }
      }
    } else {
      andar()
    }
  }
  
  var decrementar = function(prop) {
    // verifica se não está tentando sair do mapa
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
      } else { // Se não está ocupado irá olhar na segunda casa na mesma direção
        if(tentativas < 5) { // isso se ele não tiver olhado para os quatro lados
          instancia.localizacao[prop] -= 1 // foram -2 com o de cima
          // verifica se a segunda casa está ocupada
          if(ocupado()) {
            // Valida com o ambiente que elemento está na nova coordenada
            obj = verificaObjeto(instancia.localizacao)
            if (obj == null || obj instanceof Lixeira) {
              // se está ocupada por um dos elementos que não deve pegar
              // então retrocede a coordenada
              instancia.localizacao[prop] += 2
              andar()
            } else {
              // achamos um lixo, então andaremos uma casa
              instancia.localizacao[prop] += 1
              encontrou = true
            }
          } else {
            instancia.localizacao[prop] += 2
            andar()
          }
        }
      }
    } else {
      andar()
    }
  }
  
  var ocupado = function() {
    return $('#'+instancia.localizacao.coordenada()).children().length > 0
  }
  
  var recolher = function(lixo) {
    if(instancia.saco[obj.tipo].adicionar()) {
      recolherLixo(lixo)
      limpar()
      encontrou = false
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