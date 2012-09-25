var tamanho = 8

function Reciclador() {

  var ambiente, count
    
  var init = function() {
    h1 = $('<h1>Tamanho da matriz: '+tamanho+' x '+tamanho+'</h1>')
    legenda = $('<div id="legenda"></div>').append(h1)
    $('#ambiente').append(legenda)
    ambiente = new Ambiente(tamanho)
  }
  
  var repeat = function() { 
    ambiente.mover()
    if(count++ < 10)
      setTimeout(repeat, 700)
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