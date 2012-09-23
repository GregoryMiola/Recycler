function Ambiente(tamanho) {
  
  var agentes = []
  var objetos = []
  var localizacoes = new Localizacoes(tamanho)
  
  var init = function() {
    new Matriz(tamanho)
    criarObjetos()
    //agentes.push(new Agente({ localizacao: localizacoes.nova() }))
  }
  
  var criarObjetos = function() {    
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
  
  /*function criarAgente() {
    return new Agente({ 
      localizacao: localizacoes.nova(),
      capacidade: random(10),
      limpar: removeLixo,
      procurar: procurarLixo,
      coordenadaValida: valida
    })
  }*/
  
  function criarAgente() {
    return new Agente({localizacao: localizacoes.nova()})
  }
  
  var valida = function(coordenada) {
    return (coordenada.x >= 0 && coordenada.y >= 0) &&
           (coordenada.x <= tamanho && coordenada.y <= tamanho)
  }
  
  this.mover = function() { $.each(agentes, function() { this.anda() }) }
  
  init()
}