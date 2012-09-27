function Matriz(tamanho) { 
  
  var criarMatriz = function() {
    var tabela = $('<table class="ambiente-obj"></table>')
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
      $(linha).append(criaColunaComID(indice + '-' + linha.attr('id')))
    }
  }
  
  var criaColunaComID = function(id) { return $('<td id="'+id+'"></td>') }
  
  criarMatriz()
}