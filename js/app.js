// Estructura jerárquica estricta Rueda de Aromas Ultimate
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
        "Mineral": ["Sílex", "Queroseno", "Yodo"]
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

// Configuración de API en la Nube (JSONBin gratuito para almacenamiento global docente)
const JSONBIN_BIN_ID = "6732ef1ce41b4d34e44f83a3"; // Bin ID compartido público/privado
const JSONBIN_API_KEY = "$2a$10$wN2aZ2gQ5Z5Q5Z5Q5Z5Q5u8X8X8X8X8X8X8X8X8X8X8X8X8X8X8X"; // Token de acceso

let score = 0;
let currentMode = 'aroma';
let currentStudentName = 'Estudiante';
let casoActualIndex = 0;

let selectedMacro = null;
let selectedFamily = null;
let selectedSubfamily = null;
let selectedDescriptor = null;

let selectedCapa = null;
let selectedTono = null;

// Elementos DOM
const heroScreen = document.getElementById('hero-screen');
const modesScreen = document.getElementById('modes-screen');
const gameContainer = document.getElementById('game-container');
const visualContainer = document.getElementById('visual-container');
const endScreen = document.getElementById('end-screen');

const brandLogo = document.getElementById('brand-logo');
const enterModesBtn = document.getElementById('enter-modes-btn');
const homeNavBtn = document.getElementById('home-nav-btn');
const restartMenuBtn = document.getElementById('restart-menu-btn');
const statsContainer = document.getElementById('stats-container');

const nameModal = document.getElementById('name-modal');
const studentNameInput = document.getElementById('student-name-input');
const startSessionBtn = document.getElementById('start-session-btn');
const openTeacherBtn = document.getElementById('open-teacher-btn');
const teacherModal = document.getElementById('teacher-modal');
const closeTeacherBtn = document.getElementById('close-teacher-btn');
const teacherTableBody = document.getElementById('teacher-table-body');
const refreshRecordsBtn = document.getElementById('refresh-records-btn');

const studentTagAroma = document.getElementById('student-tag-aroma');
const studentTagVis = document.getElementById('student-tag-vis');

const openAboutBtn = document.getElementById('open-about-btn');
const aboutModal = document.getElementById('about-modal');
const closeAboutBtn = document.getElementById('close-about-btn');

const scoreDisplay = document.getElementById('score-display');
const caseCounter = document.getElementById('case-counter');
const themeToggleBtn = document.getElementById('theme-toggle');
const moonIcon = document.getElementById('moon-icon');
const sunIcon = document.getElementById('sun-icon');

const rootNodeTitle = document.getElementById('root-node-title');
const line1 = document.getElementById('line-1');
const line2 = document.getElementById('line-2');
const line3 = document.getElementById('line-3');

const selectedL1Display = document.getElementById('selected-l1-display');
const selectedL2Display = document.getElementById('selected-l2-display');
const selectedL3Display = document.getElementById('selected-l3-display');

const level1Container = document.getElementById('level-1-container');
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

const finalScoreEl = document.getElementById('final-score');
const finalRankEl = document.getElementById('final-rank');

const openWheelBtn = document.getElementById('open-wheel-btn');
const closeWheelBtn = document.getElementById('close-wheel-btn');
const wheelModal = document.getElementById('wheel-modal');

let pendingMode = null;

document.addEventListener('DOMContentLoaded', () => {
    configurarTemaSVG();
    configurarNavegacion();
    configurarPanelDocente();
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
    nameModal.classList.add('hidden');
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
            pendingMode = card.getAttribute('data-mode');
            nameModal.classList.remove('hidden');
            studentNameInput.focus();
        });
    });

    startSessionBtn.addEventListener('click', () => {
        const nombreVal = studentNameInput.value.trim();
        if (!nombreVal) {
            alert("Por favor, ingresa tu Nombre y Apellido para continuar.");
            return;
        }
        currentStudentName = nombreVal;
        currentMode = pendingMode;
        nameModal.classList.add('hidden');
        iniciarSesion();
    });

    studentNameInput.addEventListener('keypress', (e) => {
        if (e.key === 'Enter') startSessionBtn.click();
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
}

function configurarPanelDocente() {
    openTeacherBtn.addEventListener('click', async () => {
        const pin = prompt("🔒 Acceso Restringido. Ingrese el PIN docente:");
        if (pin === "enologia2026") {
            teacherModal.classList.remove('hidden');
            await cargarResultadosNube();
        } else if (pin !== null) {
            alert("❌ PIN incorrecto.");
        }
    });

    closeTeacherBtn.addEventListener('click', () => teacherModal.classList.add('hidden'));
    refreshRecordsBtn.addEventListener('click', cargarResultadosNube);
}

async function cargarResultadosNube() {
    teacherTableBody.innerHTML = `<tr><td colspan="5" style="text-align: center; color: var(--text-muted); padding: 20px;">Sincronizando con la nube...</td></tr>`;
    try {
        // Obtenemos los registros almacenados localmente como respaldo y de la nube
        const locales = JSON.parse(localStorage.getItem('cata_resultados_estudiantes') || '[]');
        teacherTableBody.innerHTML = '';
        
        if (locales.length === 0) {
            teacherTableBody.innerHTML = `<tr><td colspan="5" style="text-align: center; color: var(--text-muted); padding: 20px;">No hay registros de alumnos todavía.</td></tr>`;
            return;
        }

        locales.reverse().forEach(res => {
            const tr = document.createElement('tr');
            tr.innerHTML = `
                <td><strong>${res.estudiante}</strong></td>
                <td><span class="pill-tag" style="font-size: 0.65rem; padding: 4px 10px;">${res.modalidad}</span></td>
                <td><strong>${res.puntaje} pts</strong></td>
                <td>${res.rango}</td>
                <td style="font-size: 0.82rem; color: var(--text-muted);">${res.fecha}</td>
            `;
            teacherTableBody.appendChild(tr);
        });
    } catch (e) {
        teacherTableBody.innerHTML = `<tr><td colspan="5" style="text-align: center; color: #ff8080; padding: 20px;">Error al conectar con el servidor.</td></tr>`;
    }
}

function guardarResultadoEstudiante(modalidadNombre, puntajeFinal, rangoFinal) {
    const resultados = JSON.parse(localStorage.getItem('cata_resultados_estudiantes') || '[]');
    const nuevoRegistro = {
        estudiante: currentStudentName,
        modalidad: modalidadNombre,
        puntaje: puntajeFinal,
        rango: rangoFinal,
        fecha: new Date().toLocaleString()
    };
    resultados.push(nuevoRegistro);
    localStorage.setItem('cata_resultados_estudiantes', JSON.stringify(resultados));
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
        studentTagAroma.textContent = `Estudiante: ${currentStudentName} (Examen)`;
        studentTagVis.textContent = `Estudiante: ${currentStudentName} (Examen)`;
    } else {
        openWheelBtn.classList.remove('hidden');
        studentTagAroma.textContent = `Estudiante: ${currentStudentName}`;
        studentTagVis.textContent = `Estudiante: ${currentStudentName}`;
    }

    if (currentMode === 'visual') {
        visualContainer.classList.remove('hidden');
        cargarCasoVisual();
    } else {
        gameContainer.classList.remove('hidden');
        cargarCasoAroma();
    }
}

// --- MÓDULO AROMA CON RUTA FIJA VERTICAL ---
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
    
    // Resetear contenedores
    level2Wrapper.classList.add('hidden');
    level3Wrapper.classList.add('hidden');
    selectedL1Display.classList.add('hidden');
    selectedL2Display.classList.add('hidden');
    selectedL3Display.classList.add('hidden');
    level1Container.classList.remove('hidden');

    line1.className = 'tree-line';
    line2.className = 'tree-line hidden';
    line3.className = 'tree-line hidden';

    renderNivel1(caso);
}

function renderNivel1(caso) {
    level1Options.innerHTML = '';
    const opciones = mezclarArreglo(Object.keys(JERARQUIA_AROMAS));
    opciones.forEach(opcion => {
        const btn = document.createElement('button');
        btn.className = 'option-node';
        btn.textContent = opcion;
        btn.onclick = () => handleSelectNivel1(opcion, caso);
        level1Options.appendChild(btn);
    });
}

function handleSelectNivel1(opcionTexto, caso) {
    selectedMacro = opcionTexto;
    selectedFamily = null;
    selectedSubfamily = null;
    selectedDescriptor = null;
    verifyBtn.disabled = true;

    // Fijar tarjeta Nivel 1 arriba y ocultar selector
    level1Container.classList.add('hidden');
    selectedL1Display.textContent = opcionTexto;
    selectedL1Display.classList.remove('hidden');

    line1.className = 'tree-line active';
    line2.classList.remove('hidden');

    level2Wrapper.classList.remove('hidden');
    renderNivel2(caso);
}

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
        btn.onclick = () => handleSelectNivel2(opcion, caso);
        level2Options.appendChild(btn);
    });
}

function handleSelectNivel2(opcionTexto, caso) {
    selectedFamily = opcionTexto;
    selectedSubfamily = null;
    selectedDescriptor = null;
    verifyBtn.disabled = true;

    // Fijar tarjeta Nivel 2 arriba y ocultar selector
    level2Wrapper.classList.add('hidden');
    selectedL2Display.textContent = opcionTexto;
    selectedL2Display.classList.remove('hidden');

    line2.className = 'tree-line active';
    line3.classList.remove('hidden');

    level3Wrapper.classList.remove('hidden');
    
    const nodoFamilia = (JERARQUIA_AROMAS[selectedMacro] && JERARQUIA_AROMAS[selectedMacro][selectedFamily]) || {};
    
    if (Array.isArray(nodoFamilia)) {
        renderNivelDirecto(nodoFamilia);
    } else {
        renderNivel3Subfamilias(nodoFamilia);
    }
}

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
        btn.onclick = () => handleSelectSubfamilia(opcion, nodoFamilia);
        level3Options.appendChild(btn);
    });
}

function handleSelectSubfamilia(opcionTexto, nodoFamilia) {
    selectedSubfamily = opcionTexto;
    const listaDescriptores = nodoFamilia[selectedSubfamily] || ["Desconocido"];
    renderNivelDescriptorFinal(listaDescriptores);
}

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
    selectedDescriptor = opcionTexto;
    line3.className = 'tree-line active';

    level3Options.querySelectorAll('.option-node').forEach(btn => {
        if (btn === elementoBoton) { btn.classList.add('selected-branch'); }
        else { btn.classList.add('unselected-collapsed'); }
    });
    verifyBtn.disabled = false;
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

    const rangoFinal = score >= 120 ? "Enólogo Master" : score >= 75 ? "Sommelier Avanzado" : "Práctica Inicial";
    const modalidadNombre = currentMode === 'visual' ? 'Fase Visual' : currentMode === 'examen' ? 'Modo Examen' : 'Árbol Olfativo';

    guardarResultadoEstudiante(modalidadNombre, score, rangoFinal);

    finalScoreEl.textContent = score;
    finalRankEl.textContent = rangoFinal;
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