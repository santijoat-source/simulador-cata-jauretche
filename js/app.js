// ==========================================
// ESTADO DEL JUEGO Y SELECCIÓN DE ELEMENTOS
// ==========================================
let score = 0;
let casoActualIndex = 0;

// Elementos del Encabezado y Estadísticas
const scoreDisplay = document.getElementById('score-display');
const caseCounter = document.getElementById('case-counter');

// Elementos de la Muestra
const sampleBadge = document.getElementById('sample-badge');
const samplePerception = document.getElementById('sample-perception');
const sampleTitle = document.getElementById('sample-title');
const sampleDescription = document.getElementById('sample-description');

// Contenedores de Pasos y Opciones
const step1Container = document.getElementById('step-1-container');
const step2Container = document.getElementById('step-2-container');
const step3Container = document.getElementById('step-3-container');

const macroOptions = document.getElementById('macro-options');
const familyOptions = document.getElementById('family-options');
const descriptorOptions = document.getElementById('descriptor-options');

// Retroalimentación y Botón Siguiente
const feedbackModal = document.getElementById('feedback-modal');
const feedbackStatus = document.getElementById('feedback-status');
const feedbackText = document.getElementById('feedback-text');
const nextBtn = document.getElementById('next-btn');

// Pantalla Final
const endScreen = document.getElementById('end-screen');
const finalScoreEl = document.getElementById('final-score');
const finalRankEl = document.getElementById('final-rank');
const restartBtn = document.getElementById('restart-btn');

// Modal de la Rueda Aromaster
const openWheelBtn = document.getElementById('open-wheel-btn');
const closeWheelBtn = document.getElementById('close-wheel-btn');
const wheelModal = document.getElementById('wheel-modal');

// ==========================================
// INICIALIZACIÓN
// ==========================================
document.addEventListener('DOMContentLoaded', () => {
    cargarCasoActual();
    configurarEventosGlobales();
});

// ==========================================
// CARGAR Y MOSTRAR CASO
// ==========================================
function cargarCasoActual() {
    const caso = CASOS_ENOLOGIA[casoActualIndex];

    // Resetear visibilidad de contenedores y modales
    feedbackModal.classList.add('hidden');
    step1Container.classList.remove('hidden');
    step1Container.classList.add('active');
    step2Container.classList.add('hidden');
    step3Container.classList.add('hidden');

    // Actualizar Encabezado de la Muestra actual
    sampleBadge.textContent = `Muestra #${caso.id}`;
    samplePerception.textContent = caso.percepcion;
    sampleTitle.textContent = caso.titulo;
    sampleDescription.textContent = caso.descripcion;
    caseCounter.textContent = `${casoActualIndex + 1} / ${CASOS_ENOLOGIA.length}`;

    // Cargar las opciones del Paso 1
    renderPaso1(caso);
}

// Paso 1: Clasificación General (Macro)
function renderPaso1(caso) {
    macroOptions.innerHTML = '';
    const opciones = mezclarArreglo([caso.macroCorrecta, ...caso.distractoresMacro]);
    
    opciones.forEach(opcion => {
        const btn = document.createElement('button');
        btn.className = 'option-btn';
        btn.textContent = opcion;
        btn.onclick = () => verificarPaso1(opcion, caso);
        macroOptions.appendChild(btn);
    });
}

function verificarPaso1(seleccion, caso) {
    if (seleccion === caso.macroCorrecta) {
        score += 5;
        scoreDisplay.textContent = score;
        step1Container.classList.add('hidden');
        step2Container.classList.remove('hidden');
        step2Container.classList.add('active');
        renderPaso2(caso);
    } else {
        mostrarFeedback(false, `Categoría incorrecta. '${seleccion}' no coincide con la clasificación macro de esta muestra.`);
    }
}

// Paso 2: Familia Aromática
function renderPaso2(caso) {
    familyOptions.innerHTML = '';
    const opciones = mezclarArreglo([caso.familiaCorrecta, ...caso.distractoresFamilia]);
    
    opciones.forEach(opcion => {
        const btn = document.createElement('button');
        btn.className = 'option-btn';
        btn.textContent = opcion;
        btn.onclick = () => verificarPaso2(opcion, caso);
        familyOptions.appendChild(btn);
    });
}

function verificarPaso2(seleccion, caso) {
    if (seleccion === caso.familiaCorrecta) {
        score += 5;
        scoreDisplay.textContent = score;
        step2Container.classList.add('hidden');
        step3Container.classList.remove('hidden');
        step3Container.classList.add('active');
        renderPaso3(caso);
    } else {
        mostrarFeedback(false, `Familia incorrecta. '${seleccion}' no pertenece al grupo aromático de este vino.`);
    }
}

// Paso 3: Descriptor Específico
function renderPaso3(caso) {
    descriptorOptions.innerHTML = '';
    const opciones = mezclarArreglo([caso.descriptorCorrecto, ...caso.distractoresDescriptor]);
    
    opciones.forEach(opcion => {
        const btn = document.createElement('button');
        btn.className = 'option-btn';
        btn.textContent = opcion;
        btn.onclick = () => verificarPaso3(opcion, caso);
        descriptorOptions.appendChild(btn);
    });
}

function verificarPaso3(seleccion, caso) {
    if (seleccion === caso.descriptorCorrecto) {
        score += 5;
        scoreDisplay.textContent = score;
        mostrarFeedback(true, `¡Excelente deducción! ${caso.explicacion}`);
    } else {
        mostrarFeedback(false, `Descriptor incorrecto. '${seleccion}' no es el aroma específico de esta muestra.`);
    }
}

// ==========================================
// MOSTRAR RETROALIMENTACIÓN
// ==========================================
function mostrarFeedback(esCorrecto, mensaje) {
    feedbackModal.classList.remove('hidden');
    if (esCorrecto) {
        feedbackStatus.textContent = "¡Análisis Sensorial Correcto! (+15 pts)";
        feedbackStatus.style.color = "#2e7d32";
    } else {
        feedbackStatus.textContent = "Análisis Incorrecto";
        feedbackStatus.style.color = "#c62828";
    }
    feedbackText.textContent = mensaje;
}

// ==========================================
// EVENTO CLAVE: "SIGUIENTE MUESTRA" Y FIN DE JUEGO
// ==========================================
nextBtn.addEventListener('click', () => {
    casoActualIndex++; // Avanzar el contador de la muestra
    
    // Si quedan muestras, carga la siguiente; si no, muestra la pantalla final
    if (casoActualIndex < CASOS_ENOLOGIA.length) {
        cargarCasoActual();
    } else {
        mostrarPantallaFinal();
    }
});

// ==========================================
// PANTALLA FINAL Y REINICIO
// ==========================================
function mostrarPantallaFinal() {
    // Ocultar zonas de juego
    document.querySelector('.sample-info').classList.add('hidden');
    document.querySelector('.deduction-panel').classList.add('hidden');
    feedbackModal.classList.add('hidden');
    
    // Actualizar puntaje y nivel alcanzado
    finalScoreEl.textContent = score;
    
    if (score >= 130) {
        finalRankEl.textContent = "🥇 Enólogo Master / Catador Experto";
    } else if (score >= 90) {
        finalRankEl.textContent = "🥈 Sommelier Avanzado";
    } else if (score >= 50) {
        finalRankEl.textContent = "🥉 Analista Sensorial Jr.";
    } else {
        finalRankEl.textContent = "🍷 Estudiante de Enología";
    }
    
    // Mostrar pantalla de cierre
    endScreen.classList.remove('hidden');
}

restartBtn.addEventListener('click', () => {
    score = 0;
    casoActualIndex = 0;
    scoreDisplay.textContent = '0';
    endScreen.classList.add('hidden');
    document.querySelector('.sample-info').classList.remove('hidden');
    document.querySelector('.deduction-panel').classList.remove('hidden');
    cargarCasoActual();
});

// ==========================================
// EVENTOS DEL MODAL DE LA RUEDA AROMASTER
// ==========================================
function configurarEventosGlobales() {
    openWheelBtn.addEventListener('click', () => wheelModal.classList.remove('hidden'));
    closeWheelBtn.addEventListener('click', () => wheelModal.classList.add('hidden'));

    wheelModal.addEventListener('click', (e) => {
        if (e.target === wheelModal) {
            wheelModal.classList.add('hidden');
        }
    });
}

// Función auxiliar para mezclar las opciones aleatoriamente
function mezclarArreglo(arreglo) {
    return [...arreglo].sort(() => Math.random() - 0.5);
}