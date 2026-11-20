// Asistente de orientacion sobre la plataforma. NO usa IA generativa: responde con textos
// fijos basados en el contenido de RespiraKids (Modulo 6, Minsalud). No diagnostica,
// no da dosis ni tratamientos. Ante palabras de alarma, remite siempre a urgencias.

export interface AssistantAnswer {
  text: string;
  link?: { label: string; to: string };
  urgent?: boolean;
}

interface Topic {
  keywords: string[];
  answer: AssistantAnswer;
}

export const URGENT_KEYWORDS = [
  "azul", "morado", "no respira", "no puede respirar", "se ahoga", "ahogo", "pausas",
  "apnea", "hunde", "tiraje", "aleteo", "quejido", "no despierta", "inconsciente",
  "convulsi", "no toma", "no quiere tomar", "no puede beber", "muy decaido", "muy decaído",
];

const URGENT_ANSWER: AssistantAnswer = {
  urgent: true,
  text: "Lo que describes puede ser un signo de alarma. No esperes: acude de inmediato a un centro de urgencias pediátricas o llama a la línea de emergencias de tu zona. Este asistente no puede valorar a tu hijo.",
  link: { label: "Ver signos de alarma", to: "/sintomas#alarma" },
};

const TOPICS: Topic[] = [
  {
    keywords: ["que es respirakids", "qué es respirakids", "para que sirve", "para qué sirve", "plataforma", "aplicacion", "aplicación", "app", "herramienta"],
    answer: {
      text: "RespiraKids es una aplicación para padres, madres y cuidadores que orienta sobre enfermedades respiratorias agudas en niños: registro de síntomas, evaluación con semáforo, historial del niño, prevención y signos de alerta. Este sitio web la presenta y ofrece información educativa. No diagnostica ni reemplaza a un profesional de la salud.",
      link: { label: "Conocer RespiraKids", to: "/" },
    },
  },
  {
    keywords: ["semaforo", "semáforo", "verde", "amarillo", "rojo", "colores", "nivel"],
    answer: {
      text: "El semáforo es una orientación sobre el nivel de atención recomendado según los signos que observas: verde (cuidados habituales y vigilancia), amarillo (conviene una valoración profesional pronto) y rojo (atención urgente). Es una guía, no un diagnóstico.",
      link: { label: "Hacer la evaluación", to: "/evaluacion" },
    },
  },
  {
    keywords: ["evaluacion", "evaluación", "evaluar", "test", "cuestionario"],
    answer: {
      text: "La evaluación te hace preguntas sencillas sobre lo que puedes observar en tu hijo, sin equipos médicos, y te muestra un nivel de semáforo. Toma pocos minutos. Si ya viste un signo de alarma, ve primero a urgencias.",
      link: { label: "Iniciar evaluación", to: "/evaluacion" },
    },
  },
  {
    keywords: ["sintoma", "síntoma", "signos", "tos", "congestion", "congestión", "moco"],
    answer: {
      text: "Los síntomas frecuentes de una infección respiratoria aguda son tos, dificultad para respirar, congestión nasal, dolor de oído o de garganta y fiebre. Hay una página con los signos a observar y cómo contar la frecuencia respiratoria.",
      link: { label: "Ver síntomas", to: "/sintomas" },
    },
  },
  {
    keywords: ["fiebre", "temperatura", "calentura"],
    answer: {
      text: "La duración de la fiebre importa: fiebre persistente por más de 48 horas, o mayor a 38 °C por más de 8 días, es un dato que conviene consultar con un profesional. Si además hay dificultad para respirar o decaimiento, busca atención urgente.",
      link: { label: "Cuándo consultar", to: "/sintomas" },
    },
  },
  {
    keywords: ["prevenir", "prevencion", "prevención", "evitar", "proteger", "vacuna", "lavado", "manos"],
    answer: {
      text: "Ayudan: lavarse las manos con frecuencia, mantener la vacunación al día, evitar el humo de tabaco, ventilar e iluminar el hogar, una alimentación adecuada y cuidar el contacto con personas con síntomas.",
      link: { label: "Ver prevención", to: "/prevencion" },
    },
  },
  {
    keywords: ["enfermedad", "bronquiolitis", "neumonia", "neumonía", "asma", "crup", "tos ferina", "otitis", "tuberculosis", "resfriado", "sinusitis"],
    answer: {
      text: "En la sección de enfermedades encuentras fichas de las condiciones respiratorias más frecuentes en la infancia: qué son, síntomas, signos de alarma y prevención.",
      link: { label: "Ver enfermedades", to: "/enfermedades" },
    },
  },
  {
    keywords: ["historial", "seguimiento", "guardar", "guarda", "datos", "privacidad"],
    answer: {
      text: "Cada evaluación completada se guarda en el historial, solo en tu dispositivo. No pedimos nombres ni datos que identifiquen al niño, y puedes borrar el historial cuando quieras.",
      link: { label: "Ver historial", to: "/historial" },
    },
  },
  {
    keywords: ["medicina", "medicamento", "jarabe", "dosis", "antibiotico", "antibiótico", "tratamiento", "receta", "ibuprofeno", "acetaminofen", "acetaminofén"],
    answer: {
      text: "No puedo recomendar medicamentos, dosis ni tratamientos. Eso solo lo debe indicar un profesional de la salud que valore a tu hijo. Si quieres, te ayudo a identificar signos de alarma o el momento de consultar.",
      link: { label: "Cuándo consultar", to: "/sintomas" },
    },
  },
  {
    keywords: ["contacto", "escribir", "mensaje", "correo", "ayuda"],
    answer: {
      text: "Puedes escribirnos desde la página de contacto y te responderemos lo antes posible. Para una urgencia, no uses el correo: acude a un centro de salud.",
      link: { label: "Ir a contacto", to: "/contacto" },
    },
  },
];

export const FALLBACK_ANSWER: AssistantAnswer = {
  text: "No tengo una respuesta para eso. Puedo ayudarte con qué es RespiraKids, el semáforo, la evaluación, síntomas, prevención y enfermedades respiratorias frecuentes. Para cualquier duda de salud de tu hijo, consulta a un profesional.",
};

export const SUGGESTIONS = [
  "¿Qué es RespiraKids?",
  "¿Cómo funciona el semáforo?",
  "¿Cómo puedo prevenir las infecciones respiratorias?",
  "¿Cuándo debo consultar al médico?",
];

function normalize(text: string): string {
  return text
    .toLowerCase()
    .normalize("NFD")
    .replace(/[̀-ͯ]/g, "");
}

export function getAssistantAnswer(question: string): AssistantAnswer {
  const q = normalize(question);

  if (URGENT_KEYWORDS.some((k) => q.includes(normalize(k)))) return URGENT_ANSWER;

  if (q.includes("consultar") || q.includes("medico") || q.includes("doctor") || q.includes("urgencia")) {
    return {
      text: "Consulta a un profesional si la tos dura más de 15 días, la fiebre pasa de 48 horas o de 38 °C por más de 8 días, hay silbidos recurrentes en el pecho, pérdida de peso o contacto con tuberculosis. Si hay signos de alarma, ve de inmediato a urgencias.",
      link: { label: "Ver cuándo consultar", to: "/sintomas" },
    };
  }

  const match = TOPICS.find((t) => t.keywords.some((k) => q.includes(normalize(k))));
  return match ? match.answer : FALLBACK_ANSWER;
}
