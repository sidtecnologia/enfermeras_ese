export const SECCIONES_FORMULARIO = [
  {
    id: 'identificacion',
    titulo: 'Identificación y EPS',
    preguntas: [
      { id: 'tipoDocumento', label: 'Tipo de Documento', tipo: 'select', opciones: ['Cedula de ciudadanía', 'Cedula de extranjería', 'Tarjeta de identidad', 'Registro civil', 'Pasaporte'] },
      { id: 'pacienteId', label: 'Número de Documento', tipo: 'text' },
      { 
        id: 'eps', 
        label: 'EPS del paciente', 
        tipo: 'select', 
        opciones: ['ASMET SALUD EPS SAS', 'COOSALUD ENTIDAD PROMOTORA DE SALUS SA', 'ENTIDAD PROMOTORA DE SALUD FAMIOSANAR SAS', 'ENTIDAD PROMOTORA DE SALUD SANITAS SAS', 'EPS SURAMERICANA SA', 'FONDO DE PRESTACIONES SOCIALES DEL MAGISTERIO', 'FUNDACION SALUD MIA EPS', 'NUEVA EMPRESA PROMOTORA DE SALUD SA', 'SALUD TOTAL ENTIDAD PROMOTORA DE SALUD DEL REGIMEN CONTRIBUTIVO Y EL REGIMEN SU'] 
      },
      { id: 'regimen', label: 'Regimen del paciente', tipo: 'select', opciones: ['Contributivo', 'Subsidiado', 'Especial', 'PPNA'] }
    ]
  },
  {
    id: 'datos_personales',
    titulo: 'Datos Personales',
    preguntas: [
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
    id: 'caracterizacion',
    titulo: 'Caracterización y Actividad',
    preguntas: [
      { id: 'poblacionRiesgo', label: 'Población en Riesgo', tipo: 'select', opciones: ['Gestante', 'Menor de 5 años', 'Discapacidad', 'Adulto Mayor', 'Orientación sexual diversa', 'Grupo Etnico'] },
      { id: 'tipoActividad', label: 'Tipo de Actividad Proyectada', tipo: 'multiselect', opciones: ['Todas', 'Consulta PYMS', 'Consulta morbilidad', 'VPS', 'Toma lab PYMS', 'Toma lab Morbilidad', 'Vacunación', 'Realización de tamizajes', 'Realización test', 'IEC', 'Remision IPS', 'Otro'] },
      { id: 'desplazamiento', label: 'Desplazamiento efectivo', tipo: 'select', opciones: ['Si', 'No'] },
      { id: 'remisionProcedimiento', label: '¿Requiere Remisión a Procedimiento?', tipo: 'select', opciones: ['Si', 'No'] }
    ]
  }
];