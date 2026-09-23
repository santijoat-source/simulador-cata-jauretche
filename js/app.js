let score = 0;
let casoActualIndex = 0;

// Estado del Árbol de Selecciones
let selectedMacro = null;
let selectedFamily = null;
let selectedDescriptor = null;

// Referencias a Elementos DOM
const scoreDisplay = document.getElementById('score-display');
const caseCounter = document.getElementById('case-counter');
const themeToggleBtn = document.getElementById('theme-toggle');
const moonIcon = document.getElementById('moon-icon');
const sunIcon = document.getElementById('sun-icon');

const rootNodeTitle = document.getElementById('root-node-title');
const line1 = document.getElementById('line-1');
const line2 = document.getElementById('line-2');
const line3 = document.getElementById('line-3');

const level1Options = document.getElementById('level-1-options');
const level2Wrapper = document.getElementById('level-2-wrapper');
const level2Options = document.getElementById('level-2-options');
const level3Wrapper = document.getElementById('level-3-wrapper');
const level3Options = document.getElementById('level-3-options');

const verifyBtn = document.getElementById('verify-btn');

const sampleBadge = document.getElementById('sample-badge');
const samplePerception = document.getElementById('sample-perception');
const sampleTitle = document.getElementById('sample-title');
const sampleDescription = document.getElementById('sample-description');

const feedbackModal = document.getElementById('feedback-modal');
const feedbackStatus = document.getElementById('feedback-status');
const feedbackText = document.getElementById('feedback-text');
const nextBtn = document.getElementById('next-btn');

const endScreen = document.getElementById('end-screen');
const finalScoreEl = document.getElementById('final-score');
const finalRankEl = document.getElementById('final-rank');
const restartBtn = document.getElementById('restart-btn');

const openWheelBtn = document.getElementById('open-wheel-btn');
const closeWheelBtn = document.getElementById('close-wheel-btn');
const wheelModal = document.getElementById('wheel-modal');

document.addEventListener('DOMContentLoaded', () => {
    configurarTemaSVG();
    cargarCasoActual();
    configurarEventosGlobales();
});

// TEMA VISUAL
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

// MUESTRA
function cargarCasoActual() {
    const caso = CASOS_ENOLOGIA[casoActualIndex];

    selectedMacro = null;
    selectedFamily = null;
    selectedDescriptor = null;
    verifyBtn.disabled = true;

    sampleBadge.textContent = `Muestra #${caso.id}`;
    samplePerception.textContent = caso.percepcion;
    sampleTitle.textContent = caso.titulo;
    sampleDescription.textContent = caso.descripcion;
    caseCounter.textContent = `${casoActualIndex + 1} / ${CASOS_ENOLOGIA.length}`;
    rootNodeTitle.textContent = caso.titulo;

    feedbackModal.classList.add('hidden');
    level2Wrapper.classList.add('hidden');
    level3Wrapper.classList.add('hidden');

    line1.className = 'tree-line';
    line2.className = 'tree-line';
    line3.className = 'tree-line';

    renderNivel1(caso);
}

// ==========================================
// LÓGICA DE SELECCIÓN E INTERACTIVIDAD EN ÁRBOL
// ==========================================

// NIVEL 1: MACRO
function renderNivel1(caso) {
    level1Options.innerHTML = '';
    const opciones = mezclarArreglo([caso.macroCorrecta, ...caso.distractoresMacro]);

    opciones.forEach(opcion => {
        const btn = document.createElement('button');
        btn.className = 'option-node';
        btn.textContent = opcion;
        btn.onclick = () => handleSelectNivel1(opcion, btn, caso);
        level1Options.appendChild(btn);
    });
}

function handleSelectNivel1(opcionTexto, elementoBoton, caso) {
    // Si vuelve a tocar el seleccionado -> Deshacer selección (Backtracking)
    if (selectedMacro === opcionTexto) {
        deselectNivel1();
        return;
    }

    selectedMacro = opcionTexto;
    line1.className = 'tree-line active';

    // Animación: Las casillas no elegidas colapsan a 0, la elegida se centra y resalta
    const botones = level1Options.querySelectorAll('.option-node');
    botones.forEach(btn => {
        if (btn === elementoBoton) {
            btn.classList.add('selected-branch');
            btn.classList.remove('unselected-collapsed');
        } else {
            btn.classList.add('unselected-collapsed');
            btn.classList.remove('selected-branch');
        }
    });

    selectedFamily = null;
    selectedDescriptor = null;
    verifyBtn.disabled = true;
    line2.className = 'tree-line';
    line3.className = 'tree-line';
    level3Wrapper.classList.add('hidden');

    level2Wrapper.classList.remove('hidden');
    renderNivel2(caso);
}

function deselectNivel1() {
    selectedMacro = null;
    selectedFamily = null;
    selectedDescriptor = null;

    line1.className = 'tree-line';
    line2.className = 'tree-line';
    line3.className = 'tree-line';

    level2Wrapper.classList.add('hidden');
    level3Wrapper.classList.add('hidden');
    verifyBtn.disabled = true;

    const botones = level1Options.querySelectorAll('.option-node');
    botones.forEach(btn => {
        btn.classList.remove('selected-branch', 'unselected-collapsed');
    });
}

// NIVEL 2: FAMILIA
function renderNivel2(caso) {
    level2Options.innerHTML = '';
    const opciones = mezclarArreglo([caso.familiaCorrecta, ...caso.distractoresFamilia]);

    opciones.forEach(opcion => {
        const btn = document.createElement('button');
        btn.className = 'option-node';
        btn.textContent = opcion;
        btn.onclick = () => handleSelectNivel2(opcion, btn, caso);
        level2Options.appendChild(btn);
    });
}

function handleSelectNivel2(opcionTexto, elementoBoton, caso) {
    if (selectedFamily === opcionTexto) {
        deselectNivel2();
        return;
    }

    selectedFamily = opcionTexto;
    line2.className = 'tree-line active';

    const botones = level2Options.querySelectorAll('.option-node');
    botones.forEach(btn => {
        if (btn === elementoBoton) {
            btn.classList.add('selected-branch');
            btn.classList.remove('unselected-collapsed');
        } else {
            btn.classList.add('unselected-collapsed');
            btn.classList.remove('selected-branch');
        }
    });

    selectedDescriptor = null;
    verifyBtn.disabled = true;
    line3.className = 'tree-line';

    level3Wrapper.classList.remove('hidden');
    renderNivel3(caso);
}

function deselectNivel2() {
    selectedFamily = null;
    selectedDescriptor = null;

    line2.className = 'tree-line';
    line3.className = 'tree-line';

    level3Wrapper.classList.add('hidden');
    verifyBtn.disabled = true;

    const botones = level2Options.querySelectorAll('.option-node');
    botones.forEach(btn => {
        btn.classList.remove('selected-branch', 'unselected-collapsed');
    });
}

// NIVEL 3: DESCRIPTOR
function renderNivel3(caso) {
    level3Options.innerHTML = '';
    const opciones = mezclarArreglo([caso.descriptorCorrecto, ...caso.distractoresDescriptor]);

    opciones.forEach(opcion => {
        const btn = document.createElement('button');
        btn.className = 'option-node';
        btn.textContent = opcion;
        btn.onclick = () => handleSelectNivel3(opcion, btn);
        level3Options.appendChild(btn);
    });
}

function handleSelectNivel3(opcionTexto, elementoBoton) {
    if (selectedDescriptor === opcionTexto) {
        deselectNivel3();
        return;
    }

    selectedDescriptor = opcionTexto;
    line3.className = 'tree-line active';

    const botones = level3Options.querySelectorAll('.option-node');
    botones.forEach(btn => {
        if (btn === elementoBoton) {
            btn.classList.add('selected-branch');
            btn.classList.remove('unselected-collapsed');
        } else {
            btn.classList.add('unselected-collapsed');
            btn.classList.remove('selected-branch');
        }
    });

    // Habilitar verificación única al completar la ruta
    verifyBtn.disabled = false;
}

function deselectNivel3() {
    selectedDescriptor = null;
    line3.className = 'tree-line';
    verifyBtn.disabled = true;

    const botones = level3Options.querySelectorAll('.option-node');
    botones.forEach(btn => {
        btn.classList.remove('selected-branch', 'unselected-collapsed');
    });
}

// VERIFICACIÓN FINAL (EVALUACIÓN DIFERIDA)
verifyBtn.addEventListener('click', () => {
    if (!selectedMacro || !selectedFamily || !selectedDescriptor) return;

    const caso = CASOS_ENOLOGIA[casoActualIndex];

    const esMacroCorrecto = selectedMacro === caso.macroCorrecta;
    const esFamiliaCorrecta = selectedFamily === caso.familiaCorrecta;
    const esDescriptorCorrecto = selectedDescriptor === caso.descriptorCorrecto;

    const esExitoTotal = esMacroCorrecto && esFamiliaCorrecta && esDescriptorCorrecto;

    if (esExitoTotal) {
        score += 15;
        scoreDisplay.textContent = score;
        mostrarFeedback(true, `¡Deducción perfecta del perfil sensorial!\n\n${caso.explicacion}`);
    } else {
        let detallesError = [];
        if (!esMacroCorrecto) detallesError.push(`• Nivel 1 (Macro): Seleccionaste '${selectedMacro}' (Correcto: '${caso.macroCorrecta}')`);
        if (!esFamiliaCorrecta) detallesError.push(`• Nivel 2 (Familia): Seleccionaste '${selectedFamily}' (Correcto: '${caso.familiaCorrecta}')`);
        if (!esDescriptorCorrecto) detallesError.push(`• Nivel 3 (Descriptor): Seleccionaste '${selectedDescriptor}' (Correcto: '${caso.descriptorCorrecto}')`);

        mostrarFeedback(false, `Tu deducción presentó las siguientes inconsistencias:\n\n${detallesError.join('\n')}\n\nPuedes consultar la Rueda Aromaster para repasar.`);
    }
});

function mostrarFeedback(esCorrecto, mensaje) {
    feedbackModal.classList.remove('hidden');
    feedbackStatus.textContent = esCorrecto ? "¡Análisis Sensorial Correcto! (+15 pts)" : "Discrepancia en el Análisis";
    feedbackStatus.style.color = esCorrecto ? "#2e7d32" : "#c62828";
    feedbackText.innerText = mensaje;
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
    document.querySelector('.tree-interactive-section').classList.add('hidden');
    feedbackModal.classList.add('hidden');

    finalScoreEl.textContent = score;
    finalRankEl.textContent = score >= 120 ? "🥇 Enólogo Master" : score >= 75 ? "🥈 Sommelier Avanzado" : "🥉 Estudiante Jr.";
    endScreen.classList.remove('hidden');
}

restartBtn.addEventListener('click', () => {
    score = 0;
    casoActualIndex = 0;
    scoreDisplay.textContent = '0';
    endScreen.classList.add('hidden');
    document.querySelector('.sample-info').classList.remove('hidden');
    document.querySelector('.tree-interactive-section').classList.remove('hidden');
    cargarCasoActual();
});

function configurarEventosGlobales() {
    if (openWheelBtn) openWheelBtn.addEventListener('click', () => wheelModal.classList.remove('hidden'));
    if (closeWheelBtn) closeWheelBtn.addEventListener('click', () => wheelModal.classList.add('hidden'));
}

function mezclarArreglo(arreglo) {
    return [...arreglo].sort(() => Math.random() - 0.5);
}