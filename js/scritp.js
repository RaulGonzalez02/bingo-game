//array de bolas
const bolas = [
  1, 2, 3, 4, 5, 6, 7, 8, 9, 10,
  11, 12, 13, 14, 15, 16, 17, 18, 19, 20,
  21, 22, 23, 24, 25, 26, 27, 28, 29, 30,
  31, 32, 33, 34, 35, 36, 37, 38, 39, 40,
  41, 42, 43, 44, 45, 46, 47, 48, 49, 50,
  51, 52, 53, 54, 55, 56, 57, 58, 59, 60,
  61, 62, 63, 64, 65, 66, 67, 68, 69, 70,
  71, 72, 73, 74, 75, 76, 77, 78, 79, 80
];

//variables
let portada = document.getElementById("portada")
let mostrarInicio = document.getElementById("mostrarInicio")
let main = document.getElementById("main")
let tablero = document.getElementById("tablero")
let title_jugador = document.getElementById("title_jugador")
let title_maquina = document.getElementById("title_maquina")
let carton_jugador = document.getElementById("carton_jugador")
let carton_maquina = document.getElementById("carton_maquina")
let iniciar_juego = document.getElementById("iniciar_juego")
let pedir_bola = document.getElementById("pedir_bola")
let comprobar_juego = document.getElementById("comprobar_juego")
let reiniciar_juego = document.getElementById("reiniciar_juego")
let cambiar_carton = document.getElementById("cambiar_carton")

//array vacio para comprobar las bolas que han salido
let bolasJugadas = []
//carton jugador
let cartonJugador = carton_jugador.children[1]
//bolas del jugador
let bolasJugador = []
//carton maquina
let cartonMaquina = carton_maquina.children[1]
//let bolas maquina
let bolasMaquina = []
//FUNCIONES
//función para sacar una nueva bola
const pedirBola = () => {
  let bolasTablero = tablero.querySelectorAll(".bolas")
  //console.log(bolasTablero);
  //console.log(cartonJugador);
  //console.log(cartonMaquina);
  let random;
  do {
    random = Math.floor(Math.random() * bolas.length)
  } while (bolasJugadas.some(bola => bola == bolas[random]))
  bolasJugadas.push(bolas[random])

  bolasTablero[random].classList.add("bolas__jugadas")
  tacharBola(cartonJugador.children)
  tacharBola(cartonMaquina.children)

}

//funcion para tachar las bolas de los cartones
const tacharBola = (carton) => {
  //console.log(carton.children[1].textContent);
  for (const bola of bolasJugadas) {
    for (let i = 0; i < carton.length; i++) {
      if(bola==carton[i].textContent)
        carton[i].classList.add("num_carton--jugado")
    }
  }

}
//funcion que crea el tablero
const crearTablero = () => {
  let fragment = document.createDocumentFragment()
  for (let i = 0; i < bolas.length; i++) {
    let div = document.createElement("DIV")
    div.classList.add("bolas")
    div.textContent = bolas[i]
    fragment.append(div)
  }
  tablero.append(fragment)
}

//funcion que crea los cartones del bingo
const crearCarton = () => {
  //Borramos el contenido de las capas
  cartonJugador.innerHTML = ""
  cartonMaquina.innerHTML = ""
  //vaciamos los arrays para crear los cartones
  bolasJugador = []
  bolasMaquina = []
  //fragments para los cartones
  let fragmentJ = document.createDocumentFragment()
  let fragmentM = document.createDocumentFragment()
  let random
  //creacion del carton del jugador
  for (let i = 0; i < 12; i++) {
    let div = document.createElement("DIV")
    //do while para que no se repita ningun numero en el carton
    do {
      random = Math.floor(Math.random() * bolas.length)
      div.classList.add("num_carton")
      div.textContent = bolas[random]
    } while (bolasJugador.some(bola => bola == bolas[random]))
    bolasJugador.push(div.textContent)
    fragmentJ.append(div)
  }
  cartonJugador.append(fragmentJ)

  //creacion del carton de la maquina
  for (let i = 0; i < 12; i++) {
    let div = document.createElement("DIV")
    //do while para que no se repita ningun numero en el carton
    do {
      random = Math.floor(Math.random() * bolas.length)
      div.classList.add("num_carton")
      div.textContent = bolas[random]
    } while (bolasMaquina.some(bola => bola == bolas[random]))
    bolasMaquina.push(div.textContent)
    fragmentM.append(div)
  }
  cartonMaquina.append(fragmentM)
}

//función para mostrar el juego
const mostrarJuego = () => {
  //muestra la pantalla de juego
  portada.classList.add("ocultar")
  main.classList.add("mostrar")
  //crea el tablero donde se colocan todas las bolas
  crearTablero()
  //crear cartones
  crearCarton()
}

//funcion para iniciar el juego
const iniciarJuego = () => {
  iniciar_juego.classList.add("ocultar")
  cambiar_carton.classList.add("ocultar")

  pedir_bola.classList.add("mostrar")
  comprobar_juego.classList.add("mostrar")
  //console.log(bolasJugador);
  //console.log(bolasMaquina);
}
//eventos
mostrarInicio.addEventListener("click", mostrarJuego)
cambiar_carton.addEventListener("click", crearCarton)
iniciar_juego.addEventListener("click", iniciarJuego)
pedir_bola.addEventListener("click", pedirBola)