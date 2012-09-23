var tamanho = 5

function Aplicacao() {

  var ambiente
    
  var init = function() {
    h1 = $('<h1>Tamanho da matriz: '+tamanho+' x '+tamanho+'</h1>')
    legenda = $('<div id="legenda"></div>').append(h1)
    $('#ambiente').append(legenda)
    ambiente = new Ambiente(tamanho)
  }
  
  var count = 0
  var repeat = function() { 
    ambiente.mover()
    if(count++ < 10)
      setTimeout(repeat, 300)
  }
  
  this.run = function() {
    count = 0
    repeat()
  }
  
  this.next = function() {
    ambiente.mover()
  }
  
  init()
}

function Ambiente(tamanho) {
  
  var agentes = []
  var localizacoes = new Localizacoes(tamanho)
  
  var init = function() {
    new Matriz(tamanho)
    agentes.push(new Agente({ localizacao: localizacoes.nova() }))
  }
  
  this.mover = function() {
    $.each(agentes, function() {
      this.anda()
    })
  }
  
  init()
}