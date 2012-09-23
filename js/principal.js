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
    console.log(count)
    if(count++ < 10)
      setTimeout(repeat, 1000)
  }
  
  this.run = function() {
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
      console.log(this)
      this.anda() 
    })
  }
  
  init()
}

var direcao = [ "cima", "esquerda", "baixo", "direita" ]

function Agente(params) {

  var localizacao = params['localizacao']

  var init = function() {
    setColor(localizacao.coordenada(), "#000")
  }
  
  var maximo = tamanho - 1
  
  var alteraLocalizacao = function() {
    switch(direcao[random(4)]) {
      case "cima":
        if(localizacao.x > 0) localizacao.dec_x()
		break;
      case "baixo":
        if(localizacao.x < maximo) localizacao.x = localizacao.x + 1
		break;
      case "esquerda":
        if(localizacao.y > 0) localizacao.y = localizacao.y - 1
		break;
      case "direita":
        if(localizacao.y < maximo) localizacao.y = localizacao.y + 1
		break;
    }
  }
  
  this.anda = function() {
    setColor(localizacao.coordenada(), '#eee')
    alteraLocalizacao()
    setColor(localizacao.coordenada(), '#000')
  }
  
  init()
}