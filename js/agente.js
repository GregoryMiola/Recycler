var direcao = [ "cima", "direita", "baixo", "esquerda" ]

function Agente(params) {
  
  var instancia = this
  var verificaObjeto = params["procurar"]
  var recolherLixo = params["remover"]
  
  var init = function() { 
    instancia.id = params["id"]
    instancia.localizacao = params['localizacao']
    instancia.maximo = tamanho - 1
    instancia.lixeiras = params["lixeiras"]
    instancia.saco = []
    instancia.saco['seco'] = new Saco({ tipo: 'seco', capacidade: params['capacidade'] })
    instancia.saco['organico'] = new Saco({ tipo: 'organico', capacidade: params['capacidade'] })
    $("#"+instancia.localizacao.coordenada()).append(show()) 
  }

  var sacosCheios = function() {
    return (instancia.saco['seco'].estaCheio() || instancia.saco['organico'].estaCheio())
  }

  var esvaziarSaco = function() {
    maisProxima = buscarLixeiraMaisProxima()
    if(chegouNaLixeira(maisProxima)) {
      maisProxima.recebe(saco[maisProxima.tipo])
      if(maisProxima.estaLotada()) 
        lixeiras.splice(lixeiras.indexOf(maisProxima), 1)
      if(saco[maisProxima.tipo].quantidade_ocupada == 0)
        esvaziando = false
    }
  }
  
  var calculaDistancia = function() {
    count = 0
    distancias = []
    $.each(instancia.lixeiras, function() {
      x = Math.pow(instancia.localizacao.x - this.localizacao.x, 2)
      y = Math.pow(instancia.localizacao.y - this.localizacao.y, 2)
      distancias[count] = { indice: count++, distancia: Math.sqrt(x + y), tipo: this.tipo }
    })
    return distancias
  }
  
  var buscarLixeiraMaisProxima = function() {
    distancias = calculaDistancia()
    if(instancia.saco['seco'].estaCheio() && instancia.saco['organico'].estaCheio())
      distancias.sort(function(a, b) { return a["distancia"] > b["distancia"] })
    else {
      tipo = (instancia.saco['seco'].estaCheio()) ? 'seco' : 'organico'
      distancias = distancias.sort(function(a,b) { return a["distancia"] > b["distancia"] && a["tipo"] == tipo })
    }
    return distancias
  }
  
  var chegouNaLixeira = function(lixeira) {
    return procurarNoEixo("x", lixeira, false)
  }
  
  var procurarNoEixo = function(eixo, lixeira, retroceder) {
    // se precisar buscar em outro eixo, qual será?
    novoEixo = (eixo == "x" ? "y" : "x")
    // se já passou para o y, então se precisar ir para o x novamente,
    // ele terá que retroceder, ou se já estiver retrocedendo, que neste
    // caso, ele já é o x retrocedido
    deveraRetroceder = (novoEixo == "y" || retroceder)    
    // Retroceder: andar no caminho contrário ao da lixiera
    // estratégia para o caso de ficar encurralado em um lugar
    if(!retroceder) {
      if(Math.abs(instancia.localizacao[eixo] - lixeira.localizacao[eixo]) > 1)
      {
        instancia.localizacao[eixo] += (instancia.localizacao[eixo] > lixeira.localizacao[eixo]) ? -1 : 1
        if(ocupada()) {
          instancia.localizacao[eixo] -= (instancia.localizacao[eixo] > lixeira.localizacao[eixo]) ? -1 : 1
          procurarNoEixo(novoEixo, lixeira, deveraRetroceder)
        } else {
          return false // não achou, mas andou uma casa
        }
      } else {
        return true // está na frente da lixeira, é só esvaziar!
      }
    } else {
      instancia.localizacao[eixo] += (instancia.localizacao[eixo] < lixeira.localizacao[eixo]) ? -1 : 1
      if(ocupada()) {
        instancia.localizacao[eixo] -= (instancia.localizacao[eixo] < lixeira.localizacao[eixo]) ? -1 : 1
        procurarNoEixo((eixo == "x" ? "y" : "x"), lixeira, deveraRetroceder)
      } else {
        return false // não achou, mas andou uma casa
      }
    }
  }
  
  var tentativas = 0
  var indiceDirecao = 0
  var proximaDirecao
  var encontrou = false
  var esvaziando = false
  
  var andar = function() {
    // Se não achou algo na tentativa anterior, segue para a proxima direcao
    if(!encontrou)
      selecionaDirecao()
      
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
      
    proximaDirecao = direcao[indiceDirecao]
  }
  
  var movimentoHelper = function (prop, avancar) {
    // se deve incrementar na coordenada (baixo e direita)
    if(avancar)
      incrementar(prop)
    // se deve decrementar na coordenada (cima e esquerda)
    else
      decrementar(prop)
  }
  
  var incrementar = function(prop) {
    if(sacosCheios()) {
      esvaziarSaco()
    } else {
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
            andar()
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
  }
  
  var decrementar = function(prop) {
    if(sacosCheios()) {
      esvaziarSaco()
    } else {
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
            andar()
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