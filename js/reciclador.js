function Reciclador() {  

  var tamanho = random(10) + 8
  var ambiente = new Ambiente(tamanho)  

  this.run = function() {
    h1 = $('<h1>Tamanho da matriz: '+tamanho+' x '+tamanho+'</h1>')
    legenda = $('<div id="legenda"></div>')
    legenda.append(h1)
    $('#ambiente').append(legenda)
    ambiente.criar()    
  }
}

function Ambiente(tamanho) {  
  
  var objetos = []
  var agentes = []
  var localizacoes = new Localizacoes(tamanho)
  
  this.criar = function() {
    new Matriz(tamanho)
    this.criarObjetos()
  }
  
  this.criarObjetos = function() {    
    totalDeObjetos = random(tamanho) + tamanho * 2
    
    totalDeLixos = totalDeObjetos - Math.floor(totalDeObjetos / 3)
    totalDeLixeiras = Math.floor(((totalDeObjetos - totalDeLixos) / 3) * 2)
    totalDeAgentes = 1 //totalDeObjetos - (totalDeLixos + totalDeLixeiras)        

    criarListaDeObjetos(totalDeLixos, criarLixo)
    criarListaDeObjetos(totalDeLixeiras, criarLixeira)
    criarListaDeAgentes(totalDeAgentes)
    
    $("#legenda").append("<h2>Total:" + totalDeObjetos + '</h2>')
    $("#legenda").append("<h2>Total de lixos:" + totalDeLixos + '</h2>')
    $("#legenda").append("<h2>Total de lixeiras:" + totalDeLixeiras + '</h2>')
    $("#legenda").append("<h2>Total de agentes:" + totalDeAgentes + '</h2>')
  }
  
  var criarListaDeObjetos = function(total, metodo) {    
    for(var indice = 0; indice < total; indice++)
      adicionarObjeto(metodo(), objetos)
  }
  
  var criarListaDeAgentes = function(total) {
    for(var indice = 0; indice < total; indice++)
      adicionarObjeto(criarAgente(), agentes)      
    $.each(agentes, function() { this.procura() })
  }
  
  function adicionarObjeto(objeto, colecao) {
    colecao.push(objeto)
    $('#' + objeto.coordenada()).append(objeto.show())
  }
  
  function criarLixo() {     
    return new Lixo({ 
      localizacao: localizacoes.nova(),
      tipo: (random(10) % 2 == 0) ? 'seco' : 'organico'
    })
  }
  
  function criarLixeira() {
    return new Lixeira({ 
      localizacao: localizacoes.nova(),
      capacidade: random(10),
      tipo: (random(10) % 2 == 0) ? 'seco' : 'organico'
    })
  }
  
  function criarAgente() {
    return new Agente({ 
      localizacao: localizacoes.nova(),
      capacidade: random(10),
      limpar: removeLixo,
      procurar: procurarLixo,
      coordenadaValida: valida
    })
  }
  
  var valida = function(coordenada) {
    return (coordenada.x >= 0 && coordenada.y >= 0) &&
           (coordenada.x <= tamanho && coordenada.y <= tamanho)
  }
  
  var procurarLixo = function(coordenada, direcao) {
    
  }
  
  var removeLixo = function(agente, coordenada) {
    agente.remove(procurarObjeto(coordenada))
  }
  
  var procurarObjeto = function(coordenada) {
    $.each(objetos, function() {
      if(this.possuiMesmaCoordenadaQue(coordenada)) {
        return this
      }
    })
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
      if(this.possuiMesmaCoordenadaQue(nova))
        tem = true
        return
    })
    return tem
  }
  
  var criar = function() {
    novaLocalizacao = new Localizacao( { x: random(tamanho), y: random(tamanho) })
      
    if(existe(novaLocalizacao))
      novaLocalizacao = criar()
    return novaLocalizacao
  }
  
}

function Matriz(tamanho) { 
  
  var criarMatriz = function() {
    var tabela = $('<table></table>')
    $('#ambiente').append(tabela)
    
    for(var indice = 0; indice < tamanho; indice++) {      
      $(tabela).append(criarLinha(indice))
    }
  }
  
  var criarLinha = function(indice) {
    var novaLinha = $('<tr id="'+indice+'"></tr>')
    criarColunasParaLinha(novaLinha)
    return novaLinha
  }
  
  var criarColunasParaLinha = function(linha) {
    for(var indice = 0; indice < tamanho; indice++) {
      $(linha).append(criaColunaComID(linha.attr('id') + '-' + indice))
    }
  }
  
  var criaColunaComID = function(id) { return $('<td id="'+id+'"></td>') }
  
  criarMatriz()
}

function random(max) {
  return Math.floor(Math.random() * max)
}