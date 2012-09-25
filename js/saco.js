function Saco(params) {
  var tipo = params['tipo'];
  var capacidade = params['capacidade'];
  var quantidade_ocupada = 0;
  this.estaCheio = function (){ return quantidade_ocupada == capacidade }
  this.adicionar = function() {
    if(!this.estaCheio()) {
      quantidade_ocupada++
      return true
    }
    return false
  }
}