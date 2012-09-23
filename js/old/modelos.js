var lixos = new Imagens({ seco: "images/seco.png", organico: "images/organico.png" })
var lixeiras = new Imagens({ seco: "images/reciclavel.png", organico: "images/organica.png" })

function Imagens(tipos) {
  this.imagem = function(tipo) { return novaImagem(tipos[tipo]) }  
}

function Localizacao(localizacao) {
  this.x = localizacao['x']
  this.y = localizacao['y']
  this.coordenada = function() { return this.x + '-' + this.y }
  this.possuiMesmaCoordenadaQue = function(objeto) {
    return (objeto.x == this.x && objeto.y == this.y)
  }
}

var fnCoordenada = function() { return this.localizacao.coordenada() }

function Lixo(params) {  
  this.localizacao = new Localizacao(params['localizacao'])
  this.coordenada = fnCoordenada
  this.tipo = function() { return params['tipo'] }
  this.elemento = lixos.imagem(this.tipo())
  this.show = function() { return this.elemento }
}

/**
 * 1 - Carga máxima deve ser definida
 * 2 - Setar posição no ambiente
 */
function Lixeira(params) {
  this.localizacao = new Localizacao(params['localizacao'])
  this.coordenada = fnCoordenada
  this.capacidade = params['capacidade']
  this.tipo = function() { return params['tipo'] }
  this.elemento = lixeiras.imagem(this.tipo())
  this.show = function() { return this.elemento }
}

function Saco(params) {
  var tipo = params['tipo'];
  var capacidade = params['capacidade'];
  var quantidade_ocupada = 0;
  
  this.estaCheio = function (){ return quantidade_ocupada == capacidade }
  this.adicionar = function() {
    if(!this.estaCheio())
      quantidade_ocupada++
  }
}

/** 
 * 1 - Anda em qualquer direção a cada ciclo
 * 
 * 2 - Possui percepção de duas células em qualuer direção
 *
 * 3 - Se durante 3 ciclos consecutivos não encontrar nada,
 *   - seguirá em linha reta (em direção randômica)
 *
 * 4 - Ao encontrar sugeira novamente, volta a andar 
 *   - conforme percepção
 * 
 * 5 - Possui dois sacos, um para lixo seco e outro para orgânico
 *
 * 6 - Capacidade do saco pode ser parâmetrizada
 *
 * 7 - Quando o saco está cheio, deve ser esvaziado em uma das
 *   - lixeiras do ambiente
 * 
 * 8 - Ele sempre procura a lixeira mais perto
 *
 * 9 - Guarda as posições das lixeiras em memória
 *   - (de cara? ou conforme as acha?)
 *
 * 10 - Não pode ocupar mesma célula dos demais objetos
 *
 * 11 - Recolhe o lixo ao mover-se para a celula do lixo
 *
 * 12 - Ao chegar em uma lixeira cheia, não deverá mais ir até ela
 */
function intervalo(objeto, tempo) {
  andar(objeto)
  if(coordenadaValida(objeto.localizacao))
    setTimeout(function() { intervalo(tempo + tempo / 2) }, tempo)
}

function Agente(params) {
  
  this.localizacao = new Localizacao(params['localizacao']);  
  this.coordenada = fnCoordenada

  this.limpar = params['limpar']
  var coordenadaValida = params['coordenadaValida']
  
  this.procura = function() {
    agente = this
    intervalo(agente, 200)
  }
  
  this.andar = function() {
    $('#'+this.coordenada()).empty()
    this.localizacao.x++
    console.log(this.localizacao)
    $('#'+this.coordenada()).append(this.show())
  }
  
  this.show = function() { return novaImagem('images/agente.png') }
  
  var criarSacos = function() {
    this.saco['seco'] = novoSaco('seco')
    this.saco['organico'] = novoSaco('organico')
  }
  
  var novoSaco = function(tp) { return new Saco({ tipo: tp, capacidade: params['capacidade'] })}
  
  this.remove = function(lixo) {
    this.saco[lixo.tipo].adicionar()
    $('#'+lixo.coordenada()).empty()
    $('#legenda').append(lixo.show())
  }
}