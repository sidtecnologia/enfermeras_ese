import { OpcionesEPS, OpcionesRegimen } from './opciones';

export const PAGE_1 = [
  {
    id: 'identificacion',
    titulo: 'Identificación y Datos Personales',
    preguntas: [
      { id: 'tipoDocumento', label: 'Tipo de Documento', tipo: 'select', opciones: ['Cedula de ciudadanía', 'Cedula de extranjería', 'Tarjeta de identidad', 'Registro civil', 'Pasaporte'] },
      { id: 'pacienteId', label: 'Número de Documento', tipo: 'text' },
      { id: 'eps', label: 'EPS del paciente', tipo: 'select', opciones: OpcionesEPS },
      { id: 'regimen', label: 'Régimen del paciente', tipo: 'select', opciones: OpcionesRegimen },
      { id: 'nombreCompleto', label: 'Nombre y Apellidos Completo', tipo: 'text' },
      { id: 'fechaNacimiento', label: 'Fecha de nacimiento', tipo: 'date' },
      { id: 'sexo', label: 'Sexo', tipo: 'select', opciones: ['Masculino', 'Femenino'] }
    ]
  },
  {
    id: 'ubicacion',
    titulo: 'Ubicación de Contacto',
    preguntas: [
      { id: 'direccion', label: 'Dirección de Residencia', tipo: 'text' },
      { id: 'telefono', label: 'Teléfono', tipo: 'text' },
      { id: 'barrio', label: 'Barrio/Vereda/Comuna', tipo: 'text' }
    ]
  },
  {
    id: 'actividad',
    titulo: 'Caracterización y Actividad Proyectada',
    preguntas: [
      { id: 'poblacionRiesgo', label: 'Población en Riesgo', tipo: 'select', opciones: ['Gestante', 'Menor de 5 años', 'Discapacidad', 'Adulto Mayor', 'Orientación sexual diversa', 'Grupo Etnico'] },
      { id: 'tipoActividad', label: 'Tipo de Actividad Proyectada', tipo: 'multiselect', opciones: ['Todas', 'Consulta PYMS', 'Consulta morbilidad', 'VPS', 'Toma lab PYMS', 'Toma lab Morbilidad', 'Vacunación', 'Realización de tamizajes', 'Realización test', 'IEC', 'Remision IPS', 'Otro'] },
      { id: 'desplazamiento', label: 'Desplazamiento efectivo', tipo: 'select', opciones: ['Si', 'No'] },
      { id: 'remisionProcedimiento', label: '¿Requiere Remisión a Procedimiento?', tipo: 'select', opciones: ['Si', 'No'] }
    ]
  }
];

export const PAGE_2 = [
  {
    id: 'visita_vivienda',
    titulo: 'Visita y Vivienda',
    preguntas: [
      { id: 'estadoVisita', label: 'Visita', tipo: 'select', opciones: ['Efectiva', 'No efectiva'] },
      { id: 'tipoVivienda', label: 'Tipo de vivienda', tipo: 'select', opciones: ['Propia', 'Arriendo', 'Familiar'] },
      { id: 'serviciosPublicos', label: 'Servicios Públicos', tipo: 'multiselect', opciones: ['Acueducto', 'Electricidad', 'Gas natural', 'Carbón', 'Leña', 'Gasolina', 'Internet', 'Televisión', 'Alcantarillado', 'Aseo'] }
    ]
  },
  {
    id: 'estado_vivienda',
    titulo: 'Estado de Vivienda',
    preguntas: [
      { id: 'estadoIluminacion', label: 'Iluminación', tipo: 'select', opciones: ['Bueno', 'Regular', 'Malo'] },
      { id: 'estadoVentilacion', label: 'Ventilación', tipo: 'select', opciones: ['Bueno', 'Regular', 'Malo'] },
      { id: 'estadoParedes', label: 'Paredes', tipo: 'select', opciones: ['Bueno', 'Regular', 'Malo'] },
      { id: 'estadoPisos', label: 'Pisos', tipo: 'select', opciones: ['Bueno', 'Regular', 'Malo'] },
      { id: 'estadoTechos', label: 'Techos', tipo: 'select', opciones: ['Bueno', 'Regular', 'Malo'] }
    ]
  },
  {
    id: 'entorno_riesgos',
    titulo: 'Entorno y Antecedentes',
    preguntas: [
      { id: 'factoresRiesgo', label: 'Factores de Riesgo', tipo: 'multiselect', opciones: ['Droga', 'Prostitución', 'Aguas Negras', 'Deslizamientos', 'Basureros', 'Inundaciones'] },
      { id: 'presenciaAnimales', label: 'Presencia de animales', tipo: 'multiselect', opciones: ['Vectores', 'Perros', 'Gatos', 'Vacas', 'Cerdos', 'Equinos', 'Salvajes', 'Roedores'] },
      { id: 'antecedentesPersonales', label: 'Antecedentes Personales', tipo: 'multiselect', opciones: ['Hipertensión arterial', 'Diabetes', 'Enfermedad Renal', 'Eventos Coronarios', 'Hemofilia', 'Artritis', 'Otros'] },
      { id: 'riesgosPersonales', label: 'Riesgos', tipo: 'multiselect', opciones: ['Sedentarismo', 'Alimentación poco saludable', 'Consume Alcohol Frecuentemente', 'Consume cigarrillo', 'Sintomático respiratorio', 'Sintomático de piel', 'Contacto con paciente TBC', 'Consumo de sustancias Psicoactivas', 'Hacinamiento', 'Violencia Intrafamiliar'] }
    ]
  },
  {
    id: 'tamizaje_clinico',
    titulo: 'Tamizaje y Vacunación',
    preguntas: [
      { id: 'tamizajePeso', label: 'Peso (kg)', tipo: 'number' },
      { id: 'tamizajeTalla', label: 'Talla (m)', tipo: 'number' },
      { id: 'tamizajeTension', label: 'Tensión', tipo: 'text' },
      { id: 'tamizajePerimetroAbd', label: 'Perímetro Abdominal (cm)', tipo: 'number' },
      { id: 'tamizajePerimetroBraq', label: 'Perímetro Braquial (cm)', tipo: 'number' },
      { id: 'tamizajeSaturacion', label: 'Saturación', tipo: 'number' },
      { id: 'tamizajeTemperatura', label: 'Temperatura', tipo: 'number' },
      { id: 'tamizajeVisualIzq', label: 'Tamizaje visual Izquierdo', tipo: 'text' },
      { id: 'tamizajeVisualDer', label: 'Tamizaje visual Derecho', tipo: 'text' },
      { id: 'estadoVacunacion', label: 'Estado Vacunación', tipo: 'select', opciones: ['Completo', 'Incompleto'] }
    ]
  }
];