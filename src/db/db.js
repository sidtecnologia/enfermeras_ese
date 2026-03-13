import Dexie from 'dexie';

export const db = new Dexie('SaludProDB');
db.version(1).stores({
  visitas: 'pacienteId, fecha_visita'
});