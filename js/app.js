const canvas = document.getElementById("game");
const ctx = canvas.getContext("2d");

/**
 *
 * CARGAR IMAGENES
 *
 */

const imgJugador = new Image();
imgJugador.src = "../img/jugador.png";

const imgCometa = new Image();
imgCometa.src = "../img/cometa.png";

const imgMeteorito = new Image();
imgMeteorito.src = "../img/meteorito.png";

const imgSol = new Image();
imgSol.src = "../img/sol.png";

const imgMercurio = new Image();
imgMercurio.src = "../img/mercurio.png";

const imgVenus = new Image();
imgVenus.src = "../img/venus.png";

const imgTierra = new Image();
imgTierra.src = "../img/tierra.png";

const imgMarte = new Image();
imgMarte.src = "../img/marte.png";

const imgJupiter = new Image();
imgJupiter.src = "../img/jupiter.png";

const imgSaturno = new Image();
imgSaturno.src = "../img/saturno.png";

const imgUrano = new Image();
imgUrano.src = "../img/urano.png";

const imgNeptuno = new Image();
imgNeptuno.src = "../img/neptuno.png";

const imgCoind = new Image();
imgCoind.src = "../img/universos.png";

const imgEstrella = new Image();
imgEstrella.src = "../img/estrella.png";

const imgFondo = new Image();
imgFondo.src = "../img/fondo.png";

const imgPortada = new Image();
imgPortada.src = "../img/Instrucciones.jpg";

const imgWin = new Image();
imgWin.src = "../img/You win.png";

const imgGameover = new Image();
imgGameover.src = "../img/GAMEOVER.png";

/**
 *
 * POSICION INICIAL DEL JUGADOR
 *
 */
const player = { x: 80, y: 380, w: 100, h: 100, vx: 0 };

let keys = {};
let soles = [];
let amigos = [];
let meteoritos = [];
let cometas = [];
let mercurios = [];
let venus = [];
let tierras = [];
let martes = [];
let jupiters = [];
let saturnos = [];
let uranos = [];
let neptunos = [];
let coinds = [];
let score = 0;
let vidas = 5;
let universos = 0;
let nivel = 1;
let gameStart = false;
let gameOver = false;
let gameWin = false;

// CREAR ENEMIGOS
function crearSoles() {
  let posicion = Math.random() * (800 - 45);
  soles.push({
    x: posicion,
    y: -50,
    w: 150,
    h: 150,
    vy: 1,
  });
}
function crearMeteoritos() {
  let velocidad = Math.random() * (5 - 2) + 2;
  let posicion = Math.random() * (800 - 45);
  meteoritos.push({
    x: posicion,
    y: -50,
    w: 45,
    h: 45,
    vy: velocidad,
  });
}
function crearCometas() {
  let posicion = Math.random() * (800 - 45);
  cometas.push({
    x: posicion,
    y: -50,
    w: 30,
    h: 30,
    vy: 10,
  });
}
function crearMercurios() {
  let posicion = Math.random() * (800 - 45);
  mercurios.push({
    x: posicion,
    y: -50,
    w: 30,
    h: 30,
    vy: 5,
  });
}
function crearMartes() {
  let posicion = Math.random() * (800 - 45);
  martes.push({
    x: posicion,
    y: -50,
    w: 35,
    h: 35,
    vy: 4.5,
  });
}
function crearVenus() {
  let posicion = Math.random() * (800 - 45);
  venus.push({
    x: posicion,
    y: -50,
    w: 40,
    h: 40,
    vy: 5,
  });
}
function crearTierras() {
  let posicion = Math.random() * (800 - 45);
  tierras.push({
    x: posicion,
    y: -50,
    w: 45,
    h: 45,
    vy: 5,
  });
}
function crearNeptunos() {
  let posicion = Math.random() * (800 - 45);
  neptunos.push({
    x: posicion,
    y: -50,
    w: 50,
    h: 50,
    vy: 3,
  });
}
function crearUranos() {
  let posicion = Math.random() * (800 - 45);
  uranos.push({
    x: posicion,
    y: -50,
    w: 55,
    h: 55,
    vy: 3,
  });
}
function crearSaturnos() {
  let posicion = Math.random() * (800 - 45);
  saturnos.push({
    x: posicion,
    y: -50,
    w: 60,
    h: 60,
    vy: 3.5,
  });
}
function crearJupiters() {
  let posicion = Math.random() * (800 - 45);
  jupiters.push({
    x: posicion,
    y: -50,
    w: 75,
    h: 75,
    vy: 2,
  });
}

// CREAR AMIGOS
function crearAmigos() {
  let velocidad = Math.random() * (5 - 2) + 2;
  let posicion = Math.random() * (800 - 45);
  amigos.push({
    x: posicion,
    y: -50,
    w: 45,
    h: 45,
    vy: velocidad,
  });
}
function crearCoinds() {
  let posicion = Math.random() * (800 - 45);
  let velocidad = Math.random() * (5 - 2) + 2;
  coinds.push({
    x: posicion,
    y: -50,
    w: 40,
    h: 40,
    vy: velocidad,
  });
}

document.addEventListener("keydown", (e) => (keys[e.key] = true));
document.addEventListener("keyup", (e) => (keys[e.key] = false));
//INICIAR EL JUEGO
document.addEventListener("keydown", (e) => {
  if (e.key === "Escape") {
    gameStart = true;
  }
});
//REINICIAR JUEGO
document.addEventListener("keydown", (e) => {
  if ((gameOver || gameWin) && e.key === "Enter") {
    reiniciarJuego();
  }
});

function update() {
  if (gameOver || gameWin) return;
  // Reiniciamos velocidad horizontal
  player.vx = 0;

  // Movimiento horizontal
  if (keys["ArrowLeft"]) player.vx = -4;
  else if (keys["ArrowRight"]) player.vx = 4;

  // Movimiento vertical del jugador
  if (keys["ArrowDown"]) player.y += 4;
  if (keys["ArrowUp"]) player.y -= 4;

  // Aplicar movimiento horizontal
  player.x += player.vx;

  // Evitar que el personaje salga de la pantalla
  if (player.x < 0) player.x = 0;
  if (player.x + player.w > 800) player.x = 800 - player.w;
  if (player.y + player.h > 600) player.y = 600 - player.h;
  if (player.y < 0) player.y = 0;

  //MOVER METEORITOS
  meteoritos.forEach((meteorito) => (meteorito.y += meteorito.vy));
  meteoritos = meteoritos.filter((meteorito) => meteorito.y < 600);
  if (Math.random() < 0.02) crearMeteoritos();
  //MOVER COMETAS
  cometas.forEach((cometa) => (cometa.y += cometa.vy));
  cometas = cometas.filter((cometa) => cometa.y < 600);
  if (Math.random() < 0.001) crearCometas();
  //MOVER MERCURIO
  mercurios.forEach((mercurio) => (mercurio.y += mercurio.vy));
  mercurios = mercurios.filter((mercurio) => mercurio.y < 600);
  if (Math.random() < 0.02) crearMercurios();
  //MOVER MARTE
  martes.forEach((marte) => (marte.y += marte.vy));
  martes = martes.filter((marte) => marte.y < 600);
  if (Math.random() < 0.001) crearMartes();
  //MOVER VENUS
  venus.forEach((venu) => (venu.y += venu.vy));
  venus = venus.filter((venu) => venu.y < 600);
  if (Math.random() < 0.001) crearVenus();
  //MOVER TIERRA
  tierras.forEach((tierra) => (tierra.y += tierra.vy));
  tierras = tierras.filter((tierra) => tierra.y < 600);
  if (Math.random() < 0.02) crearTierras();
  //MOVER NEPTUNO
  neptunos.forEach((neptuno) => (neptuno.y += neptuno.vy));
  neptunos = neptunos.filter((neptuno) => neptuno.y < 600);
  if (Math.random() < 0.02) crearNeptunos();
  //MOVER URANO
  uranos.forEach((urano) => (urano.y += urano.vy));
  uranos = uranos.filter((urano) => urano.y < 600);
  if (Math.random() < 0.002) crearUranos();
  //MOVER SATURNO
  saturnos.forEach((saturno) => (saturno.y += saturno.vy));
  saturnos = saturnos.filter((saturno) => saturno.y < 600);
  if (Math.random() < 0.003) crearSaturnos();
  //MOVER JUPITER
  jupiters.forEach((jupiter) => (jupiter.y += jupiter.vy));
  jupiters = jupiters.filter((jupiter) => jupiter.y < 600);
  if (Math.random() < 0.005) crearJupiters();
  // MOVER SOLES
  soles.forEach((sol) => (sol.y += sol.vy));
  soles = soles.filter((sol) => sol.y < 600);
  if (Math.random() < 0.001) crearSoles();

  // MOVER AMIGOS
  amigos.forEach((amigo) => (amigo.y += amigo.vy));
  amigos = amigos.filter((amigo) => amigo.y < 600);
  if (Math.random() < 0.005) crearAmigos();
  // MOVER COINDS
  coinds.forEach((coind) => (coind.y += coind.vy));
  coinds = coinds.filter((coind) => coind.y < 600);
  if (Math.random() < 0.007) crearCoinds();

  // COLISIONES de los Meteoritos
  meteoritos.forEach((meteorito, indice) => {
    if (colision(player, meteorito)) {
      vidas--;
      meteoritos.splice(indice, 1);
    }
  });
  //COLISIONES de los cometas
  cometas.forEach((cometa, indice) => {
    if (colision(player, cometa)) {
      vidas--;
      cometas.splice(indice, 1);
    }
  });
  //COLISIONES de Mercurio
  mercurios.forEach((mercurio, indice) => {
    if (colision(player, mercurio)) {
      vidas--;
      mercurios.splice(indice, 1);
    }
  });
  //COLISIONES de Marte
  martes.forEach((marte, indice) => {
    if (colision(player, marte)) {
      vidas--;
      martes.splice(indice, 1);
    }
  });
  //COLISIONES de Venus
  venus.forEach((venu, indice) => {
    if (colision(player, venu)) {
      vidas--;
      venus.splice(indice, 1);
    }
  });
  //COLISIONES de la Tierra
  tierras.forEach((tierra, indice) => {
    if (colision(player, tierra)) {
      vidas - 2;
      tierras.splice(indice, 1);
    }
  });
  //COLISIONES de Neptuno
  neptunos.forEach((neptuno, indice) => {
    if (colision(player, neptuno)) {
      vidas - 2;
      neptunos.splice(indice, 1);
    }
  });
  //COLISIONES de Urano
  uranos.forEach((urano, indice) => {
    if (colision(player, urano)) {
      vidas - 3;
      uranos.splice(indice, 1);
    }
  });
  //COLISIONES de  Saturno
  saturnos.forEach((saturno, indice) => {
    if (colision(player, saturno)) {
      vidas - 3;
      saturnos.splice(indice, 1);
    }
  });
  //COLISIONES de Jupiter
  jupiters.forEach((jupiter, indice) => {
    if (colision(player, jupiter)) {
      vidas - 4;
      jupiters.splice(indice, 1);
    }
  });
  //COLISIONES del Sol
  soles.forEach((sol, indice) => {
    if (colision(player, sol)) {
      vidas - 4;
      soles.splice(indice, 1);
    }
  });
  //COLISIONES DE LAS VIDAS
  amigos.forEach((amigo, indice) => {
    if (colision(player, amigo)) {
      vidas++;
      amigos.splice(indice, 1);
    }
  });
  //WIN OR GAME OVER
  if (vidas <= 0) {
    gameOver = true;
  } else if (universos >= 20) {
    gameWin = true;
  }

  //COLISIONES DE LAS COINDS
  coinds.forEach((coind, indice) => {
    if (colision(player, coind)) {
      universos++;
      coinds.splice(indice, 1);
    }
    if (universos < 5) {
      nivel = 1;
    } else if (universos >= 5 && universos < 15) {
      nivel = 2;
    } else if (universos >= 15 && universos < 20) {
      nivel = 3;
    }
  });

  //No dejar que las vidas o los universos superen el limite

  if (vidas < 1) {
    vidas = 0;
  } else if (universos > 20) {
    universos = 20;
  }

  function colision(player, objeto) {
    return (
      player.x < objeto.x + objeto.w &&
      player.x + player.w > objeto.x &&
      player.y < objeto.y + objeto.h &&
      player.y + player.h > objeto.y
    );
  }
}

/**
 * FUNCION PARA DIBUJAR
 */
function draw() {
  //Dibujar Jugador
  ctx.clearRect(0, 0, 800, 600);
  if (imgFondo.complete) ctx.drawImage(imgFondo, 0, 0, 800, 600);
  if (imgJugador.complete)
    ctx.drawImage(imgJugador, player.x, player.y, player.w, player.h);
}
//Funcion dibujar marcador
function marcador() {
  // MARCADOR
  ctx.fillStyle = "white";
  ctx.font = "16px Arial";
  ctx.fillText("Puntos: " + score, 20, 30);
  ctx.fillText("Vidas: " + vidas, 20, 50);
  ctx.fillText("Universos: " + universos, 20, 70);
  ctx.fillText("Nivel: " + nivel, 20, 90);
}
//FUNCION PORTADA
function portada() {
  ctx.clearRect(0, 0, 800, 600);
  if (imgPortada.complete) {
    ctx.drawImage(imgPortada, 0, 0, 800, 600);
  }
}
//Funcion de niveles DE JUEGO
// //NIVEL 1
function Nv1() {
  //Dibujar Mercurio
  mercurios.forEach((mercurio) => {
    if (imgMercurio.complete)
      ctx.drawImage(
        imgMercurio,
        mercurio.x,
        mercurio.y,
        mercurio.w,
        mercurio.h
      );
  });
  //Dibujar MARTE
  martes.forEach((marte) => {
    if (imgMarte.complete)
      ctx.drawImage(imgMarte, marte.x, marte.y, marte.w, marte.h);
  });
  //Dibujar Venus
  venus.forEach((venu) => {
    if (imgVenus.complete)
      ctx.drawImage(imgVenus, venu.x, venu.y, venu.w, venu.h);
  });
}

//NIVEL 2
function Nv2() {
  //Dibujar Tierra
  tierras.forEach((tierra) => {
    if (imgTierra.complete)
      ctx.drawImage(imgTierra, tierra.x, tierra.y, tierra.w, tierra.h);
  });
  //Dibujar Neptuno
  neptunos.forEach((neptuno) => {
    if (imgNeptuno.complete)
      ctx.drawImage(imgNeptuno, neptuno.x, neptuno.y, neptuno.w, neptuno.h);
  });
  //Dibujar Urano
  uranos.forEach((urano) => {
    if (imgUrano.complete)
      ctx.drawImage(imgUrano, urano.x, urano.y, urano.w, urano.h);
  });
  //Dibujar Saturno
  saturnos.forEach((saturno) => {
    if (imgSaturno.complete)
      ctx.drawImage(imgSaturno, saturno.x, saturno.y, saturno.w, saturno.h);
  });
}
//NIVEL 3
function Nv3() {
  //Dibujar meteoritos
  meteoritos.forEach((meteorito) => {
    if (imgMeteorito.complete)
      ctx.drawImage(
        imgMeteorito,
        meteorito.x,
        meteorito.y,
        meteorito.w,
        meteorito.h
      );
  });
  //Dibujar Cometas
  cometas.forEach((cometa) => {
    if (imgCometa.complete)
      ctx.drawImage(imgCometa, cometa.x, cometa.y, cometa.w, cometa.h);
  });
  //Dibujar Jupiter
  jupiters.forEach((jupiter) => {
    if (imgJupiter.complete)
      ctx.drawImage(imgJupiter, jupiter.x, jupiter.y, jupiter.w, jupiter.h);
  });
  //Dibujar Soles
  soles.forEach((sol) => {
    if (imgSol.complete) ctx.drawImage(imgSol, sol.x, sol.y, sol.w, sol.h);
  });
}
//Funcion Vidas y Coinds
function items() {
  //Dibujar Vidas
  amigos.forEach((amigo) => {
    if (imgEstrella.complete)
      ctx.drawImage(imgEstrella, amigo.x, amigo.y, amigo.w, amigo.h);
  });
  //Dibujar Coinds
  coinds.forEach((coind) => {
    if (imgCoind.complete)
      ctx.drawImage(imgCoind, coind.x, coind.y, coind.w, coind.h);
  });
}
//funcion para reiniciar variables
function reiniciarJuego() {
  vidas = 5;
  universos = 0;
  nivel = 1;
  score = 0;

  soles = [];
  meteoritos = [];
  cometas = [];
  mercurios = [];
  martes = [];
  venus = [];
  tierras = [];
  neptunos = [];
  uranos = [];
  saturnos = [];
  jupiters = [];
  amigos = [];
  coinds = [];

  gameOver = false;
  gameWin = false;
  gameStart = false;
}

function loop() {
  if (gameStart) {
    update();
    draw();
    if (nivel == 1) {
      Nv1();
      items();
    } else if (nivel == 2) {
      Nv2();
      items();
    } else if (nivel == 3) {
      Nv3();
      items();
    }
    marcador();
    // Dibujar win // GAME OVER
    if (gameOver) {
      ctx.drawImage(imgGameover, 170, 200, 500, 174);
    }
    if (gameWin) {
      ctx.drawImage(imgWin, 170, 200, 500, 174);
    }
  } else {
    portada();
  }
  requestAnimationFrame(loop);
}
loop();
