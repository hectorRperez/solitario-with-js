import { setupCounter } from "./components/counter";

import "./style.css";


const test = (() => {
  let deck = [];
  let typesCards = ['C', 'D', 'H', 'S'];
  let specialCards = ['A', 'J', 'K', 'Q']

  // let puntosJugador = 0, puntosComputadora = 0;
  let cantidadJugadores = [];

  //Referencias al HTML 
  const btnPedirCarta = document.querySelector('#btnPedirCarta')
  const btnDetenerJuego = document.querySelector('#btnDetenerCarta')
  const puntosJugadoresHTML = document.querySelectorAll('small')
  const listaDeJugadores = document.querySelectorAll('.jugador');
  const btnIniciarJuego = document.querySelector('#btnIniciarJuego')


  const inicializarJuego = (numJugadores = 2) => {
    crearDeck();

    for (let i = 0; i < numJugadores; i++) {
      cantidadJugadores.push(0)
    }

  }

  const crearDeck = () => {
    for (let index = 2; index <= 10; index++) {
      for (const type of typesCards) {
        deck.push(index + type)
      }
    }

    for (const special of specialCards) {
      for (const type of typesCards) {
        deck.push(special + type)
      }
    }

    //Shuffle Array
    const shuffleArray = (arr) => arr.sort(() => Math.random() - 0.5);
    deck = shuffleArray(deck)
  }

  const pedirCarta = () => {
    if (deck.length === 0) {
      throw ('El deck esta vacio');
    }

    let carta = deck.pop();
    return carta;
  };

  const valorCarta = (carta) => {
    let puntos = carta.slice(0, carta.length - 1);

    return isNaN(puntos) ? (puntos === 'A' ? 11 : 10) : parseInt(puntos);
  }

  function acumularPuntos(carta, turno) {
    cantidadJugadores[turno] = cantidadJugadores[turno] + valorCarta(carta);
    puntosJugadoresHTML[turno].textContent = cantidadJugadores[turno];
    return cantidadJugadores[turno];
  }

  function crearCartaJugador(carta, turno) {
    let img = document.createElement('img')
    img.src = `/img/cartas/${carta}.png`
    listaDeJugadores[turno].appendChild(img)
  }


  const turnoComputadora = (puntosMinimo) => {


    let puntosComputadora = 0;

    do {
      let carta = pedirCarta();
      puntosComputadora = acumularPuntos(carta, cantidadJugadores.length - 1);
      crearCartaJugador(carta, cantidadJugadores.length - 1)

      if (puntosMinimo > 21) {
        break;
      }
    } while ((puntosComputadora < puntosMinimo) && (puntosMinimo < 21));

    setTimeout(() => {
      if (puntosMinimo === 21) {
        alert('El jugador 1 gano')
      } else if (puntosMinimo > 21) {
        alert('La computadora gano')
      } else if (puntosMinimo === puntosComputadora) {
        alert('El juego termino en empate')
      } else if ((puntosComputadora > puntosMinimo) && (puntosComputadora <= 21)) {
        alert('La computadora gano')
      } else if (puntosMinimo <= 21 && puntosComputadora > 21) {
        alert('Gano el jugador')
      }
    }, 50);

  }

  function turnoJugador() {
    let carta = pedirCarta();
    let puntosJugador = acumularPuntos(carta, 0);
    crearCartaJugador(carta, 0);


    if (puntosJugador > 21) {
      btnPedirCarta.disabled = true;
      btnDetenerJuego.disabled = true;
      turnoComputadora(puntosJugador)
    } else if (puntosJugador == 21) {
      btnPedirCarta.disabled = true;
      btnDetenerJuego.disabled = true;
    }
  }

  /* eventos */
  btnPedirCarta.addEventListener('click', () => {
    turnoJugador();
  })

  btnDetenerJuego.addEventListener('click', () => {
    btnPedirCarta.disabled = true;
    btnDetenerJuego.disabled = true;
    turnoComputadora(cantidadJugadores[0])
  })

  btnIniciarJuego.addEventListener('click', () => {
    window.location.reload()
  })

  inicializarJuego();

})()

