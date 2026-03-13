import Dexie from 'dexie';

export const db = new Dexie('CareProDatabase');

db.version(1).stores({
  visitas: '++id, pacienteId, fecha_visita, nombreCompleto'
});