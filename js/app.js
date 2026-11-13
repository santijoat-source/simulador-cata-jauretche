// Estructura jerárquica secuencial estricta según Rueda de Aromas Ultimate (v2)
const JERARQUIA_AROMAS = {
    "Aromas Primarios": {
        "Frutas de Vino Blanco": {
            "Cítricos": ["Limón", "Lima", "Pomelo", "Mandarina"],
            "Bayas Blancas": ["Grosella espinosa"],
            "Frutas de Pepita": ["Pera", "Manzana", "Manzana verde"],
            "Frutas de Hueso": ["Durazno"],
            "Frutas Tropicales": ["Melón", "Guayaba", "Piña", "Maracuyá", "Lichi", "Plátano"],
            "Botritizadas": ["Albaricoque seco", "Cáscara de naranja"]
        },
        "Frutas de Vino Tinto": {
            "Bayas Rojas": ["Grosella", "Grosella negra", "Frutilla", "Mora", "Frambuesa"],
            "Frutas de Hueso - Tintos": ["Cereza", "Ciruela"],
            "Fortificado": ["Pasa"]
        },
        "Floral": {
            "Flores Blancas": ["Madreselva", "Majuelo", "Flor de naranja", "Tilo", "Jazmín", "Acacia"],
            "Flores de Colores": ["Rosa", "Lavanda", "Violeta"]
        },
        "Vegetal": {
            "Verduras": ["Pimiento", "Tomate", "Hinojo"],
            "Hierbas Frescas": ["Pasto cortado", "Eneldo", "Tomillo", "Menta", "Helecho"],
            "Hierbas Secas": ["Heno", "Tabaco", "Té negro"],
            "Hojas": ["Hoja de laurel", "Eucalipto", "Hoja de grosella negra"]
        },
        "Mineral": ["Sílex", "Queroseno", "Yodo"] // Salto directo Opción 3 (sin subfamilia)
    },
    "Aromas Secundarios": {
        "Levaduras": ["Pan"],
        "Fermentación Malo-Láctica": ["Mantequilla", "Yogur"]
    },
    "Aromas Terciarios": {
        "Crianza en Barrica de Roble": {
            "Maderas": ["Pino", "Cedro", "Sándalo", "Roble"],
            "Nueces": ["Almendra", "Avellana", "Coco"],
            "Especias": ["Clavel", "Nuez moscada", "Regaliz", "Canela", "Pimienta", "Vainilla"],
            "Tostados": ["Alquitrán", "Humo", "Tocino", "Café", "Tostada", "Chocolate", "Caramelo"]
        },
        "Vino Blanco Añejo": ["Miel", "Membrillo"],
        "Vino Tinto Añejo": {
            "Matorral": ["Musgo de Árbol", "Trufa", "Seta"],
            "Animal": ["Cuero", "Almizcle", "Salsa de carne"]
        }
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
let currentMode = 'aroma';
let casoActualIndex = 0;

let selectedMacro = null;     // Opción 1
let selectedFamily = null;    // Opción 2
let selectedSubfamily = null; // Opción 3 (si aplica)
let selectedDescriptor = null;// Opción final

let selectedCapa = null;
let selectedTono = null;

// Pantallas
const heroScreen = document.getElementById('hero-screen');
const modesScreen = document.getElementById('modes-screen');
const gameContainer = document.getElementById('game-container');
const visualContainer = document.getElementById('visual-container');
const endScreen = document.getElementById('end-screen');

// Navegación
const brandLogo = document.getElementById('brand-logo');
const enterModesBtn = document.getElementById('enter-modes-btn');
const homeNavBtn = document.getElementById('home-nav-btn');
const restartMenuBtn = document.getElementById('restart-menu-btn');
const statsContainer = document.getElementById('stats-container');

const openAboutBtn = document.getElementById('open-about-btn');
const aboutModal = document.getElementById('about-modal');
const closeAboutBtn = document.getElementById('close-about-btn');
const printReportBtn = document.getElementById('print-report-btn');

const scoreDisplay = document.getElementById('score-display');
const caseCounter = document.getElementById('case-counter');
const themeToggleBtn = document.getElementById('theme-toggle');
const moonIcon = document.getElementById('moon-icon');
const sunIcon = document.getElementById('sun-icon');

// Árbol DOM
const rootNodeTitle = document.getElementById('root-node-title');
const line1 = document.getElementById('line-1');
const line2 = document.getElementById('line-2');
const line3 = document.getElementById('line-3');
const line4 = document.getElementById('line-4'); // Por si se requiere en 4 niveles

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

// Feedback y Modales
const feedbackModal = document.getElementById('feedback-modal');
const feedbackStatus = document.getElementById('feedback-status');
const feedbackText = document.getElementById('feedback-text');
const feedbackExtra = document.getElementById('feedback-extra');
const nextBtn = document.getElementById('next-btn');

const finalScoreEl = document.getElementById('final-score');
const finalRankEl = document.getElementById('final-rank');

const openWheelBtn = document.getElementById('open-wheel-btn');
const closeWheelBtn = document.getElementById('close-wheel-btn');
const wheelModal = document.getElementById('wheel-modal');

document.addEventListener('DOMContentLoaded', () => {
    configurarTemaSVG();
    configurarNavegacion();
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

function ocultarTodasLasPantallas() {
    heroScreen.classList.add('hidden');
    modesScreen.classList.add('hidden');
    gameContainer.classList.add('hidden');
    visualContainer.classList.add('hidden');
    endScreen.classList.add('hidden');
    feedbackModal.classList.add('hidden');
}

function configurarNavegacion() {
    enterModesBtn.addEventListener('click', () => {
        ocultarTodasLasPantallas();
        modesScreen.classList.remove('hidden');
        homeNavBtn.classList.remove('hidden');
        statsContainer.classList.add('hidden');
    });

    document.querySelectorAll('.mode-clean-item').forEach(card => {
        card.addEventListener('click', () => {
            currentMode = card.getAttribute('data-mode');
            iniciarSesion();
        });
    });

    const irAlInicio = () => {
        ocultarTodasLasPantallas();
        heroScreen.classList.remove('hidden');
        homeNavBtn.classList.add('hidden');
        statsContainer.classList.add('hidden');
        openWheelBtn.classList.remove('hidden');
    };

    brandLogo.addEventListener('click', irAlInicio);
    homeNavBtn.addEventListener('click', irAlInicio);
    restartMenuBtn.addEventListener('click', irAlInicio);

    printReportBtn.addEventListener('click', () => window.print());
}

function iniciarSesion() {
    score = 0;
    casoActualIndex = 0;
    scoreDisplay.textContent = '0';
    ocultarTodasLasPantallas();
    statsContainer.classList.remove('hidden');
    homeNavBtn.classList.remove('hidden');

    if (currentMode === 'examen') {
        openWheelBtn.classList.add('hidden');
    } else {
        openWheelBtn.classList.remove('hidden');
    }

    if (currentMode === 'visual') {
        visualContainer.classList.remove('hidden');
        cargarCasoVisual();
    } else {
        gameContainer.classList.remove('hidden');
        cargarCasoAroma();
    }
}

// --- MÓDULO AROMA (SECUENCIAL ESTRICTO) ---
function cargarCasoAroma() {
    const caso = CASOS_ENOLOGIA[casoActualIndex];
    selectedMacro = null;
    selectedFamily = null;
    selectedSubfamily = null;
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

// Opción 1: Clasificación General (Macro)
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

    selectedFamily = null; selectedSubfamily = null; selectedDescriptor = null; verifyBtn.disabled = true;
    line2.className = 'tree-line'; line3.className = 'tree-line'; level3Wrapper.classList.add('hidden');
    level2Wrapper.classList.remove('hidden');
    renderNivel2(caso);
}

function deselectNivel1() {
    selectedMacro = null; selectedFamily = null; selectedSubfamily = null; selectedDescriptor = null;
    line1.className = 'tree-line'; line2.className = 'tree-line'; line3.className = 'tree-line';
    level2Wrapper.classList.add('hidden'); level3Wrapper.classList.add('hidden'); verifyBtn.disabled = true;
    level1Options.querySelectorAll('.option-node').forEach(btn => btn.classList.remove('selected-branch', 'unselected-collapsed'));
}

// Opción 2: Familia Aromática
function renderNivel2(caso) {
    level2Options.innerHTML = '';
    const nodoMacro = JERARQUIA_AROMAS[selectedMacro] || {};
    const familiasValidas = Object.keys(nodoMacro);
    
    let otrasFamilias = [];
    for (let m in JERARQUIA_AROMAS) {
        if (m !== selectedMacro) otrasFamilias.push(...Object.keys(JERARQUIA_AROMAS[m]));
    }
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

    selectedSubfamily = null; selectedDescriptor = null; verifyBtn.disabled = true;
    line3.className = 'tree-line';
    level3Wrapper.classList.remove('hidden');
    
    // Verificar si esta familia tiene subfamilias o salta directo a descriptores (ej. Mineral, Defectos, etc.)
    const nodoFamilia = (JERARQUIA_AROMAS[selectedMacro] && JERARQUIA_AROMAS[selectedMacro][selectedFamily]) || {};
    
    if (Array.isArray(nodoFamilia)) {
        // Salto directo a descriptores (Opción 3/4 unificada)
        renderNivelDirecto(nodoFamilia);
    } else {
        // Tiene Opción 3 (Subfamilias)
        renderNivel3Subfamilias(nodoFamilia);
    }
}

function deselectNivel2() {
    selectedFamily = null; selectedSubfamily = null; selectedDescriptor = null;
    line2.className = 'tree-line'; line3.className = 'tree-line';
    level3Wrapper.classList.add('hidden'); verifyBtn.disabled = true;
    level2Options.querySelectorAll('.option-node').forEach(btn => btn.classList.remove('selected-branch', 'unselected-collapsed'));
}

// Opción 3: Subfamilias (si la familia tiene divisiones)
function renderNivel3Subfamilias(nodoFamilia) {
    level3Options.innerHTML = '';
    const subfamiliasValidas = Object.keys(nodoFamilia);
    
    let otrasSub = [];
    for (let f in (JERARQUIA_AROMAS[selectedMacro] || {})) {
        if (f !== selectedFamily && typeof JERARQUIA_AROMAS[selectedMacro][f] === 'object' && !Array.isArray(JERARQUIA_AROMAS[selectedMacro][f])) {
            otrasSub.push(...Object.keys(JERARQUIA_AROMAS[selectedMacro][f]));
        }
    }
    const opciones = mezclarArreglo([...subfamiliasValidas, ...mezclarArreglo(otrasSub).slice(0, 2)]);

    opciones.forEach(opcion => {
        const btn = document.createElement('button');
        btn.className = 'option-node';
        btn.textContent = opcion;
        btn.onclick = () => handleSelectSubfamilia(opcion, btn, nodoFamilia);
        level3Options.appendChild(btn);
    });
}

function handleSelectSubfamilia(opcionTexto, elementoBoton, nodoFamilia) {
    selectedSubfamily = opcionTexto;
    level3Options.querySelectorAll('.option-node').forEach(btn => {
        if (btn === elementoBoton) { btn.classList.add('selected-branch'); btn.classList.remove('unselected-collapsed'); }
        else { btn.classList.add('unselected-collapsed'); btn.classList.remove('selected-branch'); }
    });

    const listaDescriptores = nodoFamilia[selectedSubfamily] || ["Desconocido"];
    renderNivelDescriptorFinal(listaDescriptores);
}

// Salto directo o nivel final de descriptores
function renderNivelDirecto(listaValida) {
    level3Options.innerHTML = '';
    let otrosDesc = [];
    for (let f in (JERARQUIA_AROMAS[selectedMacro] || {})) {
        if (f !== selectedFamily) {
            let val = JERARQUIA_AROMAS[selectedMacro][f];
            if (Array.isArray(val)) otrosDesc.push(...val);
            else if (typeof val === 'object') {
                for (let sub in val) otrosDesc.push(...val[sub]);
            }
        }
    }
    const opciones = mezclarArreglo([...listaValida, ...mezclarArreglo(otrosDesc).slice(0, 3)]);

    opciones.forEach(opcion => {
        const btn = document.createElement('button');
        btn.className = 'option-node';
        btn.textContent = opcion;
        btn.onclick = () => handleSelectDescriptorFinal(opcion, btn);
        level3Options.appendChild(btn);
    });
}

function renderNivelDescriptorFinal(listaValida) {
    // Si tuviéramos un 4to nivel visual estricto, aquí se renderiza, pero lo manejamos fluido en el nivel 3 con la misma rejilla
    // Para simplificar y mantener la linealidad limpia vertical del PDF:
    let otrosDesc = [];
    for (let sub in (JERARQUIA_AROMAS[selectedMacro][selectedFamily] || {})) {
        if (sub !== selectedSubfamily) {
            otrosDesc.push(...JERARQUIA_AROMAS[selectedMacro][selectedFamily][sub]);
        }
    }
    const opciones = mezclarArreglo([...listaValida, ...mezclarArreglo(otrosDesc).slice(0, 3)]);

    level3Options.innerHTML = '';
    opciones.forEach(opcion => {
        const btn = document.createElement('button');
        btn.className = 'option-node';
        btn.textContent = opcion;
        btn.onclick = () => handleSelectDescriptorFinal(opcion, btn);
        level3Options.appendChild(btn);
    });
}

function handleSelectDescriptorFinal(opcionTexto, elementoBoton) {
    if (selectedDescriptor === opcionTexto) { deselectDescriptorFinal(); return; }
    selectedDescriptor = opcionTexto;
    line3.className = 'tree-line active';

    level3Options.querySelectorAll('.option-node').forEach(btn => {
        if (btn === elementoBoton) { btn.classList.add('selected-branch'); btn.classList.remove('unselected-collapsed'); }
        else { btn.classList.add('unselected-collapsed'); btn.classList.remove('selected-branch'); }
    });
    verifyBtn.disabled = false;
}

function deselectDescriptorFinal() {
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
        mostrarFeedback(true, `Deducción perfecta.\n\n${caso.explicacion}`, caso.datoCurioso);
    } else {
        mostrarFeedback(false, `Discrepancia en el análisis.\n\n• Elegiste: ${selectedMacro} › ${selectedFamily} › ${selectedDescriptor}\n• Correcto: ${caso.macroCorrecta} › ${caso.familiaCorrecta} › ${caso.descriptorCorrecto}\n\n${caso.explicacion}`, null);
    }
});

// --- MÓDULO VISUAL ---
function cargarCasoVisual() {
    const caso = CASOS_VISUALES[casoActualIndex % CASOS_VISUALES.length];
    selectedCapa = null; selectedTono = null; verifyVisBtn.disabled = true;

    visBadge.textContent = `Fase Visual #${caso.id}`;
    visTitle.textContent = caso.titulo;
    visDescription.textContent = caso.descripcion;
    caseCounter.textContent = `${casoActualIndex + 1} / ${CASOS_VISUALES.length}`;
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
        mostrarFeedback(true, `Análisis visual correcto.\n\n${caso.explicacion}`, null);
    } else {
        mostrarFeedback(false, `Discrepancia en la fase visual.\n• Correcto: ${caso.tonoCorrecto} (${caso.capaCorrecta})\n\n${caso.explicacion}`, null);
    }
});

function mostrarFeedback(esCorrecto, mensaje, datoCurioso) {
    feedbackModal.classList.remove('hidden');
    feedbackStatus.textContent = esCorrecto ? "Análisis Exitoso (+15 pts)" : "Discrepancia Sensorial";
    feedbackText.innerText = mensaje;

    if (esCorrecto && datoCurioso) {
        feedbackExtra.classList.remove('hidden');
        feedbackExtra.innerHTML = `<h4>Dato Técnico</h4><p>${datoCurioso}</p>`;
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
    ocultarTodasLasPantallas();
    statsContainer.classList.add('hidden');
    openWheelBtn.classList.remove('hidden');

    finalScoreEl.textContent = score;
    finalRankEl.textContent = score >= 120 ? "Enólogo Master" : score >= 75 ? "Sommelier Avanzado" : "Práctica Inicial";
    endScreen.classList.remove('hidden');
}

function configurarEventosGlobales() {
    if (openWheelBtn) openWheelBtn.addEventListener('click', () => wheelModal.classList.remove('hidden'));
    if (closeWheelBtn) closeWheelBtn.addEventListener('click', () => wheelModal.classList.add('hidden'));
    if (openAboutBtn) openAboutBtn.addEventListener('click', () => aboutModal.classList.remove('hidden'));
    if (closeAboutBtn) closeAboutBtn.addEventListener('click', () => aboutModal.classList.add('hidden'));
}

function mezclarArreglo(arreglo) {
    return [...arreglo].sort(() => Math.random() - 0.5);
}