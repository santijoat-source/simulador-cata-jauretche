const CASOS_ENOLOGIA = [
    {
        id: 1,
        titulo: "Cabernet Sauvignon Reserva",
        percepcion: "Copa en reposo - Vía Nasal Directa",
        descripcion: "Al acercar la nariz a la copa sin agitar, se percibe claramente un aroma vegetal punzante e intenso que recuerda a la huerta fresca.",
        macroCorrecta: "Aromas Primarios",
        familiaCorrecta: "Vegetal",
        descriptorCorrecto: "Pimiento",
        explicacion: "El descriptor pimiento verde se asocia principalmente a compuestos químicos denominados 3-isobutil-2-metoxipirazina (IBMP), presentes en la piel y tejidos herbáceos de la vid y transferidos al mosto durante la maceración.",
        datoCurioso: "El contenido de metoxipirazinas es sensible al manejo de la canopia y a la radiación solar sobre los racimos. Una mayor exposición lumínica y temperaturas moderadas a elevadas durante la maduración favorecen su degradación natural, mientras que el sombreo excesivo o la cosecha temprana tienden a conservar un perfil pirazínico más marcado."
    },
    {
        id: 2,
        titulo: "Chardonnay Joven",
        percepcion: "Copa agitada - Vía Nasal Directa",
        descripcion: "Al agitar enérgicamente el vino blanco, emergen notas frescas y vivaces que recuerdan a frutas cítricas recién cortadas.",
        macroCorrecta: "Aromas Primarios",
        familiaCorrecta: "Frutas de Vino Blanco",
        descriptorCorrecto: "Limón",
        explicacion: "Las notas cítricas en vinos blancos jóvenes provienen en gran medida de terpenos y ésteres volátiles formados durante el ciclo vegetativo y la fermentación, percibiéndose con mayor nitidez tras la oxigenación moderada al agitar la copa.",
        datoCurioso: "En viñedos de altura o climas templado-frescos, la amplitud térmica entre el día y la noche ayuda a preservar la acidez total y el pH equilibrado del mosto. Este entorno favorece perfiles aromáticos limpios y vibrantes, evitando la sobremaduración que suele desplazar los aromas cítricos frescos hacia notas más maduras o tropicales."
    },
    {
        id: 3,
        titulo: "Pinot Noir Crianza",
        percepcion: "Copa en reposo - Vía Nasal Directa",
        descripcion: "Se perciben delicadas notas de frutos rojos silvestres acompañadas sutilmente por matices especiados y tostados de la madera.",
        macroCorrecta: "Aromas Terciarios",
        familiaCorrecta: "Crianza en Barrica de Roble",
        descriptorCorrecto: "Vainilla",
        explicacion: "La vainilla es uno de los descriptores característicos de la crianza en madera: se origina a partir de la degradación térmica de la lignina durante el tostado de las duelas, liberando vainillina que se extrae progresivamente hacia el vino.",
        datoCurioso: "El aporte aromático de la barrica depende de factores como el origen botánico del roble, el nivel de tostado (ligero, medio o fuerte), el tiempo de contacto y la edad del envase. En variedades de piel fina como Pinot Noir, una crianza cuidada busca acompañar la fruta sin cubrir su expresión varietal ni saturar la percepción en boca."
    },
    {
        id: 4,
        titulo: "Vino con Defecto por Cierre",
        percepcion: "Copa en reposo - Vía Nasal Directa",
        descripcion: "Al abrir la botella y servir, se percibe inmediatamente un olor desagradable que recuerda a cartón mojado o humedad encajada.",
        macroCorrecta: "Defectos",
        familiaCorrecta: "Enfermedad del Corcho",
        descriptorCorrecto: "Sabor al corcho - TCA",
        explicacion: "El defecto de corcho se vincula habitualmente con el 2,4,6-tricloroanisol (TCA), un compuesto de umbral de percepción extremadamente bajo que puede aparecer cuando ciertos hongos transforman clorofenoles en presencia de humedad y cloro.",
        datoCurioso: "Aun en concentraciones muy bajas, el TCA puede enmascarar los aromas varietales y restar frescura percibida al vino. Para reducir este riesgo en bodega se aplican controles microbiológicos y fisicoquímicos estrictos en los tapones, sanitización adecuada de instalaciones y alternativas de cierre según el estilo y tiempo de guarda previsto."
    },
    {
        id: 5,
        titulo: "Malbec Roble",
        percepcion: "Copa agitada - Vía Nasal Directa",
        descripcion: "Intensa expresión frutal complementada por notas profundas tostadas y especiadas adquiridas en barrica.",
        macroCorrecta: "Aromas Primarios",
        familiaCorrecta: "Frutas de Vino Tinto",
        descriptorCorrecto: "Ciruela",
        explicacion: "Los descriptores de fruta de carozo oscura, como la ciruela, son habituales en tintos de buena madurez fenólica y se expresan con claridad al combinar la fruta varietal con el equilibrio estructural del vino.",
        datoCurioso: "La expresión aromática de una variedad no depende solo de la uva, sino de la interacción entre suelo, clima, momento de cosecha y conducción de la fermentación. Un control térmico adecuado durante la fermentación alcohólica ayuda a conservar los compuestos frutales más volátiles frente a pérdidas excesivas por arrastre con el dióxido de carbono."
    },
    {
        id: 6,
        titulo: "Torrontés Riojano",
        percepcion: "Copa en reposo - Vía Nasal Directa",
        descripcion: "Aromas intensos, sumamente perfumados que recuerdan de inmediato a flores blancas y pétalos frescos.",
        macroCorrecta: "Aromas Primarios",
        familiaCorrecta: "Floral",
        descriptorCorrecto: "Jazmín",
        explicacion: "Las notas florales blancas en variedades aromáticas están fuertemente ligadas a monoterpenos libres y conjugados (como linalool, geraniol y nerol), que aportan intensidad olfativa incluso antes de agitar la copa.",
        datoCurioso: "Gran parte de los terpenos en la baya se encuentran en forma no volátil (unidos a azúcares como glucósidos) y se liberan progresivamente por acción enzimática o hidrólisis. Por ello, el manejo sanitario de la uva y la elección de levaduras con actividad enzimática adecuada influyen directamente en la limpieza y expresividad floral."
    },
    {
        id: 7,
        titulo: "Syrah de Valle",
        percepcion: "Copa agitada - Vía Nasal Directa",
        descripcion: "Despliega notas marcadas de frutos negros silvestres acompañadas por un fondo especiado punzante muy característico.",
        macroCorrecta: "Aromas Primarios",
        familiaCorrecta: "Frutas de Vino Tinto",
        descriptorCorrecto: "Mora",
        explicacion: "Las notas de bayas oscuras como la mora reflejan la madurez aromática de la fruta y se perciben con mayor definición cuando el vino se airea suavemente en la copa, facilitando la volatilización de compuestos frutales.",
        datoCurioso: "En la cata técnica es clave distinguir entre el aroma percibido en nariz y la sensación táctil en boca (volumen, acidez, alcohol y taninos). Una fruta negra bien definida suele acompañar vinos con buena estructura polifenólica, siempre que la extracción en maceración se haya calibrado para evitar astringencias secantes."
    },
    {
        id: 8,
        titulo: "Vino con Oxidación Prematura",
        percepcion: "Copa en reposo - Vía Nasal Directa",
        descripcion: "El vino presenta un color apagado y en nariz desprende notas que recuerdan fuertemente a frutos secos y vino generoso.",
        macroCorrecta: "Defectos",
        familiaCorrecta: "Oxidado",
        descriptorCorrecto: "Jerez",
        explicacion: "La oxidación prematura ocurre cuando el vino queda expuesto a un exceso de oxígeno en etapas donde no corresponde, favoreciendo reacciones oxidativas que apagan la fruta fresca y generan notas de frutos secos o crianza oxidativa no deseada.",
        datoCurioso: "La protección frente al oxígeno se apoya en una gestión rigurosa del anhídrido sulfuroso (SO2) libre y molecular según el pH del vino, el llenado correcto de depósitos y botellas, y la minimización de espacios de cabeza o permeabilidad inadecuada del cierre durante el almacenamiento."
    },
    {
        id: 9,
        titulo: "Sauvignon Blanc Fino",
        percepcion: "Copa agitada - Vía Nasal Directa",
        descripcion: "Notas vegetales muy frescas y punzantes que recuerdan a hojas de tomate y hierbas recién cortadas.",
        macroCorrecta: "Aromas Primarios",
        familiaCorrecta: "Vegetal",
        descriptorCorrecto: "Pasto cortado",
        explicacion: "Los aromas herbáceos frescos como el pasto cortado se relacionan con compuestos C6 (aldehídos y alcoholes derivados de la lipoxigenasa durante la molienda y el prensado) junto con tioles volátiles característicos de la variedad.",
        datoCurioso: "El trabajo en bodega sobre la fracción herbácea comienza en la recepción de la uva: prensados suaves, bajas temperaturas y reducción de tiempos de contacto piel-mosto cuando se busca un perfil más limpio y fresco, evitando extracciones duras que aporten amargor o rusticidad."
    },
    {
        id: 10,
        titulo: "Cabernet Franc de Altura",
        percepcion: "Copa agitada - Vía Nasal Directa",
        descripcion: "Compleja combinación de frutos negros frescos con un fondo especiado balsámico muy elegante.",
        macroCorrecta: "Aromas Terciarios",
        familiaCorrecta: "Crianza en Barrica de Roble",
        descriptorCorrecto: "Pimienta",
        explicacion: "Los matices especiados como la pimienta pueden surgir tanto de compuestos propios de la variedad (como la rotundona en concentraciones moderadas) como de la interacción aromática durante la crianza y evolución en madera y botella.",
        datoCurioso: "La evolución de un vino tinto de guarda es un proceso dinámico donde interactúan aromas primarios, secundarios (fermentativos) y terciarios (crianza y guarda). Evaluar la armonía entre esos planos permite determinar si el vino está en su etapa juvenil, en plenitud o ganando complejidad con el tiempo."
    }
];

const CASOS_VISUALES = [
    {
        id: 1,
        titulo: "Malbec Joven de Cosecha",
        descripcion: "Vino tinto presentado en fase visual directa con tonalidades muy vivaces en el ribete.",
        capaCorrecta: "Capa Media-Alta",
        tonoCorrecto: "Rojo Violáceo",
        colorCoreHex: "#310a3b",
        colorRimHex: "#8e24aa",
        explicacion: "Los reflejos violáceos en un tinto joven se deben a la presencia de antocianos libres y pigmentos jóvenes en un medio de acidez favorable, lo que suele asociarse a elaboraciones recientes sin larga evolución oxidativa.",
        datoCurioso: "La intensidad y el matiz cromático dependen del pH del vino, la concentración de antocianos y el grosor de la copa. A menor pH, los antocianos tienden a mostrar tonos rojizos y violáceos más vivos, mientras que a pH más altos el color puede verse algo más apagado o azulado."
    },
    {
        id: 2,
        titulo: "Chardonnay de Altura",
        descripcion: "Vino blanco brillante con reflejos luminosos en la copa.",
        capaCorrecta: "Capa Baja",
        tonoCorrecto: "Amarillo Verdoso",
        colorCoreHex: "#e6eeb8",
        colorRimHex: "#cde3a8",
        explicacion: "En vinos blancos jóvenes, los matices verdosos sutiles son frecuentes en muestras de vendimia temprana o de zonas más frescas, acompañados de limpidez y brillo cuando la estabilización y clarificación fueron correctas.",
        datoCurioso: "Al observar un vino blanco contra un fondo blanco y con buena iluminación, conviene inclinar la copa y mirar tanto el centro como el ribete. Con el paso del tiempo o el contacto con madera, el color suele evolucionar desde tonos pajizos o verdosos hacia dorados o ámbar."
    },
    {
        id: 3,
        titulo: "Cabernet Sauvignon Reserva Añejo",
        descripcion: "Vino tinto con varios años de evolución en botella.",
        capaCorrecta: "Capa Alta",
        tonoCorrecto: "Rojo Rubí / Teja",
        colorCoreHex: "#4e0d0d",
        colorRimHex: "#b84a27",
        explicacion: "Con la guarda, los antocianos monoméricos reaccionan con taninos y otros compuestos formando pigmentos poliméricos más estables, lo que modifica progresivamente el matiz hacia tonos rubí, ladrillo o teja en el ribete.",
        datoCurioso: "Un ribete con tendencia teja o anaranjada en un tinto de guarda indica evolución en el tiempo, pero siempre debe interpretarse junto con la fase olfativa y gustativa: un color evolucionado con aromas frescos y equilibrados es propio de la crianza, mientras que un tono apagado con notas oxidativas marca desgaste."
    }
];