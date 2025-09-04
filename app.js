// ===============================
// 🌸 Lógica principal de la PWA (sin galería de imágenes)
// ===============================

// Inicializar animaciones AOS
AOS.init();

// Registrar Service Worker
if ('serviceWorker' in navigator) {
  window.addEventListener('load', () => {
    navigator.serviceWorker.register('/sw.js')
      .then(registration => {
        console.log('Service Worker registrado con éxito:', registration);
      })
      .catch(error => {
        console.log('Error registrando Service Worker:', error);
      });
  });
}

// ===============================
// 📅 Contador de días y hitos
// ===============================

// Fecha en que se conocieron
const startDate = new Date("2025-08-02T00:00:00");

// Hitos importantes
const milestones = [
  { name: "Primer Mes", date: "2025-09-11" },
  { name: "Segundo Mes", date: "2025-10-11" },
  { name: "Tercer Mes", date: "2025-11-11" },
  { name: "Cuarto Mes", date: "2025-12-11" },
  { name: "Quinto Mes", date: "2026-01-11" }, 
  { name: "Medio Año", date: "2026-02-11" }, 
  { name: "Septimo Mes", date: "2026-03-11" },
  { name: "Octavo Mes", date: "2026-04-11" },
  { name: "Noveno Mes", date: "2026-05-11" },
  { name: "Decimo Mes", date: "2026-06-11" },
  { name: "Onceavo Mes", date: "2026-07-11" },
  { name: "Aniversario", date: "2026-08-11" },
  { name: "Cumpleaños", date: "2027-08-11" }
];

// Calcular días desde startDate
function getDaysSinceStart() {
  const now = new Date();
  const diff = now - startDate;
  return Math.floor(diff / (1000 * 60 * 60 * 24));
}

// Renderizar hito visible
function renderMilestones() {
  const list = document.getElementById("milestones-list");
  list.innerHTML = "";

  const now = new Date();

  const visibleMilestone = milestones.find((m, i) => {
    const date = new Date(m.date);
    const nextMilestone = milestones[i + 1];
    const nextDate = nextMilestone ? new Date(nextMilestone.date) : null;
    const oneDay = 1000 * 60 * 60 * 24;

    return date <= now && (!nextDate || now < (nextDate - oneDay));
  });

  if (visibleMilestone) {
    const date = new Date(visibleMilestone.date);
    const diffDays = Math.floor((now - date) / (1000 * 60 * 60 * 24));
    const li = document.createElement("li");
    li.textContent = `${visibleMilestone.name} — ${diffDays === 0 ? '¡Hoy!' : `hace ${diffDays} días`} (${visibleMilestone.date})`;
    list.appendChild(li);
  } else {
    const li = document.createElement("li");
    li.textContent = "No hay hitos visibles todavía.";
    list.appendChild(li);
  }
}

// Animación contador
function animateCount(element, target) {
  let start = 0;
  const duration = 1000;
  const increment = target / (duration / 16);

  function step() {
    start += increment;
    if (start < target) {
      element.textContent = Math.floor(start) + " días";
      requestAnimationFrame(step);
    } else {
      element.textContent = target + " días";
    }
  }
  step();
}

// Obtener próximo hito futuro
function getNextMilestone() {
  const now = new Date();
  const futureMilestones = milestones.filter(m => new Date(m.date) > now);
  if (futureMilestones.length === 0) return null;
  futureMilestones.sort((a, b) => new Date(a.date) - new Date(b.date));
  return futureMilestones[0];
}

// Actualizar cuenta regresiva
function updateCountdown() {
  const milestone = getNextMilestone();
  const countdownEl = document.getElementById('next-countdown');

  if (!milestone) {
    countdownEl.textContent = "¡No hay próximos hitos!";
    return;
  }

  const now = new Date();
  const target = new Date(milestone.date);
  const diff = target - now;

  if (diff <= 0) {
    countdownEl.textContent = `¡Hoy es ${milestone.name}! 🎉`;
    return;
  }

  const days = Math.floor(diff / (1000 * 60 * 60 * 24));
  const hours = Math.floor((diff / (1000 * 60 * 60)) % 24);
  const minutes = Math.floor((diff / (1000 * 60)) % 60);
  const seconds = Math.floor((diff / 1000) % 60);

  countdownEl.textContent =
    `Faltan ${days}d ${hours}h ${minutes}m ${seconds}s para ${milestone.name}`;
}

// ===============================
// 🌗 Modo oscuro
// ===============================
const toggleBtn = document.getElementById('theme-toggle');
const icon = toggleBtn.querySelector('.icon');
const label = toggleBtn.querySelector('.label');

toggleBtn.addEventListener('click', () => {
  document.body.classList.toggle('dark');

  if (document.body.classList.contains('dark')) {
    icon.textContent = "🌞";
    label.textContent = "Modo claro";
    icon.style.transform = "rotate(360deg)";
  } else {
    icon.textContent = "🌙";
    label.textContent = "Modo oscuro";
    icon.style.transform = "rotate(-360deg)";
  }
});

// ===============================
// 📤 Compartir contador
// ===============================
function shareCounter() {
  const daysSinceStart = getDaysSinceStart();
  const text = `¡Llevamos ${daysSinceStart} días juntos! 💖`;

  if (navigator.share) {
    navigator.share({
      title: 'Nuestro contador de amor',
      text: text,
      url: window.location.href,
    }).then(() => {
      console.log('Compartido con éxito');
    }).catch(console.error);
  } else {
    alert('Tu navegador no soporta compartir directamente. Puedes copiar el texto:\n' + text);
  }
}


// ===============================
// 💕 Frases románticas
// ===============================
const frases = [
  "Contigo, cada día es el mejor de mi vida 💕",
  "Eres mi persona favorita en el mundo 🌍💖",
  "Nuestro amor no tiene final, solo capítulos hermosos 📖💞",
  "Desde que te conocí, sonrío más y lloro menos 😊💘",
  "Eres mi hoy, mi mañana y mi siempre ✨",
  "Desde que llegaste, cada día es un nuevo motivo para sonreír 😊",
"Hay muchos momentos hermosos en la vida pero sin duda el mejor de ellos fue cuando te conocí ✨",
"No necesito un paraíso, porque tú eres mi cielo ☁️",
"Tu amor es la luz que ilumina mi camino 💡",
"Eres mi pensamiento favorito al despertar 🌅",
"Eres mi refugio en días de tormenta ⛈️",
"Gracias por ser mi compañera, mi amiga y el amor que me completa 🙏",
"Me encanta perderme en tu mirada 👀",
"A tu lado, la vida es un bello cuento sin final 📖",
"Eres la melodía que hace latir mi corazón más fuerte 🎶",
"Mi lugar favorito es donde tú estés 📍",
"Eres la sonrisa que necesito después de un día largo 😊",
"Amarte es la aventura que más disfruto 🗺️",
"Quiero ser el motivo de tus mejores sueños 😴",
"En cada abrazo tuyo encuentro mi hogar 🤗",
"Contigo, todo tiene un color más bonito 🎨",
"Te amo más allá de las palabras 💖",
"Mi corazón late con un ritmo que solo tú entiendes 💓",
"Gracias por enseñarme el verdadero significado del amor 🙏",
"Eres el regalo más hermoso que la vida me dio 🎁",
"Tu risa es mi sonido favorito 😂",
"A tu lado aprendí que el amor es paciencia y ternura ❤️‍🩹",
"Quisiera detener el tiempo cuando estoy contigo ⏳",
"Eres la respuesta a todas mis preguntas ❓",
"Tu amor me transforma cada día ✨",
"Contar contigo es contar con lo mejor de la vida 🤝",
"Me haces querer ser mejor cada día 💪",
"Eres la calma en mi caos 🧘‍♀️",
"Amo la forma en que haces que todo sea sencillo 😊",
"Eres mi mayor bendición, gracias por regalarme tu amor sincero 🙏",
"Tú eres la poesía que le da sentido a mis días 📜",
"Gracias por ser tú, con tus locuras y perfecciones 🥰",
"No hay mayor regalo que tenerte en mi vida, gracias por ser tú 💝",
"Contigo aprendí que amar es también confiar 🤝",
"Eres mi sol en días nublados ☀️",
"Cada instante contigo vale más que mil palabras 💬",
"Quiero escribir mil historias a tu lado ✍️",
"Eres el sueño del que nunca quiero despertar 😴",
"Tu amor es mi fuerza y mi paz 💪",
"Me haces reír cuando más lo necesito 😂",
"Contigo aprendí que el verdadero amor existe y que es para toda la vida 💖",
"En ti encontré mi lugar seguro 🔒",
"Gracias por hacerme sentir amado cada día 🥰",
"Eres mi pensamiento constante y mi alegría 💭",
"Me encantas con todos tus detalles ✨",
"Quiero recorrer el mundo contigo de la mano 🗺️",
"Tu sonrisa tiene el poder de sanar cualquier herida 😊",
"Eres mi inspiración para seguir adelante 🌟",
"Me haces sentir que todo es posible 🙌",
"Eres el motivo de mis mejores días 💖",
"Tu tristeza no me asusta, amor. Si un día no puedes sonreír, me quedaré a tu lado en silencio, hasta que el alma vuelva a abrir las ventanas 😔",
"Te amo más allá del infinito 💖",
"Eres mi destino y mi mejor elección 💖",
"Gracias por ser mi compañera de vida 🤝",
"En tus ojos veo mi futuro más feliz 👀",
"Quiero ser tu refugio en las tormentas ☔️",
"No necesito nada más en el mundo, solo tenerte a ti a mi lado 🌍",
"Contigo aprendí que el tiempo se vuelve infinito cuando se comparte con el alma gemela ⏳",
"Tu amor es el regalo que siempre agradezco 🎁",
"Amo cada instante que paso contigo 🥰",
"Eres el sol que ilumina mi mundo ☀️",
"Gracias por ser mi alegría constante 😄",
"Me encanta cuando me miras con esos ojos llenos de amor 👀",
"Eres mi paz en medio del caos 🕊️",
"Quiero construir sueños a tu lado 🏠",
"Eres el latido más bonito de mi corazón 💖",
"Me haces creer en la magia del amor ✨",
"Tu sonrisa es mi debilidad y mi fuerza 😊",
"Si fueras un postre, serías mi dulce favorito… y yo, el que nunca quiere compartir 🍰",
"Eres mi tentación y sueño favoritos 🤤",
"A tu lado, todo es posible 💪",
"Me encantas por dentro y por fuera 🥰",
"Quiero perderme en tus abrazos 🤗",
"Eres el sueño que nunca quiero dejar de soñar, la realidad que siempre quiero vivir 😴",
"Gracias por ser la mejor parte de mí 🙏",
"Eres mi refugio en los días difíciles ⛈️",
"Cada instante a tu lado me recuerda la suerte que tengo de haberte encontrado 🍀",
"Sin ti, mi vida no tendría ese brillo especial que solo el amor verdadero puede dar ✨",
"Gracias por hacerme sonreír cada día 😊",
"Gracias por llenar mi vida de amor, risas y momentos inolvidables ❤️",
"Contigo todo tiene sentido 🤔",
"Quiero escribir nuestra historia juntos ✍️",
"Me encantas más que ayer 🥰",
"Eres la luz que guía mi camino 💡",
"No importa cuántos años pasen, siempre voy a querer tomarte de la mano como la primera vez 🤝",
"Tu amor es mi mayor tesoro 💎",
"Me haces sentir vivo y feliz 😊",
"Eres mi razón para soñar despierto 💭",
"Gracias por cada momento juntos 🙏",
"Eres el amor que siempre quise tener 🥰",
"Me encanta la forma en que me haces reír 😂",
"Tu sonrisa es mi medicina 😊",
"Gracias por ser mi mejor amiga y mi gran amor 👩‍❤️‍💋‍👨",
"No sé qué hiciste, pero desde que estás, todo tiene más sentido 💖",
"En un universo de millones de almas, la mía eligió la tuya sin dudar 🌌",
"Aun si todo se apaga, yo seré la chispa que encienda tus ganas de seguir 🔥",
"Quiero ser tu abrazo eterno 🤗",
"Gracias por cada día que compartes conmigo 🙏",
"Eres mi sueño hecho realidad 💫",
"Aunque el mundo tiemble y los días se nublen, mi amor por ti será siempre un refugio cálido y constante 🌎",
"Tu amor es mi mayor bendición 🙏",
"Eres mi mejor historia de amor. ❤️",
"Tu risa es mi sonido favorito. 😂",
"Te amo más que al WiFi... y eso es mucho. 📶",
"Contigo todo es más fácil, incluso los días difíciles. 🤝",
"Me haces creer que lo imposible sí existe. ✨",
"Quisiera pausarte en un abrazo eterno. 🤗",
"Si amarte es un error, no quiero tener la razón. 💖",
"Eres arte, y yo soy feliz siendo tu admirador. 🎨",
"Te pienso y sonrío como tonto, y no me importa. 😊",
"Nuestro amor no tiene fecha de vencimiento. ♾️",
"A veces me dan celos... de tu almohada. 😴",
"Eres el motivo de todos mis buenos días. ☀️",
"Nuestro amor es mi lugar favorito para estar. 🏡",
"Te amaría incluso si fueras el último trozo de pizza. 🍕",
"Eres mi poesía diaria, mi paz constante. 📜",
"No sabía que se podía amar tanto hasta que llegaste tú. 🥰",
"Te elijo hoy, mañana y cada uno de mis días. 💖",
"Tus besos tienen superpoderes, lo juro. 😘",
"Mi amor por ti solo sabe crecer. 🌱",
"Eres ese mensaje que nunca me canso de leer. 💌",
"Tu amor es mi mejor hábito. ❤️",
"Juntos somos caos, pero del bonito. 🤪",
"Si tú eres locura, entonces no quiero ser cuerdo. 😜",
"Tú eres mi destino favorito. ✈️",
"Eres mi hoy y todos mis mañanas. 💖",
"En tus ojos encuentro mi hogar. 👀",
"Cuando pienso en amor, pienso en ti. 🤔",
"No necesito suerte, te tengo a ti. 🍀",
"Me haces feliz sin siquiera intentarlo. 😊",
"Tu amor me queda perfecto. 👌",
"Estar contigo es mi mejor decisión. 💖",
"Tu risa es mi buena suerte. 😂",
"Mi lugar favorito: donde estás tú. 📍",
"No hay nadie como tú, y eso me encanta. ✨",
"Eres la respuesta a todas mis preguntas. ❓",
"Tú haces que todo valga la pena. 👍",
"Amarte es mi pasatiempo favorito. ❤️",
"No sé qué hice para merecerte, pero lo agradezco. 🙏",
"A veces solo quiero abrazarte y no soltar jamás. 🤗",
"Tú eres mi motivo, mi calma, mi alegría. 💖",
"Cada beso tuyo me reinicia el alma. 💋",
"Si tú estás, lo demás no importa tanto. 💖",
"Me gustas más que dormir hasta tarde. 😴",
"Cuando dices mi nombre, todo cobra sentido. ✨",
"Amar es fácil cuando se trata de ti. ❤️",
"Tu voz es mi canción favorita. 🎶",
"Qué suerte la mía de encontrarte. 🍀",
"Mi mundo cambió el día que te conocí. 🌎",
"Cada instante contigo vale oro. ⏳",
"Amar contigo se siente como en casa. 🏡",
"Eres mejor que cualquier sueño que haya tenido. 💭",
"Me haces creer en la magia. ✨",
"Nuestro amor es mi aventura favorita. 💖",
"Tus ojos tienen el brillo de mis mejores días. 👀",
"Quiero todo contigo, incluso lo que no entiendo. 🤝",
"Cuando sonríes, se me olvida el resto del mundo. 😊",
"Siempre es buen momento para amarte. ❤️",
"Eres ese pedacito de cielo que me tocó. ☁️",
"A tu lado, hasta el silencio es bonito. 🤫",
"Gracias por ser tú, justo así. 🙏",
"Cada segundo contigo vale una eternidad. ⏳",
"Si tú ríes, yo respiro mejor. 😂",
"Amarte me queda bien. 😉",
"Me haces falta incluso cuando estás cerca. 🥺",
"Si fueras tiempo, querría detenerte. ⏱️",
"Tu amor me hace valiente. 💪",
"No sé escribir poesía, pero te tengo a ti. 📜",
"Amar contigo es aprender a volar sin miedo. 🕊️",
"Cada día a tu lado es un regalo que nunca dejo de agradecer. 🎁",
"Tu amor es la melodía que llena de alegría mi corazón. 🎶",
"Me haces sentir que soy la persona más afortunada del mundo. 💖",
"En tus ojos encuentro mi hogar y mi paz. 👀",
"Gracias por ser mi compañera, mi amiga y mi amor eterno. 🙏",
"Tu sonrisa ilumina incluso mis días más oscuros. 😊",
"Contigo aprendí que el amor verdadero no tiene límites. ❤️",
"Amarte es el mejor viaje que he emprendido en la vida. ✈️",
"Cada instante contigo es un poema que quiero escribir para siempre. ✍️",
"Tu abrazo es mi refugio donde todo cobra sentido. 🤗",
"Eres la razón por la que creo en los milagros. ✨",
"Tu amor es el motor que impulsa mis sueños. 🚀",
"Gracias por llenar mi vida de risas y cariño. 😂",
"En tus brazos encuentro la fuerza para seguir adelante. 💪",
"Eres el mejor capítulo de mi historia. 📖",
"Amarte es la aventura más dulce que he vivido. 🍬",
"Tu presencia hace que todo valga la pena. 🥰",
"Me encanta cómo haces que cada día sea especial. ✨",
"Tu amor me transforma y me inspira. 💖",
"Eres el sueño hecho realidad que no quiero despertar. 😴",
"Gracias por ser luz en mis momentos de oscuridad. 💡",
"Tu risa es el sonido que siempre quiero escuchar. 😂",
"Amarte es un regalo que nunca dejaré de apreciar. 🎁",
"Cada día contigo es una nueva oportunidad para ser feliz. 😄",
"Tu amor es el refugio donde siempre quiero estar. ❤️",
"Eres mi inspiración para ser mejor cada día. 🌟",
"Gracias por ser mi compañera en esta aventura llamada vida. 🤝",
"En ti encontré mi mejor amigo y mi amor eterno. 💖",
"Tu sonrisa tiene el poder de iluminar mi mundo. 😊",
"Amarte es el regalo más hermoso que la vida me ha dado. 💝",
"Contigo aprendí que el amor verdadero no tiene fecha de caducidad. 🗓️",
"Tu cariño es mi tesoro más preciado. 💎",
"Gracias por hacerme sentir amado cada día. 🥰",
"Tu amor es la melodía que llena mi alma de alegría. 🎶",
"Eres el sueño del que nunca quiero despertar. 💫",
"Amarte es la historia que quiero contar siempre. 📖",
"Tu presencia hace que todo tenga sentido. 💖",
"Gracias por ser mi fuerza y mi calma en un solo ser. 💪",
"Tu sonrisa es mi sol en los días nublados. ☀️",
"Contigo aprendí que amar es también cuidar y respetar. ❤️",
"Tu amor es el mejor regalo que podría recibir. 🎁",
"Eres el latido que da vida a mi corazón. 💓",
"Gracias por ser la razón de mis sonrisas. 😊",
"Amarte me hace sentir completo y feliz. 🥰",
"Tu mirada tiene el poder de calmar mi alma. 👀",
"Contigo quiero construir un futuro lleno de amor. 🏠",
"Tu amor es la fuerza que me impulsa a seguir soñando. ✨",
"Gracias por ser mi cómplice y mi amor incondicional. 💖",
"En ti encontré el hogar que siempre busqué. 🏡",
"Tu sonrisa es el regalo que quiero recibir cada día. 😊",
"Amarte es la aventura más hermosa de mi vida. 💖",
"Gracias por hacer de mi vida un lugar mejor. 🙏",
"Tu amor es la luz que ilumina mi camino. 💡",
"Eres el sueño que se hizo realidad en mi vida. 💫",
"Contigo quiero compartir cada instante y cada alegría. 🥰",
"Tu amor me llena de energía y esperanza. ✨",
"Gracias por ser mi refugio y mi paz. 🕊️",
"Amarte es la mejor decisión que he tomado. ✅",
"Tu sonrisa es la melodía que quiero escuchar siempre. 🎶",
"Eres mi sol, mi luna y todas mis estrellas. ☀️",
"Gracias por ser mi compañera de vida y mi gran amor. 💖",
"Contigo cada día es una nueva oportunidad para ser feliz. 😄",
"Tu amor es el refugio donde siempre encuentro paz. ❤️",
"Amarte es el regalo que más valoro en la vida. 🎁",
"Gracias por ser mi inspiración y mi fuerza. 💪",
"Tu sonrisa es el sol que ilumina mi mundo. 😊",
"Eres la razón por la que creo en el amor verdadero. 🥰",
"Contigo aprendí que el amor es paciencia y ternura. 💖",
"Feliz 1 mes a la única persona que sabe lo raro que soy… y todavía me quiere. 😜",
"Amarte es la historia que quiero contar todos los días de mi vida. 📖"
];


let indiceFrase = 0;
const loveQuoteEl = document.getElementById("love-quote");

function mostrarFraseRomantica() {
  loveQuoteEl.classList.remove("animate");
  loveQuoteEl.textContent = frases[indiceFrase];
  void loveQuoteEl.offsetWidth; // reinicia animación
  loveQuoteEl.classList.add("animate");
  indiceFrase = (indiceFrase + 1) % frases.length;
}

// ===============================
// 🚀 Inicialización
// ===============================
document.addEventListener("DOMContentLoaded", () => {
  renderMilestones();

  // Animar contador días desde inicio
  const daysSinceStart = getDaysSinceStart();
  animateCount(document.getElementById("main-count"), daysSinceStart);

  // Actualizar cuenta regresiva cada segundo
  updateCountdown();
  setInterval(updateCountdown, 1000);

  // Actualizar hitos cada hora
  setInterval(renderMilestones, 1000 * 60 * 60);

  // Frases románticas
  mostrarFraseRomantica();
  setInterval(mostrarFraseRomantica, 10000);
});
