import { db } from '../db/db';

export const exportarAExcel = async () => {
  try {
    const visitas = await db.visitas.toArray();
    if (visitas.length === 0) return false;
    const XLSX = await import('xlsx');
    const datos = visitas.map(v => ({
      ...v,
      tipoActividad: Array.isArray(v.tipoActividad) ? v.tipoActividad.join(', ') : v.tipoActividad,
      fecha_visita: new Date(v.fecha_visita).toLocaleString()
    }));
    const hoja = XLSX.utils.json_to_sheet(datos);
    const libro = XLSX.utils.book_new();
    XLSX.utils.book_append_sheet(libro, hoja, "Visitas");
    XLSX.writeFile(libro, `Reporte_${new Date().getTime()}.xlsx`);
    return true;
  } catch (e) {
    return false;
  }
};