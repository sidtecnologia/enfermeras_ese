import { db } from '../db/db';

export const exportarAExcel = async () => {
  try {
    const visitas = await db.visitas.toArray();
    if (visitas.length === 0) return false;

    const XLSX = await import('xlsx');
    
    // 1. Preparar Hoja de Visitas General
    const datosVisitas = visitas.map(v => {
      const { grupoFamiliar, ...resto } = v; // Extraemos grupoFamiliar para que no salga como [object Object]
      return {
        ...resto,
        fecha_visita: new Date(v.fecha_visita).toLocaleString(),
        tipoActividad: Array.isArray(v.tipoActividad) ? v.tipoActividad.join(', ') : v.tipoActividad,
        serviciosPublicos: Array.isArray(v.serviciosPublicos) ? v.serviciosPublicos.join(', ') : v.serviciosPublicos,
        factoresRiesgo: Array.isArray(v.factoresRiesgo) ? v.factoresRiesgo.join(', ') : v.factoresRiesgo,
        presenciaAnimales: Array.isArray(v.presenciaAnimales) ? v.presenciaAnimales.join(', ') : v.presenciaAnimales,
        antecedentesPersonales: Array.isArray(v.antecedentesPersonales) ? v.antecedentesPersonales.join(', ') : v.antecedentesPersonales,
        riesgosPersonales: Array.isArray(v.riesgosPersonales) ? v.riesgosPersonales.join(', ') : v.riesgosPersonales
      };
    });

    // 2. Preparar Hoja Detallada de Familiares
    const datosFamiliares = [];
    visitas.forEach(v => {
      if (v.grupoFamiliar && Array.isArray(v.grupoFamiliar)) {
        v.grupoFamiliar.forEach(f => {
          datosFamiliares.push({
            Documento_Cabeza_Familia: v.pacienteId,
            Nombre_Cabeza_Familia: v.nombreCompleto,
            ...f // Incluye todos los campos: nombre, parentesco, EPS, régimen, ocupación, etc.
          });
        });
      }
    });

    // 3. Crear el Libro y las Hojas
    const libro = XLSX.utils.book_new();
    
    const hojaVisitas = XLSX.utils.json_to_sheet(datosVisitas);
    const hojaFamiliares = XLSX.utils.json_to_sheet(datosFamiliares);

    XLSX.utils.book_append_sheet(libro, hojaVisitas, "Visitas Generales");
    XLSX.utils.book_append_sheet(libro, hojaFamiliares, "Detalle Grupo Familiar");

    // 4. Descargar
    XLSX.writeFile(libro, `Reporte_Completo_Salud_${new Date().getTime()}.xlsx`);
    return true;
  } catch (e) {
    console.error("Error al exportar Excel:", e);
    return false;
  }
};