function Ambiente(tamanho) {
  
  var agentes = []
  var lixeiras = []
  var lixos = []
  var localizacoes = new Localizacoes(tamanho)
  
  var init = function() {
    new Matriz(tamanho)
    criarObjetos()
  }
  
  var criarObjetos = function() {    
    totalDeObjetos = random(tamanho) + tamanho * 2
    
    totalDeLixos = totalDeObjetos - Math.floor(totalDeObjetos / 3)
    totalDeLixeiras = Math.floor(((totalDeObjetos - totalDeLixos) / 3) * 2)
    totalDeAgentes = 1 //totalDeObjetos - (totalDeLixos + totalDeLixeiras)        
    
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
    $.each(agentes, function() {
      atraso += 600
      agente = this
      setTimeout(function() { moverAtrasado(agente) }, atraso)
    })
  }
  
  var moverAtrasado = function(agente) {
    atualizaAgente(agente, true)
    agente.anda()
    atualizaAgente(agente, false)
  }
  
  var atualizaAgente = function(agente, andando) {
    div = $("#agente-" + agente.id)
    if(andando)
      div = $("#agente-" + agente.id).addClass("andando")
    else      
      setTimeout(function() { encerrarMovimento(agente) }, 400)
  }
  
  var encerrarMovimento = function(agente) {
    div = $("#agente-" + agente.id)
    div.empty()
    informacoesAgente(agente)
    div.removeClass("andando")
  }
  
  init()
}