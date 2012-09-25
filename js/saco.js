function Saco(params) {
  var tipo = params['tipo'];
  this.capacidade = params['capacidade'];
  this.quantidade_ocupada = 0;
  this.estaCheio = function (){ return this.quantidade_ocupada == this.capacidade }
  this.adicionar = function() {
    if(!this.estaCheio()) {
      this.quantidade_ocupada++
      return true
    }
    return false
  }
}