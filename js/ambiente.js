function Ambiente(tamanho) {
  
  var agentes = []
  var lixeiras = []
  var lixos = []
  var localizacoes = new Localizacoes(tamanho)
  
  this.totalDeAgentes = function() {
    return agentes.length
  }
  
  var init = function() {
    new Matriz(tamanho)
    criarObjetos()
  }
  
  var criarObjetos = function() {    
    totalDeObjetos = tamanho * 6
    
    totalDeLixos = totalDeObjetos - Math.floor(totalDeObjetos / 4)
    totalDeLixeiras = Math.floor(((totalDeObjetos - totalDeLixos) / 3) * 2)
    totalDeAgentes = 2 //totalDeObjetos - (totalDeLixos + totalDeLixeiras)
    
    criarListaDeObjetos(totalDeLixos, lixos, criarLixo)
    criarListaDeObjetos(totalDeLixeiras, lixeiras, criarLixeira)
    criarAgentes(totalDeAgentes)
    
    //$("#legenda").append("<h2>Total:" + totalDeObjetos + '</h2>')
    //$("#legenda").append("<h2>Total de lixos:" + totalDeLixos + '</h2>')
    //$("#legenda").append("<h2>Total de lixeiras:" + totalDeLixeiras + '</h2>')
    //$("#legenda").append("<h2>Total de agentes:" + totalDeAgentes + '</h2>')
  }
  
  var criarListaDeObjetos = function(total, colecao, metodo) {    
    for(var indice = 0; indice < total; indice++)
      adicionarObjeto(metodo(), colecao)
  }
  
  var criarAgentes = function(total) {
    for(var indice = 0; indice < total; indice++)
      adicionarObjeto(criarAgente(indice), agentes)
  }
  
  function adicionarObjeto(objeto, colecao) {
    colecao.push(objeto)
  }
  
  function criarLixo() {
    return new Lixo({ 
      localizacao: localizacoes.nova(),
      tipo: (random(2)) ? 'seco' : 'organico'
    })
  }
  
  function criarLixeira() {
    return new Lixeira({ 
      localizacao: localizacoes.nova(),
      capacidade: random(5) + 3,
      tipo: (random(2)) ? 'seco' : 'organico'
    })
  }
  
  function criarAgente(id) {
    agente = new Agente({
      id: id,
      localizacao: localizacoes.nova(),
      capacidade: random(5) + 3,
      lixeiras: lixeiras,
      procurar: procuraObjeto,
      remover: removerLixo
    })
    $("#agentes").append($("<div id=\"agente-"+agente.id+"\"></div>"))
    informacoesAgente(agente)
    return agente
  }
  
  var informacoesAgente = function(agente) {
    div = $("#agente-"+agente.id)
    div.append($("<div>Agente: " + agente.id + "</div>"))
    div.append($("<div>Saco de lixo seco: " + agente.saco['seco'].quantidade_ocupada + "/" + agente.saco['seco'].capacidade + "</div>"))
    div.append($("<div>Saco de lixo organico: " + agente.saco['organico'].quantidade_ocupada + "/" + agente.saco['organico'].capacidade + "</div>"))
  }
  
  var procuraObjeto = function(coordenada) {
    objeto = buscar(lixos, coordenada)
    if (objeto == null)
      objeto = buscar(lixeiras, coordenada)
    return objeto
  }
  
  var buscar = function(colecao, coordenada) {
    objeto = null
    $.each(colecao, function() {
      if(coordenada.possuiMesmaCoordenadaQue(this.localizacao)) {
        objeto = this
        return
      }
    })
    return objeto
  }
  
  var removerLixo = function(lixo) { lixos.splice(lixos.indexOf(lixo), 1) }
  
  this.mover = function() {
    atraso = 0
    total = agentes.length
    for(indice = 0; indice < total; indice++) {
      atraso += 800
      var agente = agentes[indice]
      setTimeout(moverAtrasado, atraso, agente)
    }
  }
  
  var moverAtrasado = function(agente) {
    atualizaAgente(agente, true)
    agente.anda()
    atualizaAgente(agente, false)
  }
  
  var atualizaAgente = function(agente, andando) {
    //console.log(agente)
    if(andando)
      $("#agente-" + agente.id).addClass("andando")
    else
      setTimeout(encerrarMovimento, 500, agente)
  }
  
  var encerrarMovimento = function(agente) {
    div = $("#agente-" + agente.id)
    div.empty()
    informacoesAgente(agente)
    div.removeClass("andando")
  }
  
  init()
}