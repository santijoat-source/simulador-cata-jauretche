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
let casoActualIndex = 0;

let selectedMacro = null;
let selectedFamily = null;
let selectedDescriptor = null;

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
const feedbackExtra = document.getElementById('feedback-extra');
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

// --- NIVEL 1: MACRO ---
function renderNivel1(caso) {
    level1Options.innerHTML = '';
    const macros = Object.keys(JERARQUIA_AROMAS);
    const opciones = mezclarArreglo(macros);

    opciones.forEach(opcion => {
        const btn = document.createElement('button');
        btn.className = 'option-node';
        btn.textContent = opcion;
        btn.onclick = () => handleSelectNivel1(opcion, btn, caso);
        level1Options.appendChild(btn);
    });
}

function handleSelectNivel1(opcionTexto, elementoBoton, caso) {
    if (selectedMacro === opcionTexto) {
        deselectNivel1();
        return;
    }

    selectedMacro = opcionTexto;
    line1.className = 'tree-line active';

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

// --- NIVEL 2: FAMILIA ---
function renderNivel2(caso) {
    level2Options.innerHTML = '';
    const familiasValidas = Object.keys(JERARQUIA_AROMAS[selectedMacro] || {});
    let otrasFamilias = [];
    for (let m in JERARQUIA_AROMAS) {
        if (m !== selectedMacro) {
            otrasFamilias.push(...Object.keys(JERARQUIA_AROMAS[m]));
        }
    }
    const distractores = mezclarArreglo(otrasFamilias).slice(0, 2);
    const opciones = mezclarArreglo([...familiasValidas, ...distractores]);

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

// --- NIVEL 3: DESCRIPTOR ---
function renderNivel3(caso) {
    level3Options.innerHTML = '';
    
    let descriptoresValidos = [];
    if (JERARQUIA_AROMAS[selectedMacro] && JERARQUIA_AROMAS[selectedMacro][selectedFamily]) {
        descriptoresValidos = JERARQUIA_AROMAS[selectedMacro][selectedFamily];
    } else {
        for (let m in JERARQUIA_AROMAS) {
            if (JERARQUIA_AROMAS[m][selectedFamily]) {
                descriptoresValidos = JERARQUIA_AROMAS[m][selectedFamily];
                break;
            }
        }
    }
    if (descriptoresValidos.length === 0) descriptoresValidos = ["Desconocido"];

    let otrosDescriptores = [];
    if (JERARQUIA_AROMAS[selectedMacro]) {
        for (let f in JERARQUIA_AROMAS[selectedMacro]) {
            if (f !== selectedFamily) {
                otrosDescriptores.push(...JERARQUIA_AROMAS[selectedMacro][f]);
            }
        }
    }
    const distractores = mezclarArreglo(otrosDescriptores).slice(0, 3);
    const opciones = mezclarArreglo([...descriptoresValidos, ...distractores]);

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

// VERIFICACIÓN FINAL CON FEEDBACK Y DATOS CURIOSOS
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
        mostrarFeedback(true, `¡Felicitaciones! Análisis sensorial perfecto.\n\n${caso.explicacion}`, caso.datoCurioso);
    } else {
        let detallesError = [];
        if (!esMacroCorrecto) detallesError.push(`• General: Elegiste '${selectedMacro}' (Correcto: '${caso.macroCorrecta}')`);
        if (!esFamiliaCorrecta) detallesError.push(`• Familia: Elegiste '${selectedFamily}' (Correcto: '${caso.familiaCorrecta}')`);
        if (!esDescriptorCorrecto) detallesError.push(`• Descriptor: Elegiste '${selectedDescriptor}' (Correcto: '${caso.descriptorCorrecto}')`);

        mostrarFeedback(false, `Tu deducción presentó discrepancias:\n\n${detallesError.join('\n')}\n\nExplicación técnica:\n${caso.explicacion}`, null);
    }
});

function mostrarFeedback(esCorrecto, mensaje, datoCurioso) {
    feedbackModal.classList.remove('hidden');
    feedbackStatus.textContent = esCorrecto ? "✨ ¡Análisis Correcto! (+15 pts)" : "⚠️ Discrepancia en el Análisis";
    feedbackStatus.style.color = esCorrecto ? "#DFB6B2" : "#DFB6B2";
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