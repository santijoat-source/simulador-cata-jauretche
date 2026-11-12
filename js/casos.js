const CASOS_ENOLOGIA = [
    {
        id: 1,
        titulo: "Cabernet Sauvignon Reserva",
        percepcion: "Copa en reposo - Vía Nasal Directa",
        descripcion: "Al acercar la nariz a la copa sin agitar, se percibe claramente un aroma vegetal punzante e intenso que recuerda a la huerta fresca.",
        macroCorrecta: "Aromas Primarios",
        familiaCorrecta: "Vegetal",
        descriptorCorrecto: "Pimiento",
        explicacion: "El pimiento verde (debido a metoxipirrazinas) es una nota característica y primaria en variedades como Cabernet Sauvignon.",
        datoCurioso: "🍇 **Dato Enológico Mendoza:** En regiones de Luján de Cuyo y Valle de Uco, este perfil herbal se expresa con notable elegancia. Bodegas referentes como Catena Zapata y El Enemigo trabajan magistralmente esta cepa."
    },
    {
        id: 2,
        titulo: "Chardonnay Joven",
        percepcion: "Copa agitada - Vía Nasal Directa",
        descripcion: "Al agitar enérgicamente el vino blanco, emergen notas frescas y vivaces que recuerdan a frutas cítricas recién cortadas.",
        macroCorrecta: "Aromas Primarios",
        familiaCorrecta: "Frutas de Vino Blanco",
        descriptorCorrecto: "Limón",
        explicacion: "Los aromas cítricos como el limón son marcadores primarios frescos típicos de Chardonnays jóvenes sin paso por madera.",
        datoCurioso: "🍋 **Dato Enológico Mendoza:** El Chardonnay cultivado en zonas frías de altura en Mendoza desarrolla una acidez natural vibrante y notas cítricas marcadas ideales para bases de espumantes."
    },
    {
        id: 3,
        titulo: "Pinot Noir Crianza",
        percepcion: "Copa en reposo - Vía Nasal Directa",
        descripcion: "Se perciben delicadas notas de frutos rojos silvestres acompañadas sutilmente por matices especiados y tostados de la madera.",
        macroCorrecta: "Aromas Terciarios",
        familiaCorrecta: "Crianza en Barrica de Roble",
        descriptorCorrecto: "Vainilla",
        explicacion: "La vainilla es un compuesto aromático (vainillina) aportado por la madera de roble durante la crianza en barrica.",
        datoCurioso: "🪵 **Dato Enológico Mendoza:** El uso moderado de roble francés aporta complejidad sin enmascarar la delicada fruta roja típica del Pinot Noir patagónico y mendocino."
    },
    {
        id: 4,
        titulo: "Vino con Defecto por Cierre",
        percepcion: "Copa en reposo - Vía Nasal Directa",
        descripcion: "Al abrir la botella y servir, se percibe inmediatamente un olor desagradable que recuerda a cartón mojado o humedad encajada.",
        macroCorrecta: "Defectos",
        familiaCorrecta: "Enfermedad del Corcho",
        descriptorCorrecto: "Sabor al corcho - TCA",
        explicacion: "El Tricloroanisol (TCA) contamina el corcho natural, generando un defecto inconfundible de humedad y cartón mojado.",
        datoCurioso: "⚠️ **Dato Enológico:** Hoy en día, muchas bodegas implementan tapas a rosca (stelvin) o corchos tecnológicos certificados para evitar por completo este molesto defecto de cava."
    },
    {
        id: 5,
        titulo: "Malbec Roble",
        percepcion: "Copa agitada - Vía Nasal Directa",
        descripcion: "Intensa expresión frutal complementada por notas profundas tostadas y especiadas adquiridas en barrica.",
        macroCorrecta: "Aromas Primarios",
        familiaCorrecta: "Frutas de Vino Tinto",
        descriptorCorrecto: "Ciruela",
        explicacion: "La ciruela madura es el descriptor frutal por excelencia de los vinos Malbec de alta expresión.",
        datoCurioso: "🍷 **Dato Enológico Mendoza:** El Malbec es el emblema vitivinícola argentino. Su cuna histórica se encuentra precisamente en Luján de Cuyo, donde expresa notas únicas de ciruelas y terciopelo en boca."
    },
    {
        id: 6,
        titulo: "Torrontés Riojano",
        percepcion: "Copa en reposo - Vía Nasal Directa",
        descripcion: "Aromas intensos, sumamente perfumados y gatera que recuerdan de inmediato a flores blancas y pétalos frescos.",
        macroCorrecta: "Aromas Primarios",
        familiaCorrecta: "Floral",
        descriptorCorrecto: "Jazmín",
        explicacion: "El Torrontés es una variedad aromática rica en terpenos, destacando notas florales inconfundibles como jazmín y azahar.",
        datoCurioso: "🌸 **Dato Enológico:** Es la uva blanca emblemática de Argentina. A pesar de su aroma intensamente dulce y perfumado, en boca se presenta como un vino seco, fresco y sumamente vivaz."
    },
    {
        id: 7,
        titulo: "Syrah de Valle",
        percepcion: "Copa agitada - Vía Nasal Directa",
        descripcion: "Despliega notas marcadas de frutos negros silvestres acompañadas por un fondo especiado punzante muy característico.",
        macroCorrecta: "Aromas Primarios",
        familiaCorrecta: "Frutas de Vino Tinto",
        descriptorCorrecto: "Mora",
        explicacion: "La mora y los frutos negros maduros son descriptores primarios fundamentales del Syrah cultivado en zonas soleadas.",
        datoCurioso: "🌿 **Dato Enológico:** El Syrah suele complementar su perfil frutal con notas de pimienta negra aportadas por compuestos específicos como la rotundona."
    },
    {
        id: 8,
        titulo: "Vino con Oxidación Prematura",
        percepcion: "Copa en reposo - Vía Nasal Directa",
        descripcion: "El vino presenta un color apagado y en nariz desprende notas que recuerdan fuertemente a frutos secos y vino generoso.",
        macroCorrecta: "Defectos",
        familiaCorrecta: "Oxidado",
        descriptorCorrecto: "Jerez",
        explicacion: "La exposición excesiva al oxígeno degrada los aromas frutales frescos y genera notas avainadas/frutos secos típicas de Jerez.",
        datoCurioso: "🧪 **Dato Enológico:** Este defecto se produce por fallas en el sellado del envase o exceso de oxígeno disuelto durante el embotellado sin la protección adecuada de anhídrido sulfuroso."
    },
    {
        id: 9,
        titulo: "Sauvignon Blanc Fino",
        percepcion: "Copa agitada - Vía Nasal Directa",
        descripcion: "Notas vegetales muy frescas y punzantes que recuerdan a hojas de tomate y hierbas recién cortadas.",
        macroCorrecta: "Aromas Primarios",
        familiaCorrecta: "Vegetal",
        descriptorCorrecto: "Pasto cortado",
        explicacion: "Los tioles volátiles otorgan al Sauvignon Blanc ese perfil herbáceo tan fresco de pasto cortado y hoja de higuera.",
        datoCurioso: "🌱 **Dato Enológico:** Es una de las variedades preferidas para climas templados-fríos, exigiendo un manejo preciso del follaje en el viñedo para concentrar sus característicos aromas."
    },
    {
        id: 10,
        titulo: "Cabernet Franc de Altura",
        percepcion: "Copa agitada - Vía Nasal Directa",
        descripcion: "Compleja combinación de frutos negros frescos con un fondo especiado balsámico muy elegante.",
        macroCorrecta: "Aromas Terciarios",
        familiaCorrecta: "Crianza en Barrica de Roble",
        descriptorCorrecto: "Pimienta",
        explicacion: "Las notas especiadas de pimienta y clavo complementan armónicamente la estructura de los grandes Cabernet Franc de guarda.",
        datoCurioso: "🏔️ **Dato Enológico Mendoza:** El Cabernet Franc del Valle de Uco se ha ganado el reconocimiento mundial por su finura, taninos sedosos y notas herbales y especiadas extraordinarias."
    }
];