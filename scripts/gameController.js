// gameController.js
// Lógica principal del juego Fragmentum en JS puro

// i18n simple local para el juego
function getLang() { 
  return localStorage.getItem('language') || 'es';
}
function L() {
  const lang = getLang();
  const txt = {
    es: {
      pregunta: 'Pregunta', puntos: 'Puntos', volverMenu: 'Volver al menú', enviarRespuesta: 'Enviar Respuesta',
      correcto: '¡Correcto!', incorrecto: '¡Incorrecto!', invalida: 'Fracción inválida (denominador es cero)',
      felicidades: '¡Felicidades!', completasteTodo: 'Has completado todos los niveles disponibles.',
      puntajeFinal: 'Tu puntuación final', nivelCompletado: '¡Nivel Completado!', siguienteNivel: 'Siguiente nivel',
      hasCompletado: (lvl) => `¡Felicidades, ${user.name}! Has completado el nivel ${lvl}.`,
      hasDesbloqueado: (name) => `¡Has desbloqueado la recompensa <b>${name}</b>!`,
      tuPuntaje: 'Tu puntuación',
      nivel: 'NIVEL',
      haSubidoNivel: '¡Has subido de nivel!',
      vidas: 'Vidas',
      racha: 'Racha',
      record: 'Récord',
      modoSupervivencia: 'Supervivencia',
      abandonar: 'Abandonar',
      seguroAbandonar: '¿Seguro que quieres abandonar la partida?',
      finDelJuego: '¡Fin del Juego!',
      partidaAbandonada: 'Partida Abandonada',
      nuevoRecord: '¡NUEVO RECORD DE PUNTUACIÓN!',
      nuevaRacha: '¡NUEVA MEJOR RACHA!',
      puntuacionFinal: 'Puntuación Final',
      recordPersonal: 'Record Personal',
      preguntasRespondidas: 'Preguntas Respondidas',
      rachaActual: 'Racha Actual',
      mejorRachaPersonal: 'Mejor Racha Personal',
      nivelAlcanzado: 'Nivel Alcanzado',
      jugarDeNuevo: '🔄 Jugar de Nuevo',
      volverModos: '🏠 Volver a Modos',
      pista: 'Pista usada: Se eliminaron 2 opciones incorrectas',
      segundaOportunidad: 'Segunda oportunidad: +1 vida restaurada',
      tiempoExtra: 'Tiempo extra: +10 segundos añadidos',
      vidasAgotadas: '💀 ¡Se acabaron las vidas!',
      tiempoAgotado: '⏰ ¡Se agotó el tiempo!',
      preguntaFraccion: '¿Qué fracción representa la parte resaltada?',
      preguntaSuma: '¿Cuál es el resultado de la suma?',
      preguntaResta: '¿Cuál es el resultado de la resta?',
      vidasRestantes: 'Vidas restantes',
      explicacionFraccion: (d, n) => `Hay ${d} partes en total y ${n} están resaltadas.`,
      explicacionSuma: (f1, f2, resultado) => `${f1} + ${f2} = ${resultado}`,
      explicacionResta: (f1, f2, resultado) => `${f1} - ${f2} = ${resultado}`
    },
    en: {
      pregunta: 'Question', puntos: 'Points', volverMenu: 'Back to menu', enviarRespuesta: 'Submit Answer',
      correcto: 'Correct!', incorrecto: 'Incorrect!', invalida: 'Invalid fraction (denominator is zero)',
      felicidades: 'Congratulations!', completasteTodo: 'You have completed all available levels.',
      puntajeFinal: 'Your final score', nivelCompletado: 'Level Completed!', siguienteNivel: 'Next level',
      hasCompletado: (lvl) => `Congratulations, ${user.name}! You completed level ${lvl}.`,
      hasDesbloqueado: (name) => `You unlocked the reward <b>${name}</b>!`,
      tuPuntaje: 'Your score',
      nivel: 'LEVEL',
      haSubidoNivel: 'You leveled up!',
      vidas: 'Lives',
      racha: 'Streak',
      record: 'Record',
      modoSupervivencia: 'Survival',
      abandonar: 'Quit',
      seguroAbandonar: 'Are you sure you want to quit the game?',
      finDelJuego: 'Game Over!',
      partidaAbandonada: 'Game Abandoned',
      nuevoRecord: '🏆 NEW HIGH SCORE!',
      nuevaRacha: '🔥 NEW BEST STREAK!',
      puntuacionFinal: 'Final Score',
      recordPersonal: 'Personal Record',
      preguntasRespondidas: 'Questions Answered',
      rachaActual: 'Current Streak',
      mejorRachaPersonal: 'Best Streak',
      nivelAlcanzado: 'Level Reached',
      jugarDeNuevo: '🔄 Play Again',
      volverModos: '🏠 Back to Modes',
      pista: '🎯 Hint used: Removed 2 incorrect options',
      segundaOportunidad: '💪 Second chance: +1 life restored',
      tiempoExtra: '⏰ Extra time: +10 seconds added',
      vidasAgotadas: '💀 No lives left!',
      tiempoAgotado: '⏰ Time\'s up!',
      preguntaFraccion: 'What fraction represents the highlighted part?',
      preguntaSuma: 'What is the result of the addition?',
      preguntaResta: 'What is the result of the subtraction?',
      vidasRestantes: 'Lives remaining',
      explicacionFraccion: (d, n) => `There are ${d} parts in total and ${n} are highlighted.`,
      explicacionSuma: (f1, f2, resultado) => `${f1} + ${f2} = ${resultado}`,
      explicacionResta: (f1, f2, resultado) => `${f1} - ${f2} = ${resultado}`
    }
  };
  return txt[lang];
}

// Usuario con sistema de experiencia
const user = { 
  name: 'Jugador', 
  score: parseInt(localStorage.getItem('totalScore') || '0'), 
  currentLevel: 1, 
  rewards: [],
  // Sistema de experiencia
  xp: parseInt(localStorage.getItem('userXP') || '0'),
  level: parseInt(localStorage.getItem('userLevel') || '1'),
  visualStyle: localStorage.getItem('visualStyle') || 'mixed' // mixed, pizza, bar
};

// Utilidades
function gcd(a,b){ while(b){ [a,b]=[b,a%b]; } return a; }
function makeFrac(n,d){ return `${n}/${d}`; }

// Sistema de experiencia
function getXPForLevel(level) {
  return level * 100; // 100 XP por nivel, escalable
}

function addXP(amount) {
  user.xp += amount;
  checkLevelUp();
  saveUserProgress();
}

function checkLevelUp() {
  const xpNeeded = getXPForLevel(user.level);
  if (user.xp >= xpNeeded) {
    user.level++;
    user.xp -= xpNeeded;
    showLevelUpNotification();
    checkLevelUp(); // Revisar si puede subir más niveles
  }
}

function showLevelUpNotification() {
  const notification = document.createElement('div');
  notification.className = 'level-up-notification';
  notification.innerHTML = `
    <div class="level-up-content">
      <div class="level-up-icon">🎉</div>
      <div class="level-up-text">
        <h3>${L().nivel} ${user.level}!</h3>
        <p>${L().haSubidoNivel}</p>
      </div>
    </div>
  `;
  document.body.appendChild(notification);
  
  setTimeout(() => {
    notification.remove();
  }, 3000);
}

function saveUserProgress() {
  localStorage.setItem('userXP', user.xp.toString());
  localStorage.setItem('userLevel', user.level.toString());
  localStorage.setItem('visualStyle', user.visualStyle);
  localStorage.setItem('totalScore', user.score.toString());
}

function getUserTitle() {
  if (user.level >= 50) return 'Leyenda Matemática';
  if (user.level >= 30) return 'Maestro Supremo';
  if (user.level >= 20) return 'Experto Avanzado';
  if (user.level >= 10) return 'Matemático Hábil';
  if (user.level >= 5) return 'Aprendiz Dedicado';
  return 'Novato Prometedor';
}

// Función para generar preguntas de suma de fracciones
function generateAdditionQuestion(levelIdx, qIdx) {
  console.log(`🔵 Generando pregunta de SUMA para nivel ${levelIdx + 1}, pregunta ${qIdx + 1}`);
  
  // Escalamiento de dificultad por nivel
  let maxDen = 6;
  if (levelIdx >= 3) maxDen = 8;      // niveles 4-6
  if (levelIdx >= 6) maxDen = 12;     // niveles 7-9
  if (levelIdx >= 9) maxDen = 16;     // niveles 10-12

  let d1, n1, d2, n2;
  
  // Para niveles más fáciles, usar mismo denominador
  if (levelIdx < 4) {
    d1 = d2 = 2 + Math.floor(Math.random() * (maxDen - 1));
    n1 = 1 + Math.floor(Math.random() * (d1 - 1));
    n2 = 1 + Math.floor(Math.random() * (d2 - 1));
    // Asegurar que la suma no sea impropia
    if (n1 + n2 >= d1) {
      n2 = Math.max(1, d1 - n1 - 1);
    }
  } else {
    // Para niveles más difíciles, usar denominadores diferentes
    d1 = 2 + Math.floor(Math.random() * (maxDen - 1));
    d2 = 2 + Math.floor(Math.random() * (maxDen - 1));
    n1 = 1 + Math.floor(Math.random() * (d1 - 1));
    n2 = 1 + Math.floor(Math.random() * (d2 - 1));
  }

  const frac1 = makeFrac(n1, d1);
  const frac2 = makeFrac(n2, d2);
  
  // Calcular la suma
  const commonDen = d1 * d2 / gcd(d1, d2); // MCM
  const newN1 = n1 * (commonDen / d1);
  const newN2 = n2 * (commonDen / d2);
  const sumN = newN1 + newN2;
  
  // Simplificar el resultado
  const g = gcd(sumN, commonDen);
  const resultN = sumN / g;
  const resultD = commonDen / g;
  const correct = makeFrac(resultN, resultD);

  // Generar distractores
  const opts = new Set([correct]);
  
  // Distractor: sumar numeradores sin encontrar denominador común
  if (d1 === d2) {
    opts.add(makeFrac(n1 + n2 + 1, d1)); // Error común + 1
    opts.add(makeFrac(n1 + n2 - 1, d1)); // Error común - 1
  } else {
    opts.add(makeFrac(n1 + n2, Math.max(d1, d2))); // Error: solo sumar numeradores
  }
  
  // Distractor: error en denominador
  opts.add(makeFrac(resultN, resultD + 1));
  opts.add(makeFrac(resultN + 1, resultD));
  
  // Completar hasta 4 opciones
  while (opts.size < 4) {
    const dn = 1 + Math.floor(Math.random() * maxDen);
    const nn = 1 + Math.floor(Math.random() * dn);
    opts.add(makeFrac(nn, dn));
  }

  const options = Array.from(opts).slice(0, 4);
  // Mezclar opciones
  for (let i = options.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1));
    [options[i], options[j]] = [options[j], options[i]];
  }

  const lang = getLang();
  const esText = L().preguntaSuma;
  const enText = lang === 'en' ? L().preguntaSuma : 'What is the result of the addition?';
  const esExp = L().explicacionSuma(frac1, frac2, correct);
  const enExp = lang === 'en' ? L().explicacionSuma(frac1, frac2, correct) : `${frac1} + ${frac2} = ${correct}`;

  const question = {
    id: qIdx + 1,
    type: 'addition',
    text: { es: esText, en: enText },
    question: { es: `${frac1} + ${frac2} = ?`, en: `${frac1} + ${frac2} = ?` },
    options,
    answer: correct,
    correctAnswers: [correct],
    points: 15, // Más puntos por ser más difícil
    explanation: { es: esExp, en: enExp },
    visualAid: { type: 'operation', operation: '+', fractions: [{ numerator: n1, denominator: d1 }, { numerator: n2, denominator: d2 }] }
  };
  
  console.log('✅ Pregunta de SUMA creada:', question.type, 'operador:', question.visualAid.operation);
  return question;
}

// Función para generar preguntas de resta de fracciones
function generateSubtractionQuestion(levelIdx, qIdx) {
  console.log(`🔴 Generando pregunta de RESTA para nivel ${levelIdx + 1}, pregunta ${qIdx + 1}`);
  
  // Escalamiento de dificultad por nivel
  let maxDen = 6;
  if (levelIdx >= 3) maxDen = 8;      // niveles 4-6
  if (levelIdx >= 6) maxDen = 12;     // niveles 7-9
  if (levelIdx >= 9) maxDen = 16;     // niveles 10-12

  let d1, n1, d2, n2;
  
  // Para niveles más fáciles, usar mismo denominador
  if (levelIdx < 4) {
    d1 = d2 = 2 + Math.floor(Math.random() * (maxDen - 1));
    n1 = 2 + Math.floor(Math.random() * (d1 - 2)); // Asegurar que n1 > 1
    n2 = 1 + Math.floor(Math.random() * (n1 - 1)); // Asegurar que n2 < n1
  } else {
    // Para niveles más difíciles, usar denominadores diferentes
    d1 = 2 + Math.floor(Math.random() * (maxDen - 1));
    d2 = 2 + Math.floor(Math.random() * (maxDen - 1));
    n1 = 2 + Math.floor(Math.random() * (d1 - 2));
    n2 = 1 + Math.floor(Math.random() * (d2 - 1));
    
    // Verificar que el resultado sea positivo
    const val1 = n1 / d1;
    const val2 = n2 / d2;
    if (val1 <= val2) {
      [n1, d1, n2, d2] = [n2, d2, n1, d1]; // Intercambiar para que n1/d1 > n2/d2
    }
  }

  const frac1 = makeFrac(n1, d1);
  const frac2 = makeFrac(n2, d2);
  
  // Calcular la resta
  const commonDen = d1 * d2 / gcd(d1, d2); // MCM
  const newN1 = n1 * (commonDen / d1);
  const newN2 = n2 * (commonDen / d2);
  const diffN = newN1 - newN2;
  
  // Simplificar el resultado
  const g = gcd(diffN, commonDen);
  const resultN = diffN / g;
  const resultD = commonDen / g;
  const correct = makeFrac(resultN, resultD);

  // Generar distractores
  const opts = new Set([correct]);
  
  // Distractor: restar numeradores sin encontrar denominador común
  if (d1 === d2) {
    if (n1 - n2 + 1 < d1) opts.add(makeFrac(n1 - n2 + 1, d1)); // Error común + 1
    if (n1 - n2 - 1 > 0) opts.add(makeFrac(n1 - n2 - 1, d1)); // Error común - 1
  } else {
    if (n1 - n2 > 0) opts.add(makeFrac(n1 - n2, Math.max(d1, d2))); // Error: solo restar numeradores
  }
  
  // Distractor: error en denominador
  if (resultN > 0) opts.add(makeFrac(resultN, resultD + 1));
  if (resultN + 1 < resultD) opts.add(makeFrac(resultN + 1, resultD));
  
  // Completar hasta 4 opciones
  while (opts.size < 4) {
    const dn = 2 + Math.floor(Math.random() * maxDen);
    const nn = 1 + Math.floor(Math.random() * (dn - 1));
    opts.add(makeFrac(nn, dn));
  }

  const options = Array.from(opts).slice(0, 4);
  // Mezclar opciones
  for (let i = options.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1));
    [options[i], options[j]] = [options[j], options[i]];
  }

  const lang = getLang();
  const esText = L().preguntaResta;
  const enText = lang === 'en' ? L().preguntaResta : 'What is the result of the subtraction?';
  const esExp = L().explicacionResta(frac1, frac2, correct);
  const enExp = lang === 'en' ? L().explicacionResta(frac1, frac2, correct) : `${frac1} - ${frac2} = ${correct}`;

  const question = {
    id: qIdx + 1,
    type: 'subtraction',
    text: { es: esText, en: enText },
    question: { es: `${frac1} - ${frac2} = ?`, en: `${frac1} - ${frac2} = ?` },
    options,
    answer: correct,
    correctAnswers: [correct],
    points: 15, // Más puntos por ser más difícil
    explanation: { es: esExp, en: enExp },
    visualAid: { type: 'operation', operation: '-', fractions: [{ numerator: n1, denominator: d1 }, { numerator: n2, denominator: d2 }] }
  };
  
  console.log('✅ Pregunta de RESTA creada:', question.type, 'operador:', question.visualAid.operation);
  return question;
}

function generateQuestion(levelIdx, qIdx){
  // Escalamiento de dificultad por nivel
  let maxDen = 6;
  if (levelIdx >= 3) maxDen = 8;      // niveles 4-6
  if (levelIdx >= 6) maxDen = 12;     // niveles 7-9
  if (levelIdx >= 9) maxDen = 16;     // niveles 10-12

  // Elegir tipo visual (se determinará en renderizado según configuración del usuario)
  const types = ['pizza', 'bar'];
  const type = types[(levelIdx + qIdx) % types.length];

  // Decidir si esta pregunta tendrá respuestas múltiples (30% de probabilidad)
  const allowMultipleCorrect = Math.random() < 0.3;

  // Elegir fracción
  let d = 2 + Math.floor(Math.random() * (maxDen - 1));
  let n = 1 + Math.floor(Math.random() * (d - 1));

  // Asegurar que la fracción no sea imposible
  if (n >= d) n = d - 1;
  if (n < 1) n = 1;

  // Si permitimos respuestas múltiples, forzar fracciones simplificables
  if (allowMultipleCorrect && levelIdx >= 2) {
    const factors = [2,3,4];
    const f = factors[Math.floor(Math.random()*factors.length)];
    const baseD = Math.max(2, Math.min(6, 2 + Math.floor(Math.random() * 4)));
    const baseN = Math.max(1, Math.min(baseD-1, 1 + Math.floor(Math.random() * (baseD-1))));
    n = baseN * f;
    d = baseD * f;
    // Verificar que no sea mayor que maxDen
    if (d > maxDen) {
      d = baseD;
      n = baseN;
    }
  }

  // Construir opciones
  const correct = makeFrac(n,d);
  const opts = new Set([correct]);
  
  // Lista de respuestas correctas
  const correctAnswers = [correct];
  
  // Solo añadir equivalencias si esta pregunta permite múltiples respuestas
  if (allowMultipleCorrect) {
    // Añadir la versión simplificada como respuesta correcta también
    const g = gcd(n,d);
    if (g > 1) {
      const simplified = makeFrac(n/g, d/g);
      opts.add(simplified);
      correctAnswers.push(simplified);
    }

    // Añadir otras equivalencias válidas (solo si hay espacio)
    for (let mult = 2; mult <= 3 && opts.size < 3; mult++) {
      if (n*mult <= maxDen && d*mult <= maxDen) {
        const equivalent = makeFrac(n*mult, d*mult);
        opts.add(equivalent);
        correctAnswers.push(equivalent);
      }
    }
  }

  // Distractores incorrectos
  // Distractor: mismo numerador, otro denominador
  const d2 = Math.max(2, Math.min(d+((Math.random()<0.5)?-1:1), maxDen));
  if (d2 !== d && n < d2) opts.add(makeFrac(n, d2));
  
  // Distractor: numerador incorrecto
  if (n > 1 && opts.size < 4) opts.add(makeFrac(n-1, d));
  if (n < d-1 && opts.size < 4) opts.add(makeFrac(n+1, d));
  
  // Distractor: denominador incorrecto 
  if (d > 2 && opts.size < 4) opts.add(makeFrac(n, d-1));

  // Completar hasta 4 opciones únicas si es necesario
  while (opts.size < 4){
    const dn = 2 + Math.floor(Math.random()*(maxDen-1));
    const nn = 1 + Math.floor(Math.random()*(dn-1));
    const frac = makeFrac(nn,dn);
    // No agregar si es equivalente a la respuesta correcta (solo si no permitimos múltiples)
    if (allowMultipleCorrect || !correctAnswers.some(ans => {
      const [n1, d1] = ans.split('/').map(Number);
      const [n2, d2] = frac.split('/').map(Number);
      return (n1 * d2) === (n2 * d1);
    })) {
      opts.add(frac);
    }
  }
  
  const options = Array.from(opts).slice(0,4);
  // Mezclar opciones
  for (let i = options.length-1; i>0; i--){
    const j = Math.floor(Math.random()*(i+1));
    [options[i], options[j]] = [options[j], options[i]];
  }

  // Textos genéricos que funcionan con todos los tipos visuales
  const lang = getLang();
  const esText = L().preguntaFraccion;
  const enText = lang === 'en' ? L().preguntaFraccion : 'Which fraction represents the highlighted part?';

  const esExp = L().explicacionFraccion(d, n);
  const enExp = lang === 'en' ? L().explicacionFraccion(d, n) : `There are ${d} parts in total and ${n} are highlighted.`;

  return {
    id: qIdx + 1,
    text: { es: esText, en: enText },
    options,
    answer: correct,
    correctAnswers: allowMultipleCorrect ? correctAnswers : [correct], // Solo múltiples si está permitido
    points: 10,
    explanation: { es: esExp, en: enExp },
    visualAid: { type, fractions: [{ numerator: n, denominator: d }] }
  };
}

function seedLevels(total = 12) {
  console.log(`🎯 Generando ${total} niveles...`);
  
  return Array.from({ length: total }, (_, i) => {
    console.log(`📁 Generando nivel ${i + 1}...`);
    const used = new Set();
    const questions = [];
    let attempts = 0;
    
    while (questions.length < 10 && attempts < 200){
      let q;
      
      // Para nivel 1, solo preguntas visuales
      if (i === 0) {
        console.log(`   🟢 Pregunta ${questions.length + 1}: VISUAL (nivel 1)`);
        q = generateQuestion(i, questions.length);
      } else {
        // Para niveles 2+, distribución progresiva de tipos de preguntas
        const questionIndex = questions.length;
        
        // Distribución progresiva según el nivel:
        // Nivel 2-3: 70% visuales, 15% suma, 15% resta
        // Nivel 4-6: 50% visuales, 25% suma, 25% resta  
        // Nivel 7-9: 30% visuales, 35% suma, 35% resta
        // Nivel 10-12: 20% visuales, 40% suma, 40% resta
        
        let visualChance, mathChance;
        if (i <= 2) {           // Niveles 2-3
          visualChance = 7;     // 70%
          mathChance = 1.5;     // 15% cada una
        } else if (i <= 5) {    // Niveles 4-6
          visualChance = 5;     // 50%
          mathChance = 2.5;     // 25% cada una
        } else if (i <= 8) {    // Niveles 7-9
          visualChance = 3;     // 30%
          mathChance = 3.5;     // 35% cada una
        } else {                // Niveles 10-12
          visualChance = 2;     // 20%
          mathChance = 4;       // 40% cada una
        }
        
        // Seleccionar tipo de pregunta basado en la distribución
        if (questionIndex < visualChance) {
          console.log(`   🟢 Pregunta ${questions.length + 1}: VISUAL (nivel ${i+1})`);
          q = generateQuestion(i, questions.length);
        } else if (questionIndex < visualChance + mathChance) {
          console.log(`   🔵 Pregunta ${questions.length + 1}: SUMA (nivel ${i+1})`);
          q = generateAdditionQuestion(i, questions.length);
        } else {
          console.log(`   🔴 Pregunta ${questions.length + 1}: RESTA (nivel ${i+1})`);
          q = generateSubtractionQuestion(i, questions.length);
        }
      }
      
      // Crear clave única basada en el tipo de pregunta
      let key;
      if (q.type === 'addition' || q.type === 'subtraction') {
        const frac1 = q.visualAid.fractions[0];
        const frac2 = q.visualAid.fractions[1];
        key = `${q.type}-${frac1.numerator}/${frac1.denominator}-${frac2.numerator}/${frac2.denominator}`;
      } else {
        key = `visual-${q.visualAid.fractions[0].numerator}/${q.visualAid.fractions[0].denominator}-${q.visualAid.type || 'pizza'}`;
      }
      
      if (!used.has(key)){
        used.add(key);
        questions.push(q);
      }
      attempts++;
    }
    return {
      name: String(i + 1),
      unlocked: i === 0,
      questions,
      rewardOnCompletion: { id: `medalla${i + 1}`, name: `Medalla ${i + 1}`, unlocked: false }
    };
  });
}

// Sistema de niveles
console.log('🚀 Iniciando sistema de niveles...');

let levels = seedLevels(12);
// Merge estado desbloqueado desde localStorage si existe
try {
  const saved = JSON.parse(localStorage.getItem('levels_progress')); // Usar clave diferente para progreso
  if (Array.isArray(saved) && saved.length) {
    for (let i = 0; i < levels.length; i++) {
      if (saved[i] && typeof saved[i].unlocked === 'boolean') {
        levels[i].unlocked = saved[i].unlocked;
      }
    }
  }
} catch(_) {}

// Cachear las preguntas generadas para evitar regenerarlas
const QUESTIONS_CACHE_KEY = 'fragmentum_questions_cache';
const CACHE_VERSION = '1.0';

function getCachedQuestions() {
  try {
    const cached = localStorage.getItem(QUESTIONS_CACHE_KEY);
    if (cached) {
      const data = JSON.parse(cached);
      if (data.version === CACHE_VERSION && data.questions) {
        return data.questions;
      }
    }
  } catch(_) {}
  return null;
}

function setCachedQuestions(questions) {
  try {
    localStorage.setItem(QUESTIONS_CACHE_KEY, JSON.stringify({
      version: CACHE_VERSION,
      questions: questions,
      timestamp: Date.now()
    }));
  } catch(_) {}
}

// Usar preguntas cacheadas si están disponibles
const cachedQuestions = getCachedQuestions();
if (cachedQuestions && cachedQuestions.length === 12) {
  console.log('Usando preguntas cacheadas');
  levels = cachedQuestions;
  // Actualizar estado de unlock desde localStorage
  try {
    const saved = JSON.parse(localStorage.getItem('levels'));
    if (Array.isArray(saved) && saved.length) {
      for (let i = 0; i < levels.length; i++) {
        if (saved[i] && typeof saved[i].unlocked === 'boolean') {
          levels[i].unlocked = saved[i].unlocked;
        }
      }
    }
  } catch(_) {}
} else {
  console.log('Generando nuevas preguntas y cacheando');
  setCachedQuestions(levels);
}

// --- Estado del juego ---
let currentLevelIdx = 0;
let currentQuestionIdx = 0;
let feedbackTimeout = null;

// Estado del Modo Supervivencia
let gameMode = 'campaign'; // 'campaign' o 'survival'
let survivalState = {
  lives: 3,
  streak: 0,
  questionCount: 0,
  difficultyLevel: 1,
  multiplier: 1,
  powerUps: {
    secondChance: 0,
    timeBonus: 0,
    eliminateTwo: 0
  },
  totalScore: 0,
  bestStreak: parseInt(localStorage.getItem('survivalBestStreak') || '0'),
  highScore: parseInt(localStorage.getItem('survivalHighScore') || '0'),
  responseTimeDelay: false, // Para controlar el tiempo de respuesta
  currentTimeLeft: 15 // Tiempo restante del temporizador actual
};

// Funciones del Modo Supervivencia
function resetSurvivalState() {
  survivalState.lives = 3;
  survivalState.streak = 0;
  survivalState.questionCount = 0;
  survivalState.difficultyLevel = 1;
  survivalState.multiplier = 1;
  survivalState.totalScore = 0;
  survivalState.responseTimeDelay = false;
  survivalState.currentTimeLeft = 15;
  // Dar 1 power-up de cada tipo al iniciar
  survivalState.powerUps = { secondChance: 1, timeBonus: 1, eliminateTwo: 1 };
}

function updateSurvivalDifficulty() {
  const questionsForNext = Math.floor(survivalState.questionCount / 10) + 1;
  survivalState.difficultyLevel = questionsForNext;
  
  // Actualizar multiplicador basado en racha
  if (survivalState.streak >= 25) survivalState.multiplier = 3;
  else if (survivalState.streak >= 15) survivalState.multiplier = 2.5;
  else if (survivalState.streak >= 10) survivalState.multiplier = 2;
  else if (survivalState.streak >= 5) survivalState.multiplier = 1.5;
  else survivalState.multiplier = 1;
}

function generateSurvivalQuestion() {
  // Dificultad basada en el nivel de supervivencia
  let maxDen = 6;
  if (survivalState.difficultyLevel >= 3) maxDen = 8;
  if (survivalState.difficultyLevel >= 5) maxDen = 12;
  if (survivalState.difficultyLevel >= 8) maxDen = 16;
  if (survivalState.difficultyLevel >= 12) maxDen = 20;

  // A partir del nivel 2 de dificultad, incluir operaciones
  const questionTypes = ['visual'];
  if (survivalState.difficultyLevel >= 2) {
    questionTypes.push('addition', 'subtraction');
  }
  
  // Elegir tipo de pregunta aleatoriamente
  const questionType = questionTypes[Math.floor(Math.random() * questionTypes.length)];
  
  // Generar pregunta según el tipo
  if (questionType === 'addition') {
    return generateSurvivalAdditionQuestion(maxDen);
  } else if (questionType === 'subtraction') {
    return generateSurvivalSubtractionQuestion(maxDen);
  } else {
    return generateSurvivalVisualQuestion(maxDen);
  }
}

function generateSurvivalVisualQuestion(maxDen) {
  // Elegir tipo visual aleatorio para supervivencia
  const types = ['pizza', 'bar'];
  const type = types[Math.floor(Math.random() * types.length)];
  
  // Mayor probabilidad de respuestas múltiples en niveles altos
  const allowMultipleCorrect = Math.random() < (0.2 + survivalState.difficultyLevel * 0.05);

  let d = 2 + Math.floor(Math.random() * (maxDen - 1));
  let n = 1 + Math.floor(Math.random() * (d - 1));

  if (n >= d) n = d - 1;
  if (n < 1) n = 1;

  // Lógica similar a generateQuestion pero adaptada para supervivencia
  if (allowMultipleCorrect && survivalState.difficultyLevel >= 3) {
    const factors = [2,3,4];
    const f = factors[Math.floor(Math.random()*factors.length)];
    const baseD = Math.max(2, Math.min(6, 2 + Math.floor(Math.random() * 4)));
    const baseN = Math.max(1, Math.min(baseD-1, 1 + Math.floor(Math.random() * (baseD-1))));
    n = baseN * f;
    d = baseD * f;
    if (d > maxDen) {
      d = baseD;
      n = baseN;
    }
  }

  const correct = makeFrac(n,d);
  const opts = new Set([correct]);
  const correctAnswers = [correct];
  
  if (allowMultipleCorrect) {
    const g = gcd(n,d);
    if (g > 1) {
      const simplified = makeFrac(n/g, d/g);
      opts.add(simplified);
      correctAnswers.push(simplified);
    }

    for (let mult = 2; mult <= 3 && opts.size < 3; mult++) {
      if (n*mult <= maxDen && d*mult <= maxDen) {
        const equivalent = makeFrac(n*mult, d*mult);
        opts.add(equivalent);
        correctAnswers.push(equivalent);
      }
    }
  }

  // Distractores más desafiantes en niveles altos
  if (survivalState.difficultyLevel >= 5) {
    // Distractores muy similares
    const closeD = d + (Math.random() < 0.5 ? 1 : -1);
    if (closeD > 1 && n < closeD) opts.add(makeFrac(n, closeD));
  }
  
  const d2 = Math.max(2, Math.min(d+((Math.random()<0.5)?-1:1), maxDen));
  if (d2 !== d && n < d2) opts.add(makeFrac(n, d2));
  
  if (n > 1 && opts.size < 4) opts.add(makeFrac(n-1, d));
  if (n < d-1 && opts.size < 4) opts.add(makeFrac(n+1, d));

  while (opts.size < 4){
    const dn = 2 + Math.floor(Math.random()*(maxDen-1));
    const nn = 1 + Math.floor(Math.random()*(dn-1));
    const frac = makeFrac(nn,dn);
    if (allowMultipleCorrect || !correctAnswers.some(ans => {
      const [n1, d1] = ans.split('/').map(Number);
      const [n2, d2] = frac.split('/').map(Number);
      return (n1 * d2) === (n2 * d1);
    })) {
      opts.add(frac);
    }
  }
  
  const options = Array.from(opts).slice(0,4);
  for (let i = options.length-1; i>0; i--){
    const j = Math.floor(Math.random()*(i+1));
    [options[i], options[j]] = [options[j], options[i]];
  }

  const esText = L().preguntaFraccion;
  const esExp = L().explicacionFraccion(d, n);

  const basePoints = 10;
  const difficultyBonus = Math.floor(survivalState.difficultyLevel * 2);
  const totalPoints = Math.floor((basePoints + difficultyBonus) * survivalState.multiplier);

  return {
    id: survivalState.questionCount + 1,
    text: { es: esText, en: esText },
    options,
    answer: correct,
    correctAnswers: allowMultipleCorrect ? correctAnswers : [correct],
    points: totalPoints,
    explanation: { es: esExp, en: esExp },
    visualAid: { type, fractions: [{ numerator: n, denominator: d }] }
  };
}

function generateSurvivalAdditionQuestion(maxDen) {
  let d1, n1, d2, n2;
  
  // Para supervivencia, ajustar dificultad según el nivel
  if (survivalState.difficultyLevel < 5) {
    // Mismo denominador para niveles más fáciles
    d1 = d2 = 2 + Math.floor(Math.random() * (maxDen - 1));
    n1 = 1 + Math.floor(Math.random() * (d1 - 1));
    n2 = 1 + Math.floor(Math.random() * (d2 - 1));
    if (n1 + n2 >= d1) {
      n2 = Math.max(1, d1 - n1 - 1);
    }
  } else {
    // Denominadores diferentes para niveles más difíciles
    d1 = 2 + Math.floor(Math.random() * (maxDen - 1));
    d2 = 2 + Math.floor(Math.random() * (maxDen - 1));
    n1 = 1 + Math.floor(Math.random() * (d1 - 1));
    n2 = 1 + Math.floor(Math.random() * (d2 - 1));
  }

  const frac1 = makeFrac(n1, d1);
  const frac2 = makeFrac(n2, d2);
  
  // Calcular la suma
  const commonDen = d1 * d2 / gcd(d1, d2);
  const newN1 = n1 * (commonDen / d1);
  const newN2 = n2 * (commonDen / d2);
  const sumN = newN1 + newN2;
  
  const g = gcd(sumN, commonDen);
  const resultN = sumN / g;
  const resultD = commonDen / g;
  const correct = makeFrac(resultN, resultD);

  // Generar distractores
  const opts = new Set([correct]);
  
  if (d1 === d2) {
    opts.add(makeFrac(n1 + n2 + 1, d1));
    opts.add(makeFrac(n1 + n2 - 1, d1));
  } else {
    opts.add(makeFrac(n1 + n2, Math.max(d1, d2)));
  }
  
  opts.add(makeFrac(resultN, resultD + 1));
  opts.add(makeFrac(resultN + 1, resultD));
  
  while (opts.size < 4) {
    const dn = 1 + Math.floor(Math.random() * maxDen);
    const nn = 1 + Math.floor(Math.random() * dn);
    opts.add(makeFrac(nn, dn));
  }

  const options = Array.from(opts).slice(0, 4);
  for (let i = options.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1));
    [options[i], options[j]] = [options[j], options[i]];
  }

  const lang = getLang();
  const esText = L().preguntaSuma;
  const enText = lang === 'en' ? L().preguntaSuma : 'What is the result of the addition?';
  const esExp = L().explicacionSuma(frac1, frac2, correct);
  const enExp = lang === 'en' ? L().explicacionSuma(frac1, frac2, correct) : `${frac1} + ${frac2} = ${correct}`;

  const basePoints = 15;
  const difficultyBonus = Math.floor(survivalState.difficultyLevel * 3);
  const totalPoints = Math.floor((basePoints + difficultyBonus) * survivalState.multiplier);

  return {
    id: survivalState.questionCount + 1,
    type: 'addition',
    text: { es: esText, en: enText },
    question: { es: `${frac1} + ${frac2} = ?`, en: `${frac1} + ${frac2} = ?` },
    options,
    answer: correct,
    correctAnswers: [correct],
    points: totalPoints,
    explanation: { es: esExp, en: enExp },
    visualAid: { type: 'operation', operation: '+', fractions: [{ numerator: n1, denominator: d1 }, { numerator: n2, denominator: d2 }] }
  };
}

function generateSurvivalSubtractionQuestion(maxDen) {
  let d1, n1, d2, n2;
  
  if (survivalState.difficultyLevel < 5) {
    // Mismo denominador para niveles más fáciles
    d1 = d2 = 2 + Math.floor(Math.random() * (maxDen - 1));
    n1 = 2 + Math.floor(Math.random() * (d1 - 2));
    n2 = 1 + Math.floor(Math.random() * (n1 - 1));
  } else {
    // Denominadores diferentes para niveles más difíciles
    d1 = 2 + Math.floor(Math.random() * (maxDen - 1));
    d2 = 2 + Math.floor(Math.random() * (maxDen - 1));
    n1 = 2 + Math.floor(Math.random() * (d1 - 2));
    n2 = 1 + Math.floor(Math.random() * (d2 - 1));
    
    const val1 = n1 / d1;
    const val2 = n2 / d2;
    if (val1 <= val2) {
      [n1, d1, n2, d2] = [n2, d2, n1, d1];
    }
  }

  const frac1 = makeFrac(n1, d1);
  const frac2 = makeFrac(n2, d2);
  
  // Calcular la resta
  const commonDen = d1 * d2 / gcd(d1, d2);
  const newN1 = n1 * (commonDen / d1);
  const newN2 = n2 * (commonDen / d2);
  const diffN = newN1 - newN2;
  
  const g = gcd(diffN, commonDen);
  const resultN = diffN / g;
  const resultD = commonDen / g;
  const correct = makeFrac(resultN, resultD);

  // Generar distractores
  const opts = new Set([correct]);
  
  if (d1 === d2) {
    if (n1 - n2 + 1 < d1) opts.add(makeFrac(n1 - n2 + 1, d1));
    if (n1 - n2 - 1 > 0) opts.add(makeFrac(n1 - n2 - 1, d1));
  } else {
    if (n1 - n2 > 0) opts.add(makeFrac(n1 - n2, Math.max(d1, d2)));
  }
  
  if (resultN > 0) opts.add(makeFrac(resultN, resultD + 1));
  if (resultN + 1 < resultD) opts.add(makeFrac(resultN + 1, resultD));
  
  while (opts.size < 4) {
    const dn = 2 + Math.floor(Math.random() * maxDen);
    const nn = 1 + Math.floor(Math.random() * (dn - 1));
    opts.add(makeFrac(nn, dn));
  }

  const options = Array.from(opts).slice(0, 4);
  for (let i = options.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1));
    [options[i], options[j]] = [options[j], options[i]];
  }

  const lang = getLang();
  const esText = L().preguntaResta;
  const enText = lang === 'en' ? L().preguntaResta : 'What is the result of the subtraction?';
  const esExp = L().explicacionResta(frac1, frac2, correct);
  const enExp = lang === 'en' ? L().explicacionResta(frac1, frac2, correct) : `${frac1} - ${frac2} = ${correct}`;

  const basePoints = 15;
  const difficultyBonus = Math.floor(survivalState.difficultyLevel * 3);
  const totalPoints = Math.floor((basePoints + difficultyBonus) * survivalState.multiplier);

  return {
    id: survivalState.questionCount + 1,
    type: 'subtraction',
    text: { es: esText, en: enText },
    question: { es: `${frac1} - ${frac2} = ?`, en: `${frac1} - ${frac2} = ?` },
    options,
    answer: correct,
    correctAnswers: [correct],
    points: totalPoints,
    explanation: { es: esExp, en: enExp },
    visualAid: { type: 'operation', operation: '-', fractions: [{ numerator: n1, denominator: d1 }, { numerator: n2, denominator: d2 }] }
  };
}

// --- Utilidades visuales ---

// Inicializar el juego al cargar la página
document.addEventListener('DOMContentLoaded', () => {
  showModeSelector();
});

function showModeSelector() {
  document.getElementById('mode-selector').style.display = 'block';
  document.getElementById('niveles-root').style.display = 'none';
  document.getElementById('game-root').style.display = 'none';
  
  // Event listeners para los modos
  document.getElementById('campaignMode').onclick = () => {
    gameMode = 'campaign';
    showLevelSelector();
  };
  
  document.getElementById('survivalMode').onclick = () => {
    gameMode = 'survival';
    startSurvivalMode();
  };
  
  document.getElementById('volverMenuModos').onclick = () => {
    window.location.href = 'menu.html';
  };
}

function showLevelSelector() {
  document.getElementById('mode-selector').style.display = 'none';
  document.getElementById('niveles-root').style.display = 'block';
  document.getElementById('game-root').style.display = 'none';
  
  // Intenta leer el índice del nivel seleccionado desde localStorage
  const idx = parseInt(localStorage.getItem('currentLevelIdx') || '0', 10);
  if (!Number.isNaN(idx)) currentLevelIdx = Math.min(Math.max(0, idx), levels.length - 1);
}

function startSurvivalMode() {
  resetSurvivalState();
  document.getElementById('mode-selector').style.display = 'none';
  document.getElementById('niveles-root').style.display = 'none';
  document.getElementById('game-root').style.display = 'block';
  renderSurvivalGame();
}
function renderPizzaVisual(fraction) {
  const { numerator, denominator } = fraction;
  if (denominator === 0) return `<p class="feedback incorrect">${L().invalida}</p>`;
  const displayDenominator = Math.min(denominator, 12);
  const displayNumerator = Math.min(numerator, displayDenominator);
  const anglePerSlice = 360 / displayDenominator;
  let slices = '';
  for (let i = 0; i < displayDenominator; i++) {
    const startAngle = i * anglePerSlice;
    const endAngle = (i + 1) * anglePerSlice;
    const x1 = 50 + 50 * Math.cos(Math.PI / 180 * startAngle);
    const y1 = 50 + 50 * Math.sin(Math.PI / 180 * startAngle);
    const x2 = 50 + 50 * Math.cos(Math.PI / 180 * endAngle);
    const y2 = 50 + 50 * Math.sin(Math.PI / 180 * endAngle);
    const largeArcFlag = anglePerSlice > 180 ? 1 : 0;
    const pathData = `M50,50 L${x1},${y1} A50,50 0 ${largeArcFlag},1 ${x2},${y2} Z`;
    slices += `<path d="${pathData}" fill="${i < displayNumerator ? '#007bff' : '#e0e0e0'}" stroke="#333" stroke-width="1" />`;
  }
  return `<div class="visual-aid"><svg viewBox="-10 -10 120 120" width="150" height="150" style="transform: rotate(-90deg);">${slices}</svg></div>`;
}

function renderBarVisual(fraction) {
  const { numerator, denominator } = fraction;
  if (denominator === 0) return `<p class="feedback incorrect">${L().invalida}</p>`;
  const displayDenominator = Math.min(denominator, 10);
  const displayNumerator = Math.min(numerator, displayDenominator);
  let bars = '';
  for (let i = 0; i < displayDenominator; i++) {
    bars += `<div style="flex:1;height:100%;background:${i < displayNumerator ? '#007bff' : '#e0e0e0'};border-right:${i < displayDenominator-1 ? '1px solid #ccc' : 'none'}"></div>`;
  }
  return `<div class="visual-aid" style="display:flex;width:200px;height:32px;border:1px solid #333;border-radius:6px;overflow:hidden;box-shadow:0 1px 4px #0001;">${bars}</div>`;
}

function getVisualType(originalType) {
  // Si el usuario ha seleccionado un estilo específico, usarlo
  if (user.visualStyle !== 'mixed') {
    switch(user.visualStyle) {
      case 'pizza': return 'pizza';
      case 'bar': return 'bar';
      default: return 'pizza'; // Fallback to pizza if style not available
    }
  }
  
  // Modo mixto: alternar entre todos los tipos disponibles
  const types = ['pizza', 'bar'];
  const randomIndex = Math.floor(Math.random() * types.length);
  return types[randomIndex];
}

function renderVisualAid(aid) {
  if (!aid || !aid.fractions || aid.fractions.length === 0) return '';
  
  // Si es una operación matemática, mostrar solo los visuales
  if (aid.type === 'operation') {
    const frac1 = aid.fractions[0];
    const frac2 = aid.fractions[1];
    
    // Asegurar que el operador coincida exactamente con el que se guardó
    let operation = aid.operation;
    
    // Verificación de seguridad para asegurar que el operador sea correcto
    if (operation !== '+' && operation !== '-') {
      console.error('⚠️ Operador inválido detectado:', operation);
      operation = '+'; // Valor por defecto
    }
    
    console.log(`🔍 Renderizando operación: ${operation} (original: ${aid.operation})`);
    
    // Decidir tipo visual (alternando entre pizza y barra)
    const usePizza = Math.random() < 0.5;
    const visual1 = usePizza ? renderPizzaVisual(frac1) : renderBarVisual(frac1);
    const visual2 = usePizza ? renderPizzaVisual(frac2) : renderBarVisual(frac2);
    
    return `
      <div class="operation-display">
        <div class="visual-fractions">
          <div class="fraction-visual">
            ${visual1}
          </div>
          <div class="operation-symbol">
            <span class="big-operator">${operation}</span>
          </div>
          <div class="fraction-visual">
            ${visual2}
          </div>
          <div class="equals-symbol">
            <span class="big-equals">=</span>
          </div>
          <div class="result-symbol">
            <span class="big-question">?</span>
          </div>
        </div>
      </div>
      <style>
        .operation-display {
          text-align: center;
          margin: 20px 0;
        }
        .visual-fractions {
          display: flex;
          justify-content: center;
          align-items: center;
          gap: 20px;
          margin: 20px 0;
          flex-wrap: wrap;
        }
        .fraction-visual {
          text-align: center;
        }
        .operation-symbol, .equals-symbol, .result-symbol {
          display: flex;
          align-items: center;
          justify-content: center;
          min-width: 40px;
        }
        .big-operator, .big-equals, .big-question {
          font-size: 2.5em;
          font-weight: bold;
        }
        .big-operator {
          color: #e74c3c;
        }
        .big-equals {
          color: #34495e;
        }
        .big-question {
          color: #27ae60;
        }
        @media (max-width: 768px) {
          .visual-fractions {
            gap: 15px;
          }
          .big-operator, .big-equals, .big-question {
            font-size: 2em;
          }
        }
      </style>
    `;
  }
  
  // Para preguntas visuales tradicionales
  let visuals = '';
  aid.fractions.forEach(fraction => {
    const visualType = getVisualType(aid.type);
    
    switch(visualType) {
      case 'pizza':
        visuals += renderPizzaVisual(fraction);
        break;
      case 'bar':
        visuals += renderBarVisual(fraction);
        break;
      default:
        visuals += renderPizzaVisual(fraction); // Default to pizza
    }
  });
  
  return visuals;
}

// --- Render principal ---
function renderGame() {
  if (gameMode === 'survival') {
    renderSurvivalGame();
    return;
  }
  
  // Código original para modo campaña
  var root = document.getElementById('game-root');
  root.innerHTML = '';
  const level = levels[currentLevelIdx];
  if (!level) {
    root.innerHTML = `<div class="card"><div class="card-title">${L().felicidades}</div><p>${L().completasteTodo}</p><p>${L().puntajeFinal}: <b>${user.score}</b></p></div>`;
    return;
  }
  const question = level.questions[currentQuestionIdx];
  const progressPercent = Math.round((currentQuestionIdx / level.questions.length) * 100);

  // Card de nivel y progreso
  const levelCard = document.createElement('div');
  levelCard.className = 'card';
  levelCard.style.position = 'relative';
  levelCard.innerHTML = `<div class="card-title">${level.name} - ${L().pregunta} ${currentQuestionIdx+1}/${level.questions.length}</div>
    <div class="progress-bar" style="width:${progressPercent}%"></div></div>`;
  root.appendChild(levelCard);

  // Card de pregunta
  const questionCard = document.createElement('div');
  questionCard.className = 'card';
  const lang = getLang();
  const qText = typeof question.text === 'string' ? question.text : (question.text[lang] || question.text.es);
  
  // Si es una pregunta de operación, mostrar la operación específica en el título
  let titleContent = qText;
  if (question.question) {
    const specificQuestion = typeof question.question === 'string' ? question.question : (question.question[lang] || question.question.es);
    titleContent = `${qText}<br><div class="specific-question">${specificQuestion}</div>`;
  }
  
  console.log('🎯 Renderizando pregunta tipo:', question.type, 'visualAid operation:', question.visualAid?.operation);
  
  questionCard.innerHTML = `<div class="card-title">${titleContent}</div>
    ${renderVisualAid(question.visualAid)}
    <div id="options"></div>
    <div id="feedback"></div>
    <style>
      .specific-question {
        margin-top: 10px;
        font-size: 1.2em;
        color: #2c3e50;
        font-weight: bold;
      }
    </style>`;

  // Footer con los dos botones
  const cardFooter = document.createElement('div');
  cardFooter.className = 'card-footer';

  // Botón enviar respuesta (centro, primero)
  const submitBtn = document.createElement('button');
  submitBtn.id = 'submitBtn';
  submitBtn.className = 'juego-btn';
  submitBtn.textContent = L().enviarRespuesta;
  cardFooter.appendChild(submitBtn);

  // Contenedor para la fila de abajo (botón back + puntos)
  const bottomRow = document.createElement('div');
  bottomRow.className = 'bottom-row';

  // Botón volver al menú (izquierda)
  const backBtn = document.createElement('button');
  backBtn.className = 'juego-btn back-menu-btn';
  backBtn.textContent = L().volverMenu;
  backBtn.onclick = () => {
    showModeSelector();
  };
  bottomRow.appendChild(backBtn);

  // Puntos del jugador (derecha)
  const pointsDiv = document.createElement('div');
  pointsDiv.className = 'footer-points';
  pointsDiv.textContent = `${L().puntos}: ${user.score}`;
  pointsDiv.style.fontWeight = 'bold';
  bottomRow.appendChild(pointsDiv);

  cardFooter.appendChild(bottomRow);
  questionCard.appendChild(cardFooter);
  root.appendChild(questionCard);

  // Opciones
  const optionsDiv = questionCard.querySelector('#options');
  question.options.forEach((option, idx) => {
    const btn = document.createElement('button');
    btn.className = 'juego-btn';
    btn.textContent = option;
    btn.onclick = () => {
      document.querySelectorAll('#options .btn').forEach(b => b.classList.remove('selected'));
      btn.classList.add('selected');
      questionCard.selectedAnswer = option;
    };
    if (questionCard.selectedAnswer === option) {
      btn.classList.add('selected');
    }
    optionsDiv.appendChild(btn);
  });

  // Enviar respuesta 
  submitBtn.onclick = () => {
    if (!questionCard.selectedAnswer) return;
    submitBtn.disabled = true;
    document.querySelectorAll('#options .btn').forEach(b => {
      b.disabled = true;
      if (b.textContent === questionCard.selectedAnswer) {
        b.classList.add('selected');
      }
    });
    checkAnswer(question, questionCard.selectedAnswer, questionCard);
  };
}

function renderSurvivalGame() {
  var root = document.getElementById('game-root');
  root.innerHTML = '';

  // Generar pregunta actual
  const question = generateSurvivalQuestion();
  
  // Stats de supervivencia - usando el mismo estilo que campaña
  const statsCard = document.createElement('div');
  statsCard.className = 'card';
  statsCard.style.position = 'relative';
  
  // Vidas con corazones
  let heartsHTML = '';
  for (let i = 0; i < 3; i++) {
    heartsHTML += i < survivalState.lives ? '❤️' : '🖤';
  }
  
  // Crear título similar al modo campaña pero para supervivencia
  const survivalTitle = `${L().modoSupervivencia} - ${L().pregunta} ${survivalState.questionCount + 1}`;
  
  statsCard.innerHTML = `
    <div class="card-title">${survivalTitle}</div>
    <div class="survival-stats-compact">
      <div class="survival-stat-item">
        <span class="stat-text">${L().vidas}: ${heartsHTML}</span>
      </div>
      <div class="survival-stat-item">
        <span class="stat-icon">🔥</span>
        <span class="stat-text">${L().racha}: ${survivalState.streak}</span>
      </div>
      <div class="survival-stat-item">
        <span class="stat-icon">⚡</span>
        <span class="stat-text">${L().puntos}: ${survivalState.totalScore} (x${survivalState.multiplier === 1 ? '1' : survivalState.multiplier.toFixed(1)})</span>
      </div>
      <div class="survival-stat-item">
        <span class="stat-icon">🏆</span>
        <span class="stat-text">${L().record}: ${survivalState.highScore}</span>
      </div>
    </div>
  `;
  root.appendChild(statsCard);

  // Card de pregunta - usando exactamente el mismo estilo que campaña
  const questionCard = document.createElement('div');
  questionCard.className = 'card';
  const lang = getLang();
  const qText = typeof question.text === 'string' ? question.text : (question.text[lang] || question.text.es);
  
  // Si es una pregunta de operación, mostrar la operación específica en el título
  let titleContent = qText;
  if (question.question) {
    const specificQuestion = typeof question.question === 'string' ? question.question : (question.question[lang] || question.question.es);
    titleContent = `${qText}<br><div class="specific-question">${specificQuestion}</div>`;
  }
  
  questionCard.innerHTML = `<div class="card-title">${titleContent}</div>
    ${renderVisualAid(question.visualAid)}
    <div id="options"></div>
    <div id="feedback"></div>
    <style>
      .specific-question {
        margin-top: 10px;
        font-size: 1.2em;
        color: #2c3e50;
        font-weight: bold;
      }
    </style>`;

  // Footer con el mismo estilo que campaña
  const cardFooter = document.createElement('div');
  cardFooter.className = 'card-footer';

  // Botón enviar respuesta (mismo estilo que campaña)
  const submitBtn = document.createElement('button');
  submitBtn.id = 'submitBtn';
  submitBtn.className = 'juego-btn';
  submitBtn.textContent = L().enviarRespuesta;
  cardFooter.appendChild(submitBtn);

  // Power-ups como círculos pequeños en el footer - no agregar aquí

  // Fila inferior (mismo layout que campaña)
  const bottomRow = document.createElement('div');
  bottomRow.className = 'bottom-row';

  // Botón abandonar (izquierda)
  const backBtn = document.createElement('button');
  backBtn.className = 'juego-btn back-menu-btn';
  backBtn.textContent = L().abandonar;
  backBtn.onclick = () => {
    if (confirm(L().seguroAbandonar)) {
      abandonSurvivalGame();
    }
  };
  bottomRow.appendChild(backBtn);

  // Solo power-ups como círculos en el footer (derecha)

  // Power-ups como círculos pequeños
  const powerUpCircles = document.createElement('div');
  powerUpCircles.className = 'power-up-circles';
  
  // Círculo de pista
  if (survivalState.powerUps.eliminateTwo > 0) {
    const hintCircle = document.createElement('button');
    hintCircle.className = 'power-up-circle hint-circle';
    hintCircle.innerHTML = `🎯<span class="power-count">${survivalState.powerUps.eliminateTwo}</span>`;
    hintCircle.title = 'Eliminar 2 opciones incorrectas';
    hintCircle.onclick = () => usePowerUp('eliminateTwo', question);
    powerUpCircles.appendChild(hintCircle);
  }
  
  // Círculo de vida (solo si se puede usar)
  if (survivalState.powerUps.secondChance > 0 && survivalState.lives < 3) {
    const lifeCircle = document.createElement('button');
    lifeCircle.className = 'power-up-circle life-circle';
    lifeCircle.innerHTML = `💪<span class="power-count">${survivalState.powerUps.secondChance}</span>`;
    lifeCircle.title = 'Restaurar una vida';
    lifeCircle.onclick = () => usePowerUp('secondChance', question);
    powerUpCircles.appendChild(lifeCircle);
  }
  
  // Círculo de bonus
  if (survivalState.powerUps.timeBonus > 0) {
    const bonusCircle = document.createElement('button');
    bonusCircle.className = 'power-up-circle bonus-circle';
    bonusCircle.innerHTML = `⏰<span class="power-count">${survivalState.powerUps.timeBonus}</span>`;
    bonusCircle.title = '+50 puntos extra';
    bonusCircle.onclick = () => usePowerUp('timeBonus', question);
    powerUpCircles.appendChild(bonusCircle);
  }
  
  // Solo agregar los círculos si hay power-ups disponibles
  if (powerUpCircles.children.length > 0) {
    bottomRow.appendChild(powerUpCircles);
  }

  cardFooter.appendChild(bottomRow);
  questionCard.appendChild(cardFooter);
  root.appendChild(questionCard);

  // Opciones con el mismo estilo que campaña
  const optionsDiv = questionCard.querySelector('#options');
  
  question.options.forEach((option, idx) => {
    const btn = document.createElement('button');
    btn.className = 'juego-btn';
    btn.textContent = option;
    btn.onclick = () => {
      document.querySelectorAll('#options .juego-btn').forEach(b => b.classList.remove('selected'));
      btn.classList.add('selected');
      questionCard.selectedAnswer = option;
    };
    optionsDiv.appendChild(btn);
  });

  // Enviar respuesta 
  submitBtn.onclick = () => {
    if (!questionCard.selectedAnswer) return;
    submitBtn.disabled = true;
    document.querySelectorAll('#options .juego-btn').forEach(b => {
      b.disabled = true;
      if (b.textContent === questionCard.selectedAnswer) {
        b.classList.add('selected');
      }
    });
    clearTimeout(survivalState.timeoutId); // Limpiar el timeout
    checkSurvivalAnswer(question, questionCard.selectedAnswer, questionCard);
  };

  // Implementar tiempo límite para responder
  const timeLimit = 15; // 15 segundos para responder
  survivalState.currentTimeLeft = timeLimit;
  
  // Crear contador visual
  const timerDiv = document.createElement('div');
  timerDiv.className = 'survival-timer';
  timerDiv.textContent = `⏱️ ${survivalState.currentTimeLeft}s`;
  statsCard.appendChild(timerDiv);
  
  // Actualizar contador cada segundo
  const timerInterval = setInterval(() => {
    survivalState.currentTimeLeft--;
    timerDiv.textContent = `⏱️ ${survivalState.currentTimeLeft}s`;
    
    // Cambiar color cuando queda poco tiempo
    if (survivalState.currentTimeLeft <= 5) {
      timerDiv.style.color = '#ff4444';
      timerDiv.style.fontWeight = 'bold';
    }
    
    if (survivalState.currentTimeLeft <= 0) {
      clearInterval(timerInterval);
      // Tiempo agotado - respuesta incorrecta automática
      if (!submitBtn.disabled) {
        submitBtn.disabled = true;
        document.querySelectorAll('#options .juego-btn').forEach(b => b.disabled = true);
        checkSurvivalAnswer(question, null, questionCard); // null = tiempo agotado
      }
    }
  }, 1000);
  
  // Guardar el intervalo para poder limpiarlo
  survivalState.timerInterval = timerInterval;
}

function checkAnswer(question, selectedAnswer, card) {
  // Verificar si la respuesta está en la lista de respuestas correctas
  const isCorrect = question.correctAnswers 
    ? question.correctAnswers.includes(selectedAnswer)
    : selectedAnswer === question.answer;
    
  const feedbackDiv = card.querySelector('#feedback');
  if (isCorrect) {
    user.score += question.points;
    const xpGained = Math.floor(question.points / 2); // XP = mitad de los puntos
    addXP(xpGained);
    saveUserProgress(); // Guardar progreso
    const exp = typeof question.explanation === 'string' ? question.explanation : (question.explanation[getLang()] || question.explanation.es);
    
    // Mensaje especial si hay múltiples respuestas correctas
    let extraMsg = '';
    if (question.correctAnswers && question.correctAnswers.length > 1) {
      const otherCorrect = question.correctAnswers.filter(ans => ans !== selectedAnswer);
      if (otherCorrect.length > 0) {
        extraMsg = `<br><small>También es correcto: ${otherCorrect.join(', ')}</small>`;
      }
    }
    
    feedbackDiv.innerHTML = `<div class="feedback correct">${L().correcto} +${question.points} ${L().puntos.toLowerCase()} (+${xpGained} XP).<br>${exp}${extraMsg}</div>`;
  } else {
    const exp = typeof question.explanation === 'string' ? question.explanation : (question.explanation[getLang()] || question.explanation.es);
    
    // Mostrar las respuestas correctas si hay múltiples
    let correctMsg = '';
    if (question.correctAnswers && question.correctAnswers.length > 0) {
      correctMsg = `<br><small>Respuesta(s) correcta(s): ${question.correctAnswers.join(', ')}</small>`;
    }
    
    feedbackDiv.innerHTML = `<div class="feedback incorrect">${L().incorrecto}<br>${exp}${correctMsg}</div>`;
  }
  feedbackTimeout = setTimeout(() => {
    nextQuestionOrLevel();
  }, 3000); // 3 segundos para leer el feedback adicional
}

function checkSurvivalAnswer(question, selectedAnswer, card) {
  // Limpiar el timer si existe
  if (survivalState.timerInterval) {
    clearInterval(survivalState.timerInterval);
    survivalState.timerInterval = null;
  }
  
  // Si selectedAnswer es null, significa que se agotó el tiempo
  const timeUp = selectedAnswer === null;
  const isCorrect = timeUp ? false : (question.correctAnswers 
    ? question.correctAnswers.includes(selectedAnswer)
    : selectedAnswer === question.answer);
    
  const feedbackDiv = card.querySelector('#feedback');
  
  if (isCorrect) {
    // Acierto en supervivencia
    survivalState.streak++;
    survivalState.questionCount++;
    survivalState.totalScore += question.points;
    
    // Ganar XP en modo supervivencia (más XP por la dificultad)
    const xpGained = Math.floor(question.points / 1.5); // Más XP que en campaña
    addXP(xpGained);
    saveUserProgress(); // Guardar progreso
    
    // Verificar si es nuevo record de racha
    let newStreakRecord = false;
    if (survivalState.streak > survivalState.bestStreak) {
      survivalState.bestStreak = survivalState.streak;
      localStorage.setItem('survivalBestStreak', survivalState.bestStreak.toString());
      newStreakRecord = true;
    }
    
    // Verificar si es nuevo record de puntuación
    let newScoreRecord = false;
    if (survivalState.totalScore > survivalState.highScore) {
      survivalState.highScore = survivalState.totalScore;
      localStorage.setItem('survivalHighScore', survivalState.highScore.toString());
      newScoreRecord = true;
    }
    
    // Otorgar power-ups cada 10 respuestas correctas
    if (survivalState.streak > 0 && survivalState.streak % 10 === 0) {
      const powerUpType = ['secondChance', 'timeBonus', 'eliminateTwo'][Math.floor(Math.random() * 3)];
      survivalState.powerUps[powerUpType]++;
    }
    
    updateSurvivalDifficulty();
    
    const exp = typeof question.explanation === 'string' ? question.explanation : (question.explanation.es || question.explanation.en);
    let extraMsg = '';
    if (question.correctAnswers && question.correctAnswers.length > 1) {
      const otherCorrect = question.correctAnswers.filter(ans => ans !== selectedAnswer);
      if (otherCorrect.length > 0) {
        extraMsg = `<br><small>También es correcto: ${otherCorrect.join(', ')}</small>`;
      }
    }
    
    // Mensaje de racha y récords
    let streakMsg = '';
    if (newScoreRecord) {
      streakMsg += `<br><strong>🏆 ¡NUEVO RÉCORD DE PUNTUACIÓN!</strong>`;
    }
    if (newStreakRecord) {
      streakMsg += `<br><strong>🔥 ¡NUEVA MEJOR RACHA: ${survivalState.streak}!</strong>`;
    } else if (survivalState.streak >= 5) {
      streakMsg += `<br><strong>🔥 ¡Racha de ${survivalState.streak}!</strong>`;
    }
    
    const survivalXP = Math.floor(question.points / 1.5); // Más XP que en campaña
    feedbackDiv.innerHTML = `<div class="feedback correct survival-correct">
      ¡Correcto! +${question.points} puntos (+${survivalXP} XP) (x${survivalState.multiplier})
      <br>${exp}${extraMsg}${streakMsg}
    </div>`;
    
  } else {
    // Error en supervivencia - perder vida
    survivalState.lives--;
    survivalState.streak = 0; // Reset racha
    survivalState.multiplier = 1; // Reset multiplicador
    
    const exp = typeof question.explanation === 'string' ? question.explanation : (question.explanation.es || question.explanation.en);
    let correctMsg = '';
    if (question.correctAnswers && question.correctAnswers.length > 0) {
      correctMsg = `<br><small>Respuesta(s) correcta(s): ${question.correctAnswers.join(', ')}</small>`;
    }
    
    let livesMsg = '';
    if (survivalState.lives > 0) {
      livesMsg = `<br><strong>💔 ${L().vidasRestantes}: ${survivalState.lives}</strong>`;
    } else {
      livesMsg = `<br><strong>${L().vidasAgotadas}</strong>`;
    }
    
    // Mensaje diferente si se agotó el tiempo
    const timeUpMsg = timeUp ? L().tiempoAgotado : L().incorrecto;
    
    feedbackDiv.innerHTML = `<div class="feedback incorrect survival-incorrect">
      ${timeUpMsg}${livesMsg}
      <br>${exp}${correctMsg}
    </div>`;
  }
  
  feedbackTimeout = setTimeout(() => {
    if (survivalState.lives <= 0) {
      endSurvivalGame();
    } else {
      renderSurvivalGame();
    }
  }, 3000);
}

function endSurvivalGame() {
  // Limpiar el timer si existe
  if (survivalState.timerInterval) {
    clearInterval(survivalState.timerInterval);
    survivalState.timerInterval = null;
  }
  
  // Verificar nuevo record
  if (survivalState.totalScore > survivalState.highScore) {
    survivalState.highScore = survivalState.totalScore;
    localStorage.setItem('survivalHighScore', survivalState.highScore.toString());
  }
  
  // Verificar nueva mejor racha
  if (survivalState.streak > survivalState.bestStreak) {
    survivalState.bestStreak = survivalState.streak;
    localStorage.setItem('survivalBestStreak', survivalState.bestStreak.toString());
  }
  
  showSurvivalEndScreen(L().finDelJuego, '🏁');
}

function abandonSurvivalGame() {
  // Limpiar el timer si existe
  if (survivalState.timerInterval) {
    clearInterval(survivalState.timerInterval);
    survivalState.timerInterval = null;
  }
  
  // Guardar récords incluso al abandonar
  if (survivalState.totalScore > survivalState.highScore) {
    survivalState.highScore = survivalState.totalScore;
    localStorage.setItem('survivalHighScore', survivalState.highScore.toString());
  }
  
  // Verificar nueva mejor racha
  if (survivalState.streak > survivalState.bestStreak) {
    survivalState.bestStreak = survivalState.streak;
    localStorage.setItem('survivalBestStreak', survivalState.bestStreak.toString());
  }
  
  showSurvivalEndScreen(L().partidaAbandonada, '🚪');
}

function showSurvivalEndScreen(title, icon) {
  const root = document.getElementById('game-root');
  const isNewRecord = survivalState.totalScore === survivalState.highScore;
  const isNewStreak = survivalState.streak === survivalState.bestStreak && survivalState.streak > 0;
  
  root.innerHTML = `
    <div class="card survival-end">
      <div class="card-title">${icon} ${title}</div>
      ${isNewRecord ? `<div class="new-record">${L().nuevoRecord}</div>` : ''}
      ${isNewStreak && !isNewRecord ? `<div class="new-record">${L().nuevaRacha}</div>` : ''}
      <div class="survival-final-stats">
        <div class="final-stat">
          <span class="stat-label">${L().puntuacionFinal}:</span>
          <span class="stat-value">${survivalState.totalScore}</span>
        </div>
        <div class="final-stat">
          <span class="stat-label">${L().recordPersonal}:</span>
          <span class="stat-value record-highlight">${survivalState.highScore}</span>
        </div>
        <div class="final-stat">
          <span class="stat-label">${L().preguntasRespondidas}:</span>
          <span class="stat-value">${survivalState.questionCount}</span>
        </div>
        <div class="final-stat">
          <span class="stat-label">${L().rachaActual}:</span>
          <span class="stat-value">${survivalState.streak}</span>
        </div>
        <div class="final-stat">
          <span class="stat-label">${L().mejorRachaPersonal}:</span>
          <span class="stat-value record-highlight">${survivalState.bestStreak}</span>
        </div>
        <div class="final-stat">
          <span class="stat-label">${L().nivelAlcanzado}:</span>
          <span class="stat-value">${survivalState.difficultyLevel}</span>
        </div>
      </div>
      <div class="survival-end-buttons">
        <button class="btn survival-restart" onclick="startSurvivalMode()">${L().jugarDeNuevo}</button>
        <button class="btn" onclick="showModeSelector()">${L().volverModos}</button>
      </div>
    </div>
  `;
}

function extendTimer(seconds) {
  // Extender el tiempo del temporizador actual
  if (survivalState.currentTimeLeft !== undefined) {
    survivalState.currentTimeLeft += seconds;
    
    // Actualizar el display del temporizador
    const timerDiv = document.querySelector('.survival-timer');
    if (timerDiv) {
      timerDiv.textContent = `⏱️ ${survivalState.currentTimeLeft}s`;
      
      // Resetear el color si teníamos poco tiempo
      if (survivalState.currentTimeLeft > 5) {
        timerDiv.style.color = '';
        timerDiv.style.fontWeight = '';
      }
    }
  }
}

function usePowerUp(type, question) {
  if (survivalState.powerUps[type] <= 0) return;
  
  survivalState.powerUps[type]--;
  
  switch(type) {
    case 'eliminateTwo':
      // Eliminar 2 opciones incorrectas
      const correctAnswers = question.correctAnswers || [question.answer];
      const optionBtns = document.querySelectorAll('#options .juego-btn');
      let eliminated = 0;
      
      optionBtns.forEach(btn => {
        if (eliminated < 2 && !correctAnswers.includes(btn.textContent)) {
          btn.style.opacity = '0.3';
          btn.style.textDecoration = 'line-through';
          btn.disabled = true;
          btn.style.cursor = 'not-allowed';
          eliminated++;
        }
      });
      
      // Mostrar mensaje de power-up usado
      showPowerUpFeedback(L().pista);
      break;
      
    case 'secondChance':
      // Restaurar una vida
      if (survivalState.lives < 3) {
        survivalState.lives++;
        showPowerUpFeedback(L().segundaOportunidad);
      }
      break;
      
    case 'timeBonus':
      // Dar tiempo extra
      extendTimer(10); // Agregar 10 segundos al temporizador
      showPowerUpFeedback(L().tiempoExtra);
      break;
  }
  
  // Actualizar la UI completa para reflejar los cambios
  updateSurvivalUI();
}

function showPowerUpFeedback(message) {
  const feedbackDiv = document.querySelector('#feedback');
  if (feedbackDiv) {
    feedbackDiv.innerHTML = `<div class="feedback powerup-used">${message}</div>`;
    setTimeout(() => {
      feedbackDiv.innerHTML = '';
    }, 2000);
  }
}

function updateSurvivalUI() {
  // Actualizar vidas en stats
  const statsCard = document.querySelector('.survival-stats-compact');
  if (statsCard) {
    const statItems = statsCard.querySelectorAll('.survival-stat-item .stat-text');
    
    // Primer item: Vidas
    let heartsHTML = '';
    for (let i = 0; i < 3; i++) {
      heartsHTML += i < survivalState.lives ? '❤️' : '🖤';
    }
    if (statItems[0]) {
      statItems[0].innerHTML = `Vidas: ${heartsHTML}`;
    }
    
    // Segundo item: Racha
    if (statItems[1]) {
      statItems[1].textContent = `Racha: ${survivalState.streak}`;
    }
    
    // Tercer item: Puntos y multiplicador
    if (statItems[2]) {
      statItems[2].textContent = `Puntos: ${survivalState.totalScore} (x${survivalState.multiplier === 1 ? '1' : survivalState.multiplier.toFixed(1)})`;
    }
    
    // Cuarto item: Récord
    if (statItems[3]) {
      statItems[3].textContent = `Récord: ${survivalState.highScore}`;
    }
  }
  
  // Actualizar contadores en los círculos de power-ups
  const hintCircle = document.querySelector('.hint-circle .power-count');
  if (hintCircle) {
    hintCircle.textContent = survivalState.powerUps.eliminateTwo;
    if (survivalState.powerUps.eliminateTwo <= 0) {
      document.querySelector('.hint-circle').style.display = 'none';
    }
  }
  
  const lifeCircle = document.querySelector('.life-circle .power-count');
  if (lifeCircle) {
    lifeCircle.textContent = survivalState.powerUps.secondChance;
    if (survivalState.powerUps.secondChance <= 0 || survivalState.lives >= 3) {
      document.querySelector('.life-circle').style.display = 'none';
    }
  }
  
  const bonusCircle = document.querySelector('.bonus-circle .power-count');
  if (bonusCircle) {
    bonusCircle.textContent = survivalState.powerUps.timeBonus;
    if (survivalState.powerUps.timeBonus <= 0) {
      document.querySelector('.bonus-circle').style.display = 'none';
    }
  }
}

function nextQuestionOrLevel() {
  const level = levels[currentLevelIdx];
  if (currentQuestionIdx < level.questions.length - 1) {
    currentQuestionIdx++;
    renderGame();
  } else {
    // Recompensa
    if (level.rewardOnCompletion && !user.rewards.find(r => r.id === level.rewardOnCompletion.id)) {
      user.rewards.push({ ...level.rewardOnCompletion, unlocked: true });
    }
    // Desbloquear siguiente nivel
    if (levels[currentLevelIdx + 1]) {
      levels[currentLevelIdx + 1].unlocked = true;
      // Guardar en localStorage
      localStorage.setItem('levels_progress', JSON.stringify(levels.map(l => ({ name: l.name, unlocked: l.unlocked }))));
    }
    currentLevelIdx++;
    currentQuestionIdx = 0;
    showLevelUpModal(level);
  
  // Calcular puntuación máxima posible del nivel (todas las preguntas correctas)
  const maxScore = level.questions.reduce((sum, q) => sum + q.points, 0);
  let levelScore = 0;
  
  // Calcular puntuación obtenida en este nivel
  level.questions.forEach(q => {
    if (user.correctAnswers && user.correctAnswers.includes(q.id)) {
      levelScore += q.points;
    }
  });
  
  // Dar 2 sobres base al completar un nivel
  let sobresGanados = 2;
  
  // Bonus por puntuación perfecta (+3 sobres extra)
  if (levelScore >= maxScore) {
    sobresGanados += 3;
    console.log('¡Puntuación perfecta! Bonus de 3 sobres.');
  }
  
  if (window.sumarSobres) window.sumarSobres(sobresGanados);
  }
}

function showLevelUpModal(level) {
  // Modal flotante de nivel completado
  const modal = document.createElement('div');
  modal.style.position = 'fixed';
  modal.style.top = '0';
  modal.style.left = '0';
  modal.style.width = '100vw';
  modal.style.height = '100vh';
  modal.style.background = 'rgba(0,0,0,0.4)';
  modal.style.display = 'flex';
  modal.style.alignItems = 'center';
  modal.style.justifyContent = 'center';
  modal.style.zIndex = '20000'; // Z-index muy alto para que aparezca encima
  const langTxt = L();
  modal.innerHTML = `<div class="level-complete-modal" style="max-width:400px;text-align:center;z-index:20001;">
    <div class="card-title">${langTxt.nivelCompletado}</div>
    <p>${langTxt.hasCompletado(level.name)}</p>
    ${level.rewardOnCompletion ? `<p>${langTxt.hasDesbloqueado(level.rewardOnCompletion.name)}</p>` : ''}
    <p>${langTxt.tuPuntaje}: <b>${user.score}</b></p>
    <div class="level-complete-buttons">
      <button id="menuBtn" class="btn">${langTxt.volverMenu}</button>
      <button id="continueBtn" class="btn">${langTxt.siguienteNivel}</button>
    </div>
  </div>`;
  document.body.appendChild(modal);
  document.getElementById('menuBtn').onclick = () => {
    document.body.removeChild(modal);
    window.location.href = 'menu.html';
  };
  document.getElementById('continueBtn').onclick = () => {
    document.body.removeChild(modal);
    user.currentLevel++;
    renderGame();
  };
}

// Habilitar/deshabilitar niveles y manejar clicks
document.addEventListener('DOMContentLoaded', function() {
  let levels = JSON.parse(localStorage.getItem('levels_progress'));
  if (!Array.isArray(levels)) levels = [];
  const targetLen = 12;
  if (levels.length < targetLen) {
    for (let i = levels.length; i < targetLen; i++) levels[i] = { name: String(i+1), unlocked: i === 0 };
    localStorage.setItem('levels_progress', JSON.stringify(levels));
  }
  const grid = document.getElementById('gridNiveles');
  if (grid) {
    grid.innerHTML = '';
    levels.forEach((lvl, idx) => {
      const b = document.createElement('button');
      b.className = 'nivel-btn';
      b.textContent = String(idx + 1);
      if (!lvl.unlocked) {
        b.disabled = true;
      } else {
        b.onclick = function() {
          localStorage.setItem('currentLevelIdx', idx);
          document.getElementById('niveles-root').style.display = 'none';
          document.getElementById('game-root').style.display = '';
          if (window.renderGame) window.renderGame();
        };
      }
      grid.appendChild(b);
    });
  }
  const volverBtn = document.getElementById('volverMenuNiveles');
  if (volverBtn) {
    volverBtn.onclick = function() {
      showModeSelector();
    };
  }
});