const canvas = document.getElementById("game");
const ctx = canvas.getContext("2d");
/**
 *
 * CARGAR IMAGENES
 *
 */

const imgJugador = new Image();
imgJugador.src = "img/jugador.png";

const imgCometa = new Image();
imgCometa.src = "img/cometa.png";

const imgMeteorito = new Image();
imgMeteorito.src = "img/meteorito.png";

const imgSol = new Image();
imgSol.src = "img/sol.png";

const imgMercurio = new Image();
imgMercurio.src = "img/mercurio.png";

const imgVenus = new Image();
imgVenus.src = "img/venus.png";

const imgTierra = new Image();
imgTierra.src = "img/tierra.png";

const imgMarte = new Image();
imgMarte.src = "img/marte.png";

const imgJupiter = new Image();
imgJupiter.src = "img/jupiter.png";

const imgSaturno = new Image();
imgSaturno.src = "img/saturno.png";

const imgUrano = new Image();
imgUrano.src = "img/urano.png";

const imgNeptuno = new Image();
imgNeptuno.src = "img/neptuno.png";

const imgCoind = new Image();
imgCoind.src = "img/universos.png";

const imgEstrella = new Image();
imgEstrella.src = "img/estrella.png";

const imgFondo = new Image();
imgFondo.src = "img/fondo.png";

const imgPortada = new Image();
imgPortada.src = "img/Instrucciones.jpg";

const imgWin = new Image();
imgWin.src = "img/You win.png";

const imgGameover = new Image();
imgGameover.src = "img/GAMEOVER.png";

const imgEscudo = new Image();
imgEscudo.src = "img/escudo.png";

//Musica de Fondo
const musicaFondo = new Audio("audio/fondo.mp3");
musicaFondo.loop = true; // Para que se repita infinitamente
musicaFondo.volume = 0.5; // Volumen de 0 a 1
//Musica de derrota
const sonidoGameOver = new Audio("audio/gameover.mp3");
//Musica de victoria
const sonidoWin = new Audio("audio/win.mp3");

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
let escudos = [];
let score = 0;
let vidas = 5;
let universos = 0;
let nivel = 1;
let gameStart = false;
let gameOver = false;
let gameWin = false;
let escudoActivo = false;
let duracionEscudo = 300;
let contadorEscudo = 0;

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
//crear Universos Enbotellados
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
//Crear Escudos
function crearEscudos() {
  let posicion = Math.random() * (800 - 45);
  let velocidad = Math.random() * (5 - 2) + 2;
  escudos.push({
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
    musicaFondo.play();
  }
});
//REINICIAR JUEGO
document.addEventListener("keydown", (e) => {
  if ((gameOver || gameWin) && e.key === "Enter") {
    reiniciarJuego();
    musicaFondo.play();
  }
});

function update() {
  if (gameOver || gameWin) return;

  // Reiniciamos velocidad horizontal
  player.vx = 0;

  // Movimiento horizontal
  if (keys["ArrowLeft"]) player.vx = -4;
  else if (keys["ArrowRight"]) player.vx = 4;

  // Movimiento vertical
  if (keys["ArrowDown"]) player.y += 4;
  if (keys["ArrowUp"]) player.y -= 4;

  // Aplicar movimiento horizontal
  player.x += player.vx;

  // Evitar que el jugador salga de la pantalla
  if (player.x < 0) player.x = 0;
  if (player.x + player.w > 800) player.x = 800 - player.w;
  if (player.y + player.h > 600) player.y = 600 - player.h;
  if (player.y < 0) player.y = 0;

  // --- GENERAR Y MOVER ENEMIGOS SEGÚN NIVEL ---
  if (nivel === 1) {
    // Mercurio
    mercurios.forEach((m) => (m.y += m.vy));
    mercurios = mercurios.filter((m) => m.y < 600);
    if (Math.random() < 0.02) crearMercurios();

    // Marte
    martes.forEach((m) => (m.y += m.vy));
    martes = martes.filter((m) => m.y < 600);
    if (Math.random() < 0.001) crearMartes();

    // Venus
    venus.forEach((v) => (v.y += v.vy));
    venus = venus.filter((v) => v.y < 600);
    if (Math.random() < 0.001) crearVenus();
  }

  if (nivel === 2) {
    // Tierra
    tierras.forEach((t) => (t.y += t.vy));
    tierras = tierras.filter((t) => t.y < 600);
    if (Math.random() < 0.02) crearTierras();

    // Neptuno
    neptunos.forEach((n) => (n.y += n.vy));
    neptunos = neptunos.filter((n) => n.y < 600);
    if (Math.random() < 0.02) crearNeptunos();

    // Urano
    uranos.forEach((u) => (u.y += u.vy));
    uranos = uranos.filter((u) => u.y < 600);
    if (Math.random() < 0.002) crearUranos();

    // Saturno
    saturnos.forEach((s) => (s.y += s.vy));
    saturnos = saturnos.filter((s) => s.y < 600);
    if (Math.random() < 0.003) crearSaturnos();
  }

  if (nivel === 3) {
    // Meteoritos
    meteoritos.forEach((m) => (m.y += m.vy));
    meteoritos = meteoritos.filter((m) => m.y < 600);
    if (Math.random() < 0.02) crearMeteoritos();

    // Cometas
    cometas.forEach((c) => (c.y += c.vy));
    cometas = cometas.filter((c) => c.y < 600);
    if (Math.random() < 0.001) crearCometas();

    // Júpiter
    jupiters.forEach((j) => (j.y += j.vy));
    jupiters = jupiters.filter((j) => j.y < 600);
    if (Math.random() < 0.005) crearJupiters();

    // Soles
    soles.forEach((s) => (s.y += s.vy));
    soles = soles.filter((s) => s.y < 600);
    if (Math.random() < 0.001) crearSoles();
  }

  // --- Items (vidas, coinds, escudos) ---
  amigos.forEach((a) => (a.y += a.vy));
  amigos = amigos.filter((a) => a.y < 600);
  if (Math.random() < 0.01) crearAmigos();

  coinds.forEach((c) => (c.y += c.vy));
  coinds = coinds.filter((c) => c.y < 600);
  if (Math.random() < 0.007) crearCoinds();

  escudos.forEach((e) => (e.y += e.vy));
  escudos = escudos.filter((e) => e.y < 600);
  if (Math.random() < 0.005) crearEscudos();

  // --- COLISIONES ---
  // Vidas
  amigos.forEach((amigo, i) => {
    if (colision(player, amigo)) {
      vidas++;
      amigos.splice(i, 1);
    }
  });

  // Escudos
  escudos.forEach((escudo, i) => {
    if (colision(player, escudo)) {
      activarEscudo();
      escudos.splice(i, 1);
    }
  });

  // Enemigos
  const enemigosPorNivel = {
    1: [...mercurios, ...martes, ...venus],
    2: [...tierras, ...neptunos, ...uranos, ...saturnos],
    3: [...meteoritos, ...cometas, ...jupiters, ...soles],
  };

  for (const enemigo of enemigosPorNivel[nivel]) {
    let array;
    switch (nivel) {
      case 1:
        array = [mercurios, martes, venus];
        break;
      case 2:
        array = [tierras, neptunos, uranos, saturnos];
        break;
      case 3:
        array = [meteoritos, cometas, jupiters, soles];
        break;
    }
    for (let arr of array) {
      arr.forEach((obj, i) => {
        if (colision(player, obj)) {
          if (!escudoActivo) {
            if (obj === tierras) vidas -= 2;
            else if (obj === jupiters) vidas -= 4;
            else if ([saturnos, uranos, neptunos].includes(arr)) vidas -= 3;
            else vidas--;
          }
          arr.splice(i, 1);
        }
      });
    }
  }

  // Contador del escudo
  if (escudoActivo) {
    contadorEscudo--;
    if (contadorEscudo <= 0) escudoActivo = false;
  }

  // Win / Game Over
  if (vidas <= 0) gameOver = true;
  if (universos >= 20) gameWin = true;

  // Colisiones coinds
  coinds.forEach((coind, i) => {
    if (colision(player, coind)) {
      universos++;
      coinds.splice(i, 1);
    }
  });

  // Ajustar nivel según universos
  if (universos < 5) nivel = 1;
  else if (universos < 15) nivel = 2;
  else if (universos < 20) nivel = 3;

  // Limitar valores
  if (vidas < 0) vidas = 0;
  if (universos > 20) universos = 20;
}

function colision(player, objeto) {
  if (!objeto) {
    console.warn("Objeto inválido en colision:", objeto);
    return false;
  }
  const choque =
    player.x < objeto.x + objeto.w &&
    player.x + player.w > objeto.x &&
    player.y < objeto.y + objeto.h &&
    player.y + player.h > objeto.y;
  return choque;
}

//FUNCION DE ESCUDO
function activarEscudo() {
  if (!escudoActivo) {
    escudoActivo = true;
    contadorEscudo = duracionEscudo;
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
  //Dibujo del escudo con imagen
  if (escudoActivo && imgEscudo.complete) {
    const escudoPadding = 10; // Espacio extra alrededor del jugador
    ctx.drawImage(
      imgEscudo,
      player.x - escudoPadding,
      player.y - escudoPadding,
      player.w + escudoPadding * 2,
      player.h + escudoPadding * 2
    );
  }
}
//Funcion dibujar marcador
function marcador() {
  // MARCADOR
  ctx.fillStyle = "white";
  ctx.font = "16px Arial";
  ctx.fillText("Puntos: " + score, 20, 30);
  ctx.fillText("Vidas: " + vidas, 20, 50);
  //hacer que el escudo quede en segundos
  ctx.fillText(
    "Escudo: " + (escudoActivo ? Math.ceil(contadorEscudo / 60) : 0),
    20,
    70
  );
  ctx.fillText("Universos: " + universos, 20, 90);
  ctx.fillText("Nivel: " + nivel, 20, 110);
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
  //Dibujar Escudos
  escudos.forEach((escudo) => {
    if (imgEscudo.complete)
      ctx.drawImage(imgEscudo, escudo.x, escudo.y, escudo.w, escudo.h);
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

  escudoActivo = false;
  duracionEscudo = 300;
  contadorEscudo = 0;
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
      musicaFondo.pause();
      sonidoGameOver.play();
    }
    if (gameWin) {
      ctx.drawImage(imgWin, 150, 200, 500, 174);
      musicaFondo.pause();
      sonidoWin.play();
    }
  } else {
    portada();
  }
  requestAnimationFrame(loop);
}
loop();
