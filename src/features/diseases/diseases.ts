// Contenido educativo general. Fuente: Modulo 6 (Infeccion respiratoria aguda) de la
// Herramienta Clinica Primera Infancia, Minsalud Colombia. Sin dosis ni tratamientos.
// Faringoamigdalitis queda fuera hasta poder revisar su subpagina oficial.

export type DiseaseZone = "altas" | "bajas" | "otras";

export interface Disease {
  slug: string;
  name: string;
  zone: DiseaseZone;
  summary: string;
  symptoms: string[];
  alarm: string[];
  prevention: string;
}

export const zoneLabels: Record<DiseaseZone, string> = {
  altas: "Vías respiratorias altas",
  bajas: "Vías respiratorias bajas",
  otras: "Otras condiciones respiratorias",
};

export const diseases: Disease[] = [
  {
    slug: "rinofaringitis",
    name: "Rinofaringitis aguda (resfriado común)",
    zone: "altas",
    summary:
      "Infección viral frecuente de nariz y garganta. Suele ser leve y mejorar sola, pero conviene vigilar que no aparezcan signos de complicación.",
    symptoms: ["Congestión o secreción nasal", "Estornudos", "Tos leve", "Malestar o fiebre baja"],
    alarm: ["Dificultad para respirar", "Rechazo total del alimento o los líquidos", "Fiebre que persiste más de 48 horas"],
    prevention: "Lavado de manos, ventilación del hogar y evitar el contacto con personas enfermas.",
  },
  {
    slug: "rinosinusitis",
    name: "Rinosinusitis",
    zone: "altas",
    summary:
      "Inflamación de la nariz y los senos paranasales, a menudo después de un resfriado que no mejora como se esperaba.",
    symptoms: ["Congestión nasal que dura varios días", "Secreción nasal espesa", "Tos, sobre todo en la noche", "Dolor o presión en la cara"],
    alarm: ["Hinchazón alrededor de los ojos", "Fiebre alta persistente", "Mucho decaimiento"],
    prevention: "Lavado de manos, evitar el humo de tabaco y consultar si el resfriado se prolonga.",
  },
  {
    slug: "otitis-media",
    name: "Otitis media aguda",
    zone: "altas",
    summary:
      "Infección del oído medio, común en la infancia y frecuente después de un cuadro respiratorio alto.",
    symptoms: ["Dolor de oído", "Irritabilidad o llanto sin causa clara", "Fiebre", "Rechazo del alimento"],
    alarm: ["Secreción por el oído", "Hinchazón o enrojecimiento detrás de la oreja", "Fiebre alta o decaimiento marcado"],
    prevention: "Evitar el humo de tabaco, mantener la vacunación al día y la lactancia materna cuando sea posible.",
  },
  {
    slug: "crup",
    name: "Laringotraqueítis (crup)",
    zone: "altas",
    summary:
      "Inflamación de la laringe y la tráquea que produce una tos característica, similar al ladrido de un perro.",
    symptoms: ["Tos perruna o ladrante", "Voz ronca", "Ruido al inspirar (estridor)", "Fiebre baja"],
    alarm: ["Estridor incluso en reposo", "Tiraje (se hunde el pecho al respirar)", "Coloración azulada en labios o piel"],
    prevention: "Lavado de manos y evitar el contacto con personas con síntomas respiratorios.",
  },
  {
    slug: "bronquiolitis",
    name: "Bronquiolitis",
    zone: "bajas",
    summary:
      "Infección viral de los bronquios más pequeños, frecuente en lactantes. Puede dificultar la respiración y requiere vigilancia cercana.",
    symptoms: ["Tos y moco", "Respiración rápida", "Silbidos en el pecho", "Dificultad para alimentarse"],
    alarm: ["Tiraje o aleteo nasal", "Pausas al respirar (apnea)", "Coloración azulada", "No puede alimentarse"],
    prevention: "Lavado de manos, evitar humo de tabaco y alejar al bebé de personas con síntomas.",
  },
  {
    slug: "neumonia",
    name: "Neumonía",
    zone: "bajas",
    summary:
      "Infección de los pulmones. Es una de las principales causas de consulta grave en menores y necesita valoración profesional.",
    symptoms: ["Tos", "Fiebre", "Respiración rápida", "Decaimiento"],
    alarm: ["Tiraje o quejido al respirar", "Coloración azulada", "No puede beber líquidos", "Somnolencia o dificultad para despertar"],
    prevention: "Esquema de vacunación al día, evitar humo de tabaco y buena alimentación.",
  },
  {
    slug: "tos-ferina",
    name: "Tos ferina",
    zone: "bajas",
    summary:
      "Enfermedad contagiosa que causa episodios de tos intensa. Es especialmente peligrosa en bebés pequeños y se previene con vacunación.",
    symptoms: ["Accesos de tos seguidos", "Sonido agudo al tomar aire tras la tos", "Vómito después de toser", "Tos que dura semanas"],
    alarm: ["Pausas al respirar", "Coloración azulada durante la tos", "Bebé menor de 3 meses con tos persistente"],
    prevention: "Vacunación completa en el niño y en las gestantes y personas cercanas, según el esquema vigente.",
  },
  {
    slug: "asma",
    name: "Asma",
    zone: "otras",
    summary:
      "Condición crónica que hace que los bronquios se inflamen y se estrechen, con episodios de silbidos y falta de aire.",
    symptoms: ["Silbidos en el pecho", "Tos recurrente, sobre todo en la noche o con ejercicio", "Sensación de pecho apretado", "Episodios repetidos en el año"],
    alarm: ["Dificultad marcada para hablar o respirar", "Tiraje", "Coloración azulada", "No mejora con su plan de manejo indicado"],
    prevention: "Evitar desencadenantes (humo, polvo, alérgenos) y seguir el control con el equipo de salud.",
  },
  {
    slug: "tuberculosis",
    name: "Tuberculosis",
    zone: "otras",
    summary:
      "Infección bacteriana que suele afectar los pulmones. En niños puede ser silenciosa y se sospecha, sobre todo, tras contacto con una persona enferma.",
    symptoms: ["Tos por más de 15 días", "Fiebre prolongada", "Pérdida o no ganancia de peso", "Contacto con una persona con tuberculosis"],
    alarm: ["Dificultad para respirar", "Decaimiento importante", "Tos con sangre"],
    prevention: "Ventilación e iluminación del hogar, buena alimentación y estudio de las personas en contacto.",
  },
];
