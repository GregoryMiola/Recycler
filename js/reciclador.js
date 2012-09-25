var tamanho = random(6) + 10 //8

function Reciclador() {

  var ambiente, count, atraso
    
  var init = function() {
    h1 = $('<h1>Tamanho da matriz: '+tamanho+' x '+tamanho+'</h1>')
    legenda = $('<div id="legenda"></div>').append(h1)
    $('#controles').append(legenda)
    ambiente = new Ambiente(tamanho)
  }
  
  var repeat = function() { 
    ambiente.mover()
    if(count++ < 10) {
      setTimeout(repeat, atraso)
    }
  }
  
  this.run = function() {
    count = 0
    atraso = 800 * ambiente.totalDeAgentes()
    repeat()
  }
  
  this.next = function() { ambiente.mover() }
  
  init()
}