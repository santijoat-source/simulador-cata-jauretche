const JERARQUIA_AROMAS = {
    "Aromas Primarios": {
        "Frutas de Vino Blanco": ["Limón", "Lima", "Pomelo", "Mandarina", "Grosella espinosa", "Pera", "Manzana", "Manzana verde", "Durazno", "Melón", "Guayaba", "Piña", "Maracuyá", "Lichi", "Plátano", "Albaricoque seco", "Cáscara de naranja"],
        "Frutas de Vino Tinto": ["Grosella", "Grosella negra", "Frutilla", "Mora", "Frambuesa", "Cereza", "Ciruela", "Pasa"],
        "Floral": ["Madreselva", "Majuelo", "Flor de naranja", "Tilo", "Jazmín", "Acacia", "Rosa", "Lavanda", "Violeta"],
        "Vegetal": ["Pimiento", "Tomate", "Hinojo", "Pasto cortado", "Eneldo", "Tomillo", "Menta", "Helecho", "Heno", "Tabaco", "Té negro", "Hoja de laurel", "Eucalipto", "Hoja de grosella negra"],
        "Mineral": ["Sílex", "Queroseno", "Yodo"]
    },
    "Aromas Secundarios": {
        "Levaduras": ["Pan"],
        "Fermentación Malo-Láctica": ["Mantequilla", "Yogur"]
    },
    "Aromas Terciarios": {
        "Crianza en Barrica de Roble": ["Pino", "Cedro", "Sándalo", "Roble", "Almendra", "Avellana", "Coco", "Clavel", "Nuez moscada", "Regaliz", "Canela", "Pimienta", "Vainilla", "Alquitrán", "Humo", "Tocino", "Café", "Tostada", "Chocolate", "Caramelo"],
        "Vino Blanco Añejo": ["Miel", "Membrillo"],
        "Vino Tinto Añejo": ["Musgo de Árbol", "Trufa", "Seta", "Cuero", "Almizcle", "Salsa de carne"]
    },
    "Defectos": {
        "Enfermedad del Corcho": ["Sabor al corcho - TCA"],
        "Oxidado": ["Jerez"],
        "Calor": ["Madera"],
        "Acidez Volátil": ["Vinagre", "Disolvente de Tinta de uñas"],
        "Sulfitos": ["Caucho", "Cebolla", "Maíz", "Huevo putrefacto"],
        "Brett": ["Sudor de caballo", "Vendaje añejo"]
    }
};

let score = 0;
let currentMode = 'aroma'; // 'aroma', 'visual', 'examen'
let casoActualIndex = 0;

let selectedMacro = null;
let selectedFamily = null;
let selectedDescriptor = null;

let selectedCapa = null;
let selectedTono = null;

// DOM Elements
const homeScreen = document.getElementById('home-screen');
const gameContainer = document.getElementById('game-container');
const visualContainer = document.getElementById('visual-container');
const statsContainer = document.getElementById('stats-container');
const homeNavBtn = document.getElementById('home-nav-btn');
const restartMenuBtn = document.getElementById('restart-menu-btn');
const openAboutBtn = document.getElementById('open-about-btn');
const aboutModal = document.getElementById('about-modal');
const closeAboutBtn = document.getElementById('close-about-btn');
const printReportBtn = document.getElementById('print-report-btn');

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

// Visual DOM
const visBadge = document.getElementById('vis-badge');
const visTitle = document.getElementById('vis-title');
const visDescription = document.getElementById('vis-description');
const wineLiquid = document.getElementById('wine-liquid');
const capaOptions = document.getElementById('capa-options');
const tonoOptions = document.getElementById('tono-options');
const verifyVisBtn = document.getElementById('verify-vis-btn');

const feedbackModal = document.getElementById('feedback-modal');
const feedbackStatus = document.getElementById('feedback-status');
const feedbackText = document.getElementById('feedback-text');
const feedbackExtra = document.getElementById('feedback-extra');
const nextBtn = document.getElementById('next-btn');

const endScreen = document.getElementById('end-screen');
const finalScoreEl = document.getElementById('final-score');
const finalRankEl = document.getElementById('final-rank');

const openWheelBtn = document.getElementById('open-wheel-btn');
const closeWheelBtn = document.getElementById('close-wheel-btn');
const wheelModal = document.getElementById('wheel-modal');

document.addEventListener('DOMContentLoaded', () => {
    configurarTemaSVG();
    configurarNavegacionHome();
    configurarEventosGlobales();
});

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

function configurarNavegacionHome() {
    document.querySelectorAll('.mode-card').forEach(card => {
        card.addEventListener('click', () => {
            currentMode = card.getAttribute('data-mode');
            iniciarSesion();
        });
    });

    homeNavBtn.addEventListener('click', volverAlMenu);
    restartMenuBtn.addEventListener('click', volverAlMenu);

    printReportBtn.addEventListener('click', () => {
        window.print();
    });
}

function volverAlMenu() {
    gameContainer.classList.add('hidden');
    visualContainer.classList.add('hidden');
    statsContainer.classList.add('hidden');
    homeNavBtn.classList.add('hidden');
    endScreen.classList.add('hidden');
    feedbackModal.classList.add('hidden');
    homeScreen.classList.remove('hidden');
}

function iniciarSesion() {
    score = 0;
    casoActualIndex = 0;
    scoreDisplay.textContent = '0';
    homeScreen.classList.add('hidden');
    statsContainer.classList.remove('hidden');
    homeNavBtn.classList.remove('hidden');
    endScreen.classList.add('hidden');

    if (currentMode === 'visual') {
        visualContainer.classList.remove('hidden');
        cargarCasoVisual();
    } else {
        gameContainer.classList.remove('hidden');
        cargarCasoAroma();
    }
}

// --- MÓDULO AROMA ---
function cargarCasoAroma() {
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

function renderNivel1(caso) {
    level1Options.innerHTML = '';
    const opciones = mezclarArreglo(Object.keys(JERARQUIA_AROMAS));
    opciones.forEach(opcion => {
        const btn = document.createElement('button');
        btn.className = 'option-node';
        btn.textContent = opcion;
        btn.onclick = () => handleSelectNivel1(opcion, btn, caso);
        level1Options.appendChild(btn);
    });
}

function handleSelectNivel1(opcionTexto, elementoBoton, caso) {
    if (selectedMacro === opcionTexto) { deselectNivel1(); return; }
    selectedMacro = opcionTexto;
    line1.className = 'tree-line active';

    level1Options.querySelectorAll('.option-node').forEach(btn => {
        if (btn === elementoBoton) { btn.classList.add('selected-branch'); btn.classList.remove('unselected-collapsed'); }
        else { btn.classList.add('unselected-collapsed'); btn.classList.remove('selected-branch'); }
    });

    selectedFamily = null; selectedDescriptor = null; verifyBtn.disabled = true;
    line2.className = 'tree-line'; line3.className = 'tree-line'; level3Wrapper.classList.add('hidden');
    level2Wrapper.classList.remove('hidden');
    renderNivel2(caso);
}

function deselectNivel1() {
    selectedMacro = null; selectedFamily = null; selectedDescriptor = null;
    line1.className = 'tree-line'; line2.className = 'tree-line'; line3.className = 'tree-line';
    level2Wrapper.classList.add('hidden'); level3Wrapper.classList.add('hidden'); verifyBtn.disabled = true;
    level1Options.querySelectorAll('.option-node').forEach(btn => btn.classList.remove('selected-branch', 'unselected-collapsed'));
}

function renderNivel2(caso) {
    level2Options.innerHTML = '';
    const familiasValidas = Object.keys(JERARQUIA_AROMAS[selectedMacro] || {});
    let otrasFamilias = [];
    for (let m in JERARQUIA_AROMAS) { if (m !== selectedMacro) otrasFamilias.push(...Object.keys(JERARQUIA_AROMAS[m])); }
    const opciones = mezclarArreglo([...familiasValidas, ...mezclarArreglo(otrasFamilias).slice(0, 2)]);

    opciones.forEach(opcion => {
        const btn = document.createElement('button');
        btn.className = 'option-node';
        btn.textContent = opcion;
        btn.onclick = () => handleSelectNivel2(opcion, btn, caso);
        level2Options.appendChild(btn);
    });
}

function handleSelectNivel2(opcionTexto, elementoBoton, caso) {
    if (selectedFamily === opcionTexto) { deselectNivel2(); return; }
    selectedFamily = opcionTexto;
    line2.className = 'tree-line active';

    level2Options.querySelectorAll('.option-node').forEach(btn => {
        if (btn === elementoBoton) { btn.classList.add('selected-branch'); btn.classList.remove('unselected-collapsed'); }
        else { btn.classList.add('unselected-collapsed'); btn.classList.remove('selected-branch'); }
    });

    selectedDescriptor = null; verifyBtn.disabled = true; line3.className = 'tree-line';
    level3Wrapper.classList.remove('hidden');
    renderNivel3(caso);
}

function deselectNivel2() {
    selectedFamily = null; selectedDescriptor = null;
    line2.className = 'tree-line'; line3.className = 'tree-line';
    level3Wrapper.classList.add('hidden'); verifyBtn.disabled = true;
    level2Options.querySelectorAll('.option-node').forEach(btn => btn.classList.remove('selected-branch', 'unselected-collapsed'));
}

function renderNivel3(caso) {
    level3Options.innerHTML = '';
    let descriptoresValidos = (JERARQUIA_AROMAS[selectedMacro] && JERARQUIA_AROMAS[selectedMacro][selectedFamily]) || ["Desconocido"];
    let otrosDescriptores = [];
    if (JERARQUIA_AROMAS[selectedMacro]) {
        for (let f in JERARQUIA_AROMAS[selectedMacro]) {
            if (f !== selectedFamily) otrosDescriptores.push(...JERARQUIA_AROMAS[selectedMacro][f]);
        }
    }
    const opciones = mezclarArreglo([...descriptoresValidos, ...mezclarArreglo(otrosDescriptores).slice(0, 3)]);

    opciones.forEach(opcion => {
        const btn = document.createElement('button');
        btn.className = 'option-node';
        btn.textContent = opcion;
        btn.onclick = () => handleSelectNivel3(opcion, btn);
        level3Options.appendChild(btn);
    });
}

function handleSelectNivel3(opcionTexto, elementoBoton) {
    if (selectedDescriptor === opcionTexto) { deselectNivel3(); return; }
    selectedDescriptor = opcionTexto;
    line3.className = 'tree-line active';

    level3Options.querySelectorAll('.option-node').forEach(btn => {
        if (btn === elementoBoton) { btn.classList.add('selected-branch'); btn.classList.remove('unselected-collapsed'); }
        else { btn.classList.add('unselected-collapsed'); btn.classList.remove('selected-branch'); }
    });
    verifyBtn.disabled = false;
}

function deselectNivel3() {
    selectedDescriptor = null; line3.className = 'tree-line'; verifyBtn.disabled = true;
    level3Options.querySelectorAll('.option-node').forEach(btn => btn.classList.remove('selected-branch', 'unselected-collapsed'));
}

verifyBtn.addEventListener('click', () => {
    if (!selectedMacro || !selectedFamily || !selectedDescriptor) return;
    const caso = CASOS_ENOLOGIA[casoActualIndex];
    const esExito = (selectedMacro === caso.macroCorrecta && selectedFamily === caso.familiaCorrecta && selectedDescriptor === caso.descriptorCorrecto);

    if (esExito) {
        score += 15;
        scoreDisplay.textContent = score;
        mostrarFeedback(true, `✨ ¡Deducción perfecta!\n\n${caso.explicacion}`, caso.datoCurioso);
    } else {
        mostrarFeedback(false, `⚠️ Discrepancia en el análisis.\n\n• Elegiste: ${selectedMacro} > ${selectedFamily} > ${selectedDescriptor}\n• Correcto: ${caso.macroCorrecta} > ${caso.familiaCorrecta} > ${caso.descriptorCorrecto}\n\n${caso.explicacion}`, null);
    }
});

// --- MÓDULO VISUAL ---
function cargarCasoVisual() {
    const caso = CASOS_VISUALES[casoActualIndex % CASOS_VISUALES.length];
    selectedCapa = null; selectedTono = null; verifyVisBtn.disabled = true;

    visBadge.textContent = `Fase Visual #${caso.id}`;
    visTitle.textContent = caso.titulo;
    visDescription.textContent = caso.descripcion;
    wineLiquid.style.background = caso.colorHex;

    renderOpcionesVisuales(caso);
}

function renderOpcionesVisuales(caso) {
    capaOptions.innerHTML = '';
    tonoOptions.innerHTML = '';

    ["Capa Baja", "Capa Media", "Capa Media-Alta", "Capa Alta"].forEach(capa => {
        const btn = document.createElement('button');
        btn.className = 'option-node';
        btn.textContent = capa;
        btn.onclick = () => {
            selectedCapa = capa;
            capaOptions.querySelectorAll('.option-node').forEach(b => b.classList.remove('selected-branch'));
            btn.classList.add('selected-branch');
            chequearVisReady();
        };
        capaOptions.appendChild(btn);
    });

    ["Rojo Violáceo", "Amarillo Verdoso", "Rojo Rubí / Teja", "Dorado"].forEach(tono => {
        const btn = document.createElement('button');
        btn.className = 'option-node';
        btn.textContent = tono;
        btn.onclick = () => {
            selectedTono = tono;
            tonoOptions.querySelectorAll('.option-node').forEach(b => b.classList.remove('selected-branch'));
            btn.classList.add('selected-branch');
            chequearVisReady();
        };
        tonoOptions.appendChild(btn);
    });
}

function chequearVisReady() {
    if (selectedCapa && selectedTono) verifyVisBtn.disabled = false;
}

verifyVisBtn.addEventListener('click', () => {
    const caso = CASOS_VISUALES[casoActualIndex % CASOS_VISUALES.length];
    const esExito = (selectedTono === caso.tonoCorrecto);

    if (esExito) {
        score += 15;
        scoreDisplay.textContent = score;
        mostrarFeedback(true, `👁️ ¡Análisis visual correcto!\n\n${caso.explicacion}`, null);
    } else {
        mostrarFeedback(false, `⚠️ Error en la fase visual.\n• Correcto: ${caso.tonoCorrecto} (${caso.capaCorrecta})\n\n${caso.explicacion}`, null);
    }
});

function mostrarFeedback(esCorrecto, mensaje, datoCurioso) {
    feedbackModal.classList.remove('hidden');
    feedbackStatus.textContent = esCorrecto ? "✨ ¡Análisis Exitoso! (+15 pts)" : "⚠️ Discrepancia Sensorial";
    feedbackText.innerText = mensaje;

    if (esCorrecto && datoCurioso) {
        feedbackExtra.classList.remove('hidden');
        feedbackExtra.innerHTML = `<h4>💡 Sabías que...</h4><p>${datoCurioso}</p>`;
    } else {
        feedbackExtra.classList.add('hidden');
        feedbackExtra.innerHTML = '';
    }
}

nextBtn.addEventListener('click', () => {
    casoActualIndex++;
    const maxCasos = currentMode === 'visual' ? CASOS_VISUALES.length : CASOS_ENOLOGIA.length;
    if (casoActualIndex < maxCasos) {
        if (currentMode === 'visual') cargarCasoVisual();
        else cargarCasoAroma();
    } else {
        mostrarPantallaFinal();
    }
});

function mostrarPantallaFinal() {
    gameContainer.classList.add('hidden');
    visualContainer.classList.add('hidden');
    statsContainer.classList.add('hidden');
    feedbackModal.classList.add('hidden');

    finalScoreEl.textContent = score;
    finalRankEl.textContent = score >= 120 ? "🥇 Enólogo Master" : score >= 75 ? "🥈 Sommelier Avanzado" : "🥉 Estudiante Práctica Jr.";
    endScreen.classList.remove('hidden');
}

function configurarEventosGlobales() {
    if (openWheelBtn) openWheelBtn.addEventListener('click', () => {
        if (currentMode === 'examen') alert("⚠️ La Rueda de Aromas está deshabilitada en el Modo Examen.");
        else wheelModal.classList.remove('hidden');
    });
    if (closeWheelBtn) closeWheelBtn.addEventListener('click', () => wheelModal.classList.add('hidden'));
    if (openAboutBtn) openAboutBtn.addEventListener('click', () => aboutModal.classList.remove('hidden'));
    if (closeAboutBtn) closeAboutBtn.addEventListener('click', () => aboutModal.classList.add('hidden'));
}

function mezclarArreglo(arreglo) {
    return [...arreglo].sort(() => Math.random() - 0.5);
}