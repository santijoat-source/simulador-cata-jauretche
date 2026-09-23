let score = 0;
let casoActualIndex = 0;
let pasoActual = 1; // 1: Macro, 2: Familia, 3: Descriptor
let seleccionTemporal = null; // Almacena la opción preseleccionada

// Elementos de la Interfaz
const scoreDisplay = document.getElementById('score-display');
const caseCounter = document.getElementById('case-counter');
const themeToggleBtn = document.getElementById('theme-toggle');
const moonIcon = document.getElementById('moon-icon');
const sunIcon = document.getElementById('sun-icon');

// Nodos y Líneas del Esquema Ramificado
const nodeRootText = document.getElementById('node-root-text');
const nodeMacro = document.getElementById('node-macro');
const nodeMacroText = document.getElementById('node-macro-text');
const nodeFamily = document.getElementById('node-family');
const nodeFamilyText = document.getElementById('node-family-text');
const nodeDescriptor = document.getElementById('node-descriptor');
const nodeDescriptorText = document.getElementById('node-descriptor-text');

const line1 = document.getElementById('line-1');
const line2 = document.getElementById('line-2');
const line3 = document.getElementById('line-3');

// Muestra Actual
const sampleBadge = document.getElementById('sample-badge');
const samplePerception = document.getElementById('sample-perception');
const sampleTitle = document.getElementById('sample-title');
const sampleDescription = document.getElementById('sample-description');

// Pasos y Opciones
const step1Container = document.getElementById('step-1-container');
const step2Container = document.getElementById('step-2-container');
const step3Container = document.getElementById('step-3-container');

const macroOptions = document.getElementById('macro-options');
const familyOptions = document.getElementById('family-options');
const descriptorOptions = document.getElementById('descriptor-options');
const confirmBtn = document.getElementById('confirm-btn');

// Feedback y Fin de Juego
const feedbackModal = document.getElementById('feedback-modal');
const feedbackStatus = document.getElementById('feedback-status');
const feedbackText = document.getElementById('feedback-text');
const nextBtn = document.getElementById('next-btn');

const endScreen = document.getElementById('end-screen');
const finalScoreEl = document.getElementById('final-score');
const finalRankEl = document.getElementById('final-rank');
const restartBtn = document.getElementById('restart-btn');

// Modal Rueda
const openWheelBtn = document.getElementById('open-wheel-btn');
const closeWheelBtn = document.getElementById('close-wheel-btn');
const wheelModal = document.getElementById('wheel-modal');

document.addEventListener('DOMContentLoaded', () => {
    configurarTemaSVG();
    cargarCasoActual();
    configurarEventosGlobales();
});

// ==========================================
// CONMUTADOR DE TEMA CON ÍCONOS SVG
// ==========================================
function configurarTemaSVG() {
    const themeGuardado = localStorage.getItem('theme-preference') || 'dark';
    
    if (themeGuardado === 'light') {
        document.documentElement.setAttribute('data-theme', 'light');
        moonIcon.classList.add('hidden');
        sunIcon.classList.remove('hidden');
    }

    themeToggleBtn.addEventListener('click', () => {
        const esClaro = document.documentElement.getAttribute('data-theme') === 'light';
        
        if (esClaro) {
            document.documentElement.removeAttribute('data-theme');
            localStorage.setItem('theme-preference', 'dark');
            sunIcon.classList.add('hidden');
            moonIcon.classList.remove('hidden');
        } else {
            document.documentElement.setAttribute('data-theme', 'light');
            localStorage.setItem('theme-preference', 'light');
            moonIcon.classList.add('hidden');
            sunIcon.classList.remove('hidden');
        }
    });
}

// ==========================================
// CONTROL DEL ESQUEMA Y FLUJO
// ==========================================
function resetearEsquema(tituloVino) {
    nodeRootText.textContent = tituloVino;
    
    nodeMacro.className = "tree-node pending-node";
    nodeMacroText.textContent = "¿Origen o Defecto?";
    
    nodeFamily.className = "tree-node pending-node";
    nodeFamilyText.textContent = "¿Familia Aromática?";
    
    nodeDescriptor.className = "tree-node pending-node";
    nodeDescriptorText.textContent = "¿Nota Específica?";
    
    line1.className = "tree-connector";
    line2.className = "tree-connector";
    line3.className = "tree-connector";
}

function deshabilitarConfirmacion() {
    seleccionTemporal = null;
    confirmBtn.disabled = true;
}

function cargarCasoActual() {
    const caso = CASOS_ENOLOGIA[casoActualIndex];
    pasoActual = 1;

    feedbackModal.classList.add('hidden');
    step1Container.classList.remove('hidden');
    step2Container.classList.add('hidden');
    step3Container.classList.add('hidden');

    sampleBadge.textContent = `Muestra #${caso.id}`;
    samplePerception.textContent = caso.percepcion;
    sampleTitle.textContent = caso.titulo;
    sampleDescription.textContent = caso.descripcion;
    caseCounter.textContent = `${casoActualIndex + 1} / ${CASOS_ENOLOGIA.length}`;

    resetearEsquema(caso.titulo);
    deshabilitarConfirmacion();
    renderPaso1(caso);
}

// Preselección de Opción (Sin Evaluación Inmediata)
function seleccionarOpcion(opcionTexto, elementoBoton, nodoTextoTarget) {
    document.querySelectorAll('.option-btn').forEach(btn => btn.classList.remove('selected'));
    
    elementoBoton.classList.add('selected');
    seleccionTemporal = opcionTexto;
    confirmBtn.disabled = false;

    // Muestra borrador previo en el esquema
    nodoTextoTarget.textContent = opcionTexto;
}

function renderPaso1(caso) {
    macroOptions.innerHTML = '';
    const opciones = mezclarArreglo([caso.macroCorrecta, ...caso.distractoresMacro]);
    
    opciones.forEach(opcion => {
        const btn = document.createElement('button');
        btn.className = 'option-btn';
        btn.textContent = opcion;
        btn.onclick = () => seleccionarOpcion(opcion, btn, nodeMacroText);
        macroOptions.appendChild(btn);
    });
}

function renderPaso2(caso) {
    familyOptions.innerHTML = '';
    const opciones = mezclarArreglo([caso.familiaCorrecta, ...caso.distractoresFamilia]);
    
    opciones.forEach(opcion => {
        const btn = document.createElement('button');
        btn.className = 'option-btn';
        btn.textContent = opcion;
        btn.onclick = () => seleccionarOpcion(opcion, btn, nodeFamilyText);
        familyOptions.appendChild(btn);
    });
}

function renderPaso3(caso) {
    descriptorOptions.innerHTML = '';
    const opciones = mezclarArreglo([caso.descriptorCorrecto, ...caso.distractoresDescriptor]);
    
    opciones.forEach(opcion => {
        const btn = document.createElement('button');
        btn.className = 'option-btn';
        btn.textContent = opcion;
        btn.onclick = () => seleccionarOpcion(opcion, btn, nodeDescriptorText);
        descriptorOptions.appendChild(btn);
    });
}

// EVENTO PRINCIPAL: Clic en "Confirmar Selección"
confirmBtn.addEventListener('click', () => {
    if (!seleccionTemporal) return;

    const caso = CASOS_ENOLOGIA[casoActualIndex];

    if (pasoActual === 1) {
        if (seleccionTemporal === caso.macroCorrecta) {
            score += 5;
            scoreDisplay.textContent = score;

            nodeMacro.className = "tree-node active-node";
            line1.className = "tree-connector active-line";

            step1Container.classList.add('hidden');
            step2Container.classList.remove('hidden');
            pasoActual = 2;
            deshabilitarConfirmacion();
            renderPaso2(caso);
        } else {
            mostrarFeedback(false, `Selección incorrecta. '${seleccionTemporal}' no corresponde a la clasificación macro de esta muestra.`);
        }
    } else if (pasoActual === 2) {
        if (seleccionTemporal === caso.familiaCorrecta) {
            score += 5;
            scoreDisplay.textContent = score;

            nodeFamily.className = "tree-node active-node";
            line2.className = "tree-connector active-line";

            step2Container.classList.add('hidden');
            step3Container.classList.remove('hidden');
            pasoActual = 3;
            deshabilitarConfirmacion();
            renderPaso3(caso);
        } else {
            mostrarFeedback(false, `Familia incorrecta. '${seleccionTemporal}' no pertenece al perfil aromático de este vino.`);
        }
    } else if (pasoActual === 3) {
        if (seleccionTemporal === caso.descriptorCorrecto) {
            score += 5;
            scoreDisplay.textContent = score;

            nodeDescriptor.className = "tree-node active-node";
            line3.className = "tree-connector active-line";

            mostrarFeedback(true, `¡Deducción perfecta! ${caso.explicacion}`);
        } else {
            mostrarFeedback(false, `Descriptor incorrecto. '${seleccionTemporal}' no es la nota específica de esta muestra.`);
        }
    }
});

function mostrarFeedback(esCorrecto, mensaje) {
    feedbackModal.classList.remove('hidden');
    feedbackStatus.textContent = esCorrecto ? "¡Análisis Correcto! (+15 pts)" : "Análisis Incorrecto";
    feedbackStatus.style.color = esCorrecto ? "#2e7d32" : "#c62828";
    feedbackText.textContent = mensaje;
}

nextBtn.addEventListener('click', () => {
    casoActualIndex++;
    if (casoActualIndex < CASOS_ENOLOGIA.length) {
        cargarCasoActual();
    } else {
        mostrarPantallaFinal();
    }
});

function mostrarPantallaFinal() {
    document.querySelector('.sample-info').classList.add('hidden');
    document.querySelector('.tree-container').classList.add('hidden');
    document.querySelector('.deduction-panel').classList.add('hidden');
    feedbackModal.classList.add('hidden');
    
    finalScoreEl.textContent = score;
    finalRankEl.textContent = score >= 130 ? "🥇 Enólogo Master" : score >= 90 ? "🥈 Sommelier Avanzado" : "🥉 Estudiante Jr.";
    endScreen.classList.remove('hidden');
}

restartBtn.addEventListener('click', () => {
    score = 0;
    casoActualIndex = 0;
    scoreDisplay.textContent = '0';
    endScreen.classList.add('hidden');
    document.querySelector('.sample-info').classList.remove('hidden');
    document.querySelector('.tree-container').classList.remove('hidden');
    document.querySelector('.deduction-panel').classList.remove('hidden');
    cargarCasoActual();
});

function configurarEventosGlobales() {
    if (openWheelBtn) openWheelBtn.addEventListener('click', () => wheelModal.classList.remove('hidden'));
    if (closeWheelBtn) closeWheelBtn.addEventListener('click', () => wheelModal.classList.add('hidden'));
}

function mezclarArreglo(arreglo) {
    return [...arreglo].sort(() => Math.random() - 0.5);
}