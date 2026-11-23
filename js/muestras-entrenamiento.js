const MUESTRAS_ENTRENAMIENTO_EXTRA = [
    {
        id: 101,
        titulo: "Torrontés de Altura Seco",
        percepcion: "Copa en reposo - Vía Nasal Directa",
        descripcion: "Al acercar la copa sin agitar, se desprende una fragancia blanca muy luminosa que recuerda a flores de azahar y cítricos dulces.",
        macroCorrecta: "Aromas Primarios",
        familiaCorrecta: "Floral",
        descriptorCorrecto: "Flor de naranja",
        explicacion: "Las notas de flor de naranja pertenecen a los aromas primarios de origen varietal y se asocian a terpenos aromáticos presentes en la uva.",
        datoCurioso: "En variedades aromáticas como Torrontés, la percepción floral en reposo es un indicador habitual de frescura varietal cuando la fermentación se conduce a temperaturas controladas."
    },
    {
        id: 102,
        titulo: "Sauvignon Blanc Fresco",
        percepcion: "Copa agitada - Vía Nasal Directa",
        descripcion: "Tras agitar suavemente la copa, aparece un aroma cítrico punzante y jugoso que remite a cáscara y pulpa de pomelo rosado.",
        macroCorrecta: "Aromas Primarios",
        familiaCorrecta: "Frutas de Vino Blanco",
        descriptorCorrecto: "Pomelo",
        explicacion: "El pomelo se ubica dentro de Aromas Primarios › Frutas de Vino Blanco › Cítricos y refleja el carácter varietal fresco de la muestra.",
        datoCurioso: "Los compuestos tiólicos y cítricos en blancos secos se expresan mejor a temperaturas moderadas de servicio (alrededor de 8 °C a 10 °C), evitando que el exceso de frío cierre la nariz."
    },
    {
        id: 103,
        titulo: "Malbec Joven Frutal",
        percepcion: "Copa agitada - Vía Nasal Directa",
        descripcion: "Al mover el vino en la copa, se siente una fruta roja fresca, brillante y directa que recuerda a frutillas maduras.",
        macroCorrecta: "Aromas Primarios",
        familiaCorrecta: "Frutas de Vino Tinto",
        descriptorCorrecto: "Frutilla",
        explicacion: "La frutilla corresponde a Aromas Primarios › Frutas de Vino Tinto › Bayas Rojas, propia de perfiles frutales limpios y sin sobremaduración.",
        datoCurioso: "En vinos tintos jóvenes sin paso por madera, la fruta roja suele mostrarse con mayor nitidez en las primeras etapas posteriores a la fermentación."
    },
    {
        id: 104,
        titulo: "Vino Blanco con Crianza sobre Lías",
        percepcion: "Copa agitada - Vía Nasal Directa",
        descripcion: "En nariz se percibe una nota envolvente y suave que recuerda a miga de pan recién horneado ligada al trabajo de levaduras.",
        macroCorrecta: "Aromas Secundarios",
        familiaCorrecta: "Levaduras",
        descriptorCorrecto: "Pan",
        explicacion: "El descriptor pan pertenece a Aromas Secundarios › Levaduras y se vincula con procesos fermentativos y autólisis de levaduras.",
        datoCurioso: "El contacto con lías finas aporta textura en boca y matices fermentativos o de panificación cuando se mantiene una correcta higiene microbiológica."
    },
    {
        id: 105,
        titulo: "Chardonnay con Maloláctica",
        percepcion: "Copa agitada - Vía Nasal Directa",
        descripcion: "Al agitar la copa, destaca una sensación cremosa y láctea muy marcada que recuerda a manteca fresca derretida.",
        macroCorrecta: "Aromas Secundarios",
        familiaCorrecta: "Fermentación Malo-Láctica",
        descriptorCorrecto: "Mantequilla",
        explicacion: "La mantequilla se clasifica en Aromas Secundarios › Fermentación Malo-Láctica, asociada a la formación de diacetilo durante la transformación de ácido málico en láctico.",
        datoCurioso: "La presencia de diacetilo depende de la cepa bacteriana, la temperatura y el nivel de oxígeno disuelto durante o al finalizar la fermentación maloláctica."
    },
    {
        id: 106,
        titulo: "Tinto de Guarda en Roble",
        percepcion: "Copa agitada - Vía Nasal Directa",
        descripcion: "Se aprecia un fondo dulce y tostado que recuerda claramente a caramelo quemado y azúcar tostado de barrica.",
        macroCorrecta: "Aromas Terciarios",
        familiaCorrecta: "Crianza en Barrica de Roble",
        descriptorCorrecto: "Caramelo",
        explicacion: "El caramelo forma parte de Aromas Terciarios › Crianza en Barrica de Roble › Tostados, originado por la caramelización de azúcares de la madera durante el tostado.",
        datoCurioso: "El nivel de tostado de la barrica determina cuánto se acentúan los compuestos tostados y especiados frente a la fruta original del vino."
    },
    {
        id: 107,
        titulo: "Tinto Evolucionado de Guarda",
        percepcion: "Copa en reposo - Vía Nasal Directa",
        descripcion: "Al acercar la nariz, surge una nota terrosa y húmeda de sotobosque que recuerda a seta fresca tras la lluvia.",
        macroCorrecta: "Aromas Terciarios",
        familiaCorrecta: "Vino Tinto Añejo",
        descriptorCorrecto: "Seta",
        explicacion: "La seta pertenece a Aromas Terciarios › Vino Tinto Añejo › Matorral y aparece en vinos tintos con evolución y guarda.",
        datoCurioso: "Las notas terrosas o de sotobosque en tintos añejos ganan sentido cuando se integran con acidez, tanino pulido y ausencia de defectos oxidativos."
    },
    {
        id: 108,
        titulo: "Vino con Exceso de Oxígeno",
        percepcion: "Copa en reposo - Vía Nasal Directa",
        descripcion: "Desde el primer contacto nasal se nota un perfil punzante y agrio que recuerda a vinagre de cocina.",
        macroCorrecta: "Defectos",
        familiaCorrecta: "Acidez Volátil",
        descriptorCorrecto: "Vinagre",
        explicacion: "El vinagre se asocia a un exceso de ácido acético y acetato de etilo, encuadrado dentro de Defectos › Acidez Volátil.",
        datoCurioso: "Un nivel elevado de acidez volátil suele estar ligado a actividad de bacterias acéticas o levaduras alterantes en presencia de oxígeno."
    },
    {
        id: 109,
        titulo: "Muestra con Reducción Marcada",
        percepcion: "Copa agitada - Vía Nasal Directa",
        descripcion: "Al servir y agitar, aparece un aroma desagradable a goma quemada o caucho que tapa la expresión frutal.",
        macroCorrecta: "Defectos",
        familiaCorrecta: "Sulfitos",
        descriptorCorrecto: "Caucho",
        explicacion: "El descriptor caucho corresponde a Defectos › Sulfitos, vinculado a compuestos azufrados volátiles formados en condiciones reductoras.",
        datoCurioso: "La aireación controlada en copa o la correcta gestión enológica ayudan a distinguir una reducción puntual de otros problemas aromáticos."
    },
    {
        id: 110,
        titulo: "Tinto con Alteración por Brett",
        percepcion: "Copa agitada - Vía Nasal Directa",
        descripcion: "Se percibe una nota animal y establo muy definida que recuerda a cuero de montura o sudor de caballo.",
        macroCorrecta: "Defectos",
        familiaCorrecta: "Brett",
        descriptorCorrecto: "Sudor de caballo",
        explicacion: "Este descriptor pertenece a Defectos › Brett, asociado a fenoles volátiles (como 4-etilfenol y 4-etilguayacol) producidos por levaduras del género Brettanomyces.",
        datoCurioso: "En bodega, el control estricto de la higiene en barricas, el pH y el SO2 libre es clave para prevenir el desarrollo de Brettanomyces."
    }
];