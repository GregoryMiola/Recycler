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
    criarListaDeObjetos(totalDeAgentes, agentes, criarAgente)
    
    //$("#legenda").append("<h2>Total:" + totalDeObjetos + '</h2>')
    //$("#legenda").append("<h2>Total de lixos:" + totalDeLixos + '</h2>')
    //$("#legenda").append("<h2>Total de lixeiras:" + totalDeLixeiras + '</h2>')
    //$("#legenda").append("<h2>Total de agentes:" + totalDeAgentes + '</h2>')
  }
  
  var criarListaDeObjetos = function(total, colecao, metodo) {    
    for(var indice = 0; indice < total; indice++)
      adicionarObjeto(metodo(), colecao)
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
      capacidade: random(10),
      tipo: (random(2)) ? 'seco' : 'organico'
    })
  }
  
  function criarAgente() {
    return new Agente({
      localizacao: localizacoes.nova(),
      capacidade: random(10),
      lixeiras: lixeiras,
      procurar: procuraObjeto,
      remover: removerLixo
    })
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
  
  this.mover = function() { $.each(agentes, function() { this.anda() }) }
  
  init()
}