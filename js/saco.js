function Lixo(params) {  
  this.localizacao = new Localizacao(params['localizacao'])
  this.coordenada = fnCoordenada
  this.tipo = function() { return params['tipo'] }
  this.elemento = lixos.imagem(this.tipo())
  this.show = function() { return this.elemento }
}