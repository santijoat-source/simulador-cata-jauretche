// Estructura jerárquica exacta según Rueda de Aromas Ultimate (v2)[cite: 3, 4]
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

const STORAGE_KEY = "cata_resultados_estudiantes_v1";
const CLOUD_RESULTS_URL = "https://script.google.com/macros/s/AKfycbxLKtoA325seEtpA0iI00Dy2ZbB_BtVU2id3MVxfm_XR0a9DFREHkLUFHkN-1_lvXao1A/exec";

let score = 0;
let currentMode = "aroma";
let pendingMode = null;
let currentStudentName = "Estudiante";
let casoActualIndex = 0;

let selectedMacro = null;
let selectedFamily = null;
let selectedSubfamily = null;
let selectedDescriptor = null;

let selectedCapa = null;
let selectedTono = null;

// Pantallas
const heroScreen = document.getElementById("hero-screen");
const modesScreen = document.getElementById("modes-screen");
const gameContainer = document.getElementById("game-container");
const visualContainer = document.getElementById("visual-container");
const endScreen = document.getElementById("end-screen");

// Navegación
const brandLogo = document.getElementById("brand-logo");
const enterModesBtn = document.getElementById("enter-modes-btn");
const homeNavBtn = document.getElementById("home-nav-btn");
const restartMenuBtn = document.getElementById("restart-menu-btn");
const statsContainer = document.getElementById("stats-container");

// Identificación
const nameModal = document.getElementById("name-modal");
const studentNameInput = document.getElementById("student-name-input");
const startSessionBtn = document.getElementById("start-session-btn");

const studentTagAroma = document.getElementById("student-tag-aroma");
const studentTagVis = document.getElementById("student-tag-vis");

// Otros modales y controles
const openAboutBtn = document.getElementById("open-about-btn");
const aboutModal = document.getElementById("about-modal");
const closeAboutBtn = document.getElementById("close-about-btn");

const scoreDisplay = document.getElementById("score-display");
const caseCounter = document.getElementById("case-counter");
const themeToggleBtn = document.getElementById("theme-toggle");
const moonIcon = document.getElementById("moon-icon");
const sunIcon = document.getElementById("sun-icon");

// Árbol DOM
const rootNodeTitle = document.getElementById("root-node-title");
const line1 = document.getElementById("line-1");
const containerL1 = document.getElementById("container-level-1");
const level1Options = document.getElementById("level-1-options");

const line2 = document.getElementById("line-2");
const containerL2 = document.getElementById("container-level-2");
const labelL2 = document.getElementById("label-l2");
const level2Options = document.getElementById("level-2-options");

const line3 = document.getElementById("line-3");
const containerL3 = document.getElementById("container-level-3");
const labelL3 = document.getElementById("label-l3");
const level3Options = document.getElementById("level-3-options");

const verifyBtn = document.getElementById("verify-btn");

const sampleBadge = document.getElementById("sample-badge");
const samplePerception = document.getElementById("sample-perception");
const sampleTitle = document.getElementById("sample-title");
const sampleDescription = document.getElementById("sample-description");

// Visual DOM
const visBadge = document.getElementById("vis-badge");
const visTitle = document.getElementById("vis-title");
const visDescription = document.getElementById("vis-description");
const wineLiquid = document.getElementById("wine-liquid");
const capaOptions = document.getElementById("capa-options");
const tonoOptions = document.getElementById("tono-options");
const verifyVisBtn = document.getElementById("verify-vis-btn");

// Feedback y Rueda
const feedbackModal = document.getElementById("feedback-modal");
const feedbackStatus = document.getElementById("feedback-status");
const feedbackText = document.getElementById("feedback-text");
const feedbackExtra = document.getElementById("feedback-extra");
const nextBtn = document.getElementById("next-btn");

const finalScoreEl = document.getElementById("final-score");
const finalRankEl = document.getElementById("final-rank");

const openWheelBtn = document.getElementById("open-wheel-btn");
const closeWheelBtn = document.getElementById("close-wheel-btn");
const wheelModal = document.getElementById("wheel-modal");

document.addEventListener("DOMContentLoaded", () => {
    configurarTemaSVG();
    configurarNavegacion();
    configurarEventosGlobales();
});

function configurarTemaSVG() {
    const themeGuardado = localStorage.getItem("theme-preference") || "dark";
    if (themeGuardado === "light") {
        document.documentElement.setAttribute("data-theme", "light");
        moonIcon.classList.add("hidden");
        sunIcon.classList.remove("hidden");
    }

    themeToggleBtn.addEventListener("click", () => {
        const esClaro = document.documentElement.getAttribute("data-theme") === "light";
        if (esClaro) {
            document.documentElement.removeAttribute("data-theme");
            localStorage.setItem("theme-preference", "dark");
            sunIcon.classList.add("hidden");
            moonIcon.classList.remove("hidden");
        } else {
            document.documentElement.setAttribute("data-theme", "light");
            localStorage.setItem("theme-preference", "light");
            moonIcon.classList.add("hidden");
            sunIcon.classList.remove("hidden");
        }
    });
}

function ocultarTodasLasPantallas() {
    heroScreen.classList.add("hidden");
    modesScreen.classList.add("hidden");
    gameContainer.classList.add("hidden");
    visualContainer.classList.add("hidden");
    endScreen.classList.add("hidden");
    feedbackModal.classList.add("hidden");
    nameModal.classList.add("hidden");
}

function configurarNavegacion() {
    enterModesBtn.addEventListener("click", () => {
        ocultarTodasLasPantallas();
        modesScreen.classList.remove("hidden");
        homeNavBtn.classList.remove("hidden");
        statsContainer.classList.add("hidden");
    });

    document.querySelectorAll(".mode-clean-item").forEach((card) => {
        card.addEventListener("click", () => {
            pendingMode = card.getAttribute("data-mode");
            nameModal.classList.remove("hidden");
            studentNameInput.value = "";
            studentNameInput.focus();
        });
    });

    startSessionBtn.addEventListener("click", () => {
        const nombreVal = studentNameInput.value.trim();
        if (!nombreVal) {
            alert("Por favor, ingresa tu Nombre y Apellido para continuar.");
            return;
        }
        currentStudentName = nombreVal;
        currentMode = pendingMode;
        nameModal.classList.add("hidden");
        iniciarSesion();
    });

    studentNameInput.addEventListener("keypress", (e) => {
        if (e.key === "Enter") startSessionBtn.click();
    });

    const irAlInicio = () => {
        ocultarTodasLasPantallas();
        heroScreen.classList.remove("hidden");
        homeNavBtn.classList.add("hidden");
        statsContainer.classList.add("hidden");
        openWheelBtn.classList.remove("hidden");
    };

    brandLogo.addEventListener("click", irAlInicio);
    homeNavBtn.addEventListener("click", irAlInicio);
    restartMenuBtn.addEventListener("click", irAlInicio);
}

async function guardarResultadoEstudiante(modalidadNombre, puntajeFinal, rangoFinal) {
    const nuevoRegistro = {
        estudiante: currentStudentName,
        modalidad: modalidadNombre,
        puntaje: puntajeFinal,
        rango: rangoFinal,
        fecha: new Date().toLocaleString()
    };

    const resultadosLocales = JSON.parse(localStorage.getItem(STORAGE_KEY) || "[]");
    resultadosLocales.push(nuevoRegistro);
    localStorage.setItem(STORAGE_KEY, JSON.stringify(resultadosLocales));

    if (!CLOUD_RESULTS_URL) return;

    try {
        await fetch(CLOUD_RESULTS_URL, {
            method: "POST",
            mode: "no-cors",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify(nuevoRegistro)
        });
    } catch (error) {
        console.warn("No se pudo enviar a la planilla en este intento; queda guardado localmente.", error);
    }
}

function iniciarSesion() {
    score = 0;
    casoActualIndex = 0;
    scoreDisplay.textContent = "0";
    ocultarTodasLasPantallas();
    statsContainer.classList.remove("hidden");
    homeNavBtn.classList.remove("hidden");

    const sufijoModo = currentMode === "examen" ? " (Examen)" : "";
    studentTagAroma.textContent = `Estudiante: ${currentStudentName}${sufijoModo}`;
    studentTagVis.textContent = `Estudiante: ${currentStudentName}${sufijoModo}`;

    if (currentMode === "examen") {
        openWheelBtn.classList.add("hidden");
    } else {
        openWheelBtn.classList.remove("hidden");
    }

    if (currentMode === "visual") {
        visualContainer.classList.remove("hidden");
        cargarCasoVisual();
    } else {
        gameContainer.classList.remove("hidden");
        cargarCasoAroma();
    }
}

// --- MÓDULO AROMA (ESTRICTO POR RAMA, SIN MEZCLAS CRUZADAS) ---
function resetearNivelesInferiores(desdeNivel) {
    if (desdeNivel <= 2) {
        selectedFamily = null;
        selectedSubfamily = null;
        selectedDescriptor = null;
        verifyBtn.disabled = true;
        line2.classList.add("hidden");
        containerL2.classList.add("hidden");
        level2Options.innerHTML = "";
    }
    if (desdeNivel <= 3) {
        selectedSubfamily = null;
        selectedDescriptor = null;
        verifyBtn.disabled = true;
        line3.classList.add("hidden");
        containerL3.classList.add("hidden");
        level3Options.innerHTML = "";
    }
}

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

    feedbackModal.classList.add("hidden");
    line1.classList.remove("hidden");
    containerL1.classList.remove("hidden");
    resetearNivelesInferiores(2);

    renderNivel1(caso);
}

function renderNivel1(caso) {
    level1Options.innerHTML = "";
    const opciones = mezclarArreglo(Object.keys(JERARQUIA_AROMAS));
    opciones.forEach((opcion) => {
        const btn = document.createElement("button");
        btn.className = "option-node";
        btn.textContent = opcion;
        btn.onclick = () => handleSelectNivel1(opcion, caso);
        level1Options.appendChild(btn);
    });
}

function handleSelectNivel1(opcionTexto, caso) {
    selectedMacro = opcionTexto;
    resetearNivelesInferiores(2);

    level1Options.innerHTML = "";
    const fixedBtn = document.createElement("div");
    fixedBtn.className = "option-node selected-branch";
    fixedBtn.style.cursor = "pointer";
    fixedBtn.innerHTML = `<span>${opcionTexto}</span><span style="font-size:0.68rem; opacity:0.8;">(Toca para cambiar)</span>`;
    fixedBtn.onclick = () => {
        selectedMacro = null;
        resetearNivelesInferiores(2);
        renderNivel1(caso);
    };
    level1Options.appendChild(fixedBtn);

    line2.classList.remove("hidden");
    containerL2.classList.remove("hidden");
    labelL2.textContent = "Familia Aromática";
    renderNivel2(caso);
}

function renderNivel2(caso) {
    level2Options.innerHTML = "";
    const nodoMacro = JERARQUIA_AROMAS[selectedMacro] || {};
    const opciones = mezclarArreglo(Object.keys(nodoMacro));

    opciones.forEach((opcion) => {
        const btn = document.createElement("button");
        btn.className = "option-node";
        btn.textContent = opcion;
        btn.onclick = () => handleSelectNivel2(opcion, caso);
        level2Options.appendChild(btn);
    });
}

function handleSelectNivel2(opcionTexto, caso) {
    selectedFamily = opcionTexto;
    resetearNivelesInferiores(3);

    level2Options.innerHTML = "";
    const fixedBtn = document.createElement("div");
    fixedBtn.className = "option-node selected-branch";
    fixedBtn.style.cursor = "pointer";
    fixedBtn.innerHTML = `<span>${opcionTexto}</span><span style="font-size:0.68rem; opacity:0.8;">(Toca para cambiar)</span>`;
    fixedBtn.onclick = () => {
        selectedFamily = null;
        resetearNivelesInferiores(3);
        renderNivel2(caso);
    };
    level2Options.appendChild(fixedBtn);

    line3.classList.remove("hidden");
    containerL3.classList.remove("hidden");

    const nodoFamilia = JERARQUIA_AROMAS[selectedMacro][selectedFamily];

    if (Array.isArray(nodoFamilia)) {
        labelL3.textContent = "Descriptor Específico";
        renderDescriptoresDirectos(nodoFamilia);
    } else {
        labelL3.textContent = "Subfamilia";
        renderSubfamilias(nodoFamilia);
    }
}

function renderSubfamilias(nodoFamilia) {
    level3Options.innerHTML = "";
    const subfamilias = mezclarArreglo(Object.keys(nodoFamilia));

    subfamilias.forEach((sub) => {
        const btn = document.createElement("button");
        btn.className = "option-node";
        btn.textContent = sub;
        btn.onclick = () => handleSelectSubfamilia(sub, nodoFamilia);
        level3Options.appendChild(btn);
    });
}

function handleSelectSubfamilia(subTexto, nodoFamilia) {
    selectedSubfamily = subTexto;
    selectedDescriptor = null;
    verifyBtn.disabled = true;

    level3Options.innerHTML = "";
    const fixedSub = document.createElement("div");
    fixedSub.className = "option-node selected-branch";
    fixedSub.style.cursor = "pointer";
    fixedSub.innerHTML = `<span>${subTexto}</span><span style="font-size:0.68rem; opacity:0.8;">(Toca para cambiar)</span>`;
    fixedSub.onclick = () => {
        selectedSubfamily = null;
        selectedDescriptor = null;
        verifyBtn.disabled = true;
        labelL3.textContent = "Subfamilia";
        renderSubfamilias(nodoFamilia);
    };
    level3Options.appendChild(fixedSub);

    const descriptoresDeSub = nodoFamilia[subTexto] || [];
    const descContainer = document.createElement("div");
    descContainer.className = "options-branch-grid";
    descContainer.style.marginTop = "14px";

    mezclarArreglo(descriptoresDeSub).forEach((desc) => {
        const btn = document.createElement("button");
        btn.className = "option-node";
        btn.textContent = desc;
        btn.onclick = () => {
            selectedDescriptor = desc;
            descContainer.querySelectorAll(".option-node").forEach((b) => b.classList.remove("selected-branch"));
            btn.classList.add("selected-branch");
            verifyBtn.disabled = false;
        };
        descContainer.appendChild(btn);
    });

    level3Options.appendChild(descContainer);
}

function renderDescriptoresDirectos(listaDescriptores) {
    level3Options.innerHTML = "";
    selectedDescriptor = null;
    verifyBtn.disabled = true;

    mezclarArreglo(listaDescriptores).forEach((desc) => {
        const btn = document.createElement("button");
        btn.className = "option-node";
        btn.textContent = desc;
        btn.onclick = () => {
            selectedDescriptor = desc;
            level3Options.querySelectorAll(".option-node").forEach((b) => b.classList.remove("selected-branch"));
            btn.classList.add("selected-branch");
            verifyBtn.disabled = false;
        };
        level3Options.appendChild(btn);
    });
}

verifyBtn.addEventListener("click", () => {
    if (!selectedMacro || !selectedFamily || !selectedDescriptor) return;
    const caso = CASOS_ENOLOGIA[casoActualIndex];
    const esExito =
        selectedMacro === caso.macroCorrecta &&
        selectedFamily === caso.familiaCorrecta &&
        selectedDescriptor === caso.descriptorCorrecto;

    const rutaElegida = selectedSubfamily
        ? `${selectedMacro} › ${selectedFamily} › ${selectedSubfamily} › ${selectedDescriptor}`
        : `${selectedMacro} › ${selectedFamily} › ${selectedDescriptor}`;

    const rutaCorrecta = `${caso.macroCorrecta} › ${caso.familiaCorrecta} › ${caso.descriptorCorrecto}`;

    if (esExito) {
        score += 15;
        scoreDisplay.textContent = score;
        mostrarFeedback(true, `Deducción correcta.\n\n${caso.explicacion}`, caso.datoCurioso);
    } else {
        mostrarFeedback(
            false,
            `Discrepancia en el análisis.\n\n• Elegiste: ${rutaElegida}\n• Esperado: ${rutaCorrecta}\n\n${caso.explicacion}`,
            null
        );
    }
});

// --- MÓDULO VISUAL ---
function cargarCasoVisual() {
    const caso = CASOS_VISUALES[casoActualIndex % CASOS_VISUALES.length];
    selectedCapa = null;
    selectedTono = null;
    verifyVisBtn.disabled = true;

    visBadge.textContent = `Fase Visual #${caso.id}`;
    visTitle.textContent = caso.titulo;
    visDescription.textContent = caso.descripcion;
    caseCounter.textContent = `${(casoActualIndex % CASOS_VISUALES.length) + 1} / ${CASOS_VISUALES.length}`;
    wineLiquid.style.background = caso.colorHex;

    renderOpcionesVisuales();
}

function renderOpcionesVisuales() {
    capaOptions.innerHTML = "";
    tonoOptions.innerHTML = "";

    ["Capa Baja", "Capa Media", "Capa Media-Alta", "Capa Alta"].forEach((capa) => {
        const btn = document.createElement("button");
        btn.className = "option-node";
        btn.textContent = capa;
        btn.onclick = () => {
            selectedCapa = capa;
            capaOptions.querySelectorAll(".option-node").forEach((b) => b.classList.remove("selected-branch"));
            btn.classList.add("selected-branch");
            chequearVisReady();
        };
        capaOptions.appendChild(btn);
    });

    ["Rojo Violáceo", "Amarillo Verdoso", "Rojo Rubí / Teja", "Dorado"].forEach((tono) => {
        const btn = document.createElement("button");
        btn.className = "option-node";
        btn.textContent = tono;
        btn.onclick = () => {
            selectedTono = tono;
            tonoOptions.querySelectorAll(".option-node").forEach((b) => b.classList.remove("selected-branch"));
            btn.classList.add("selected-branch");
            chequearVisReady();
        };
        tonoOptions.appendChild(btn);
    });
}

function chequearVisReady() {
    if (selectedCapa && selectedTono) verifyVisBtn.disabled = false;
}

verifyVisBtn.addEventListener("click", () => {
    const caso = CASOS_VISUALES[casoActualIndex % CASOS_VISUALES.length];
    const esExito = selectedCapa === caso.capaCorrecta && selectedTono === caso.tonoCorrecto;

    if (esExito) {
        score += 15;
        scoreDisplay.textContent = score;
        mostrarFeedback(true, `Análisis visual correcto.\n\n${caso.explicacion}`, null);
    } else {
        mostrarFeedback(
            false,
            `Discrepancia en la fase visual.\n• Correcto: ${caso.capaCorrecta} y ${caso.tonoCorrecto}\n\n${caso.explicacion}`,
            null
        );
    }
});

function mostrarFeedback(esCorrecto, mensaje, datoCurioso) {
    feedbackModal.classList.remove("hidden");
    feedbackStatus.textContent = esCorrecto ? "Análisis Exitoso (+15 pts)" : "Discrepancia Sensorial";
    feedbackText.innerText = mensaje;

    if (esCorrecto && datoCurioso) {
        feedbackExtra.classList.remove("hidden");
        feedbackExtra.innerHTML = `<h4>Dato Técnico</h4><p>${datoCurioso.replace(/\*\*/g, "")}</p>`;
    } else {
        feedbackExtra.classList.add("hidden");
        feedbackExtra.innerHTML = "";
    }
}

nextBtn.addEventListener("click", () => {
    casoActualIndex++;
    const maxCasos = currentMode === "visual" ? CASOS_VISUALES.length : CASOS_ENOLOGIA.length;
    if (casoActualIndex < maxCasos) {
        if (currentMode === "visual") cargarCasoVisual();
        else cargarCasoAroma();
    } else {
        mostrarPantallaFinal();
    }
});

function mostrarPantallaFinal() {
    ocultarTodasLasPantallas();
    statsContainer.classList.add("hidden");
    openWheelBtn.classList.remove("hidden");

    const rangoFinal = score >= 120 ? "Enólogo Master" : score >= 75 ? "Sommelier Avanzado" : "Práctica Inicial";
    const modalidadNombre =
        currentMode === "visual" ? "Fase Visual" : currentMode === "examen" ? "Modo Examen" : "Árbol Olfativo";

    guardarResultadoEstudiante(modalidadNombre, score, rangoFinal);

    finalScoreEl.textContent = score;
    finalRankEl.textContent = rangoFinal;
    endScreen.classList.remove("hidden");
}

function configurarEventosGlobales() {
    if (openWheelBtn) openWheelBtn.addEventListener("click", () => wheelModal.classList.remove("hidden"));
    if (closeWheelBtn) closeWheelBtn.addEventListener("click", () => wheelModal.classList.add("hidden"));
    if (openAboutBtn) openAboutBtn.addEventListener("click", () => aboutModal.classList.remove("hidden"));
    if (closeAboutBtn) closeAboutBtn.addEventListener("click", () => aboutModal.classList.add("hidden"));
}

function mezclarArreglo(arreglo) {
    return [...arreglo].sort(() => Math.random() - 0.5);
}