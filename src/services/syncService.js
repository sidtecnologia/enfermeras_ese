import { supabase } from './supabase';
import { db } from '../db/db';

export const sincronizarVisitas = async () => {
  try {
    const pendientes = await db.visitas.where('sincronizado').equals(0).toArray();

    if (pendientes.length === 0) return { success: true, count: 0 };

    for (const visita of pendientes) {
      const { error } = await supabase
        .from('visitas')
        .insert([{
          id: visita.id,
          paciente_id: visita.paciente_id,
          respuestas: visita.respuestas,
          fecha_visita: visita.fecha_visita,
          enfermera_id: (await supabase.auth.getUser()).data.user?.id
        }]);

      if (!error) {
        await db.visitas.update(visita.id, { sincronizado: 1 });
      } else {
        console.error("Error subiendo registro:", error);
      }
    }

    return { success: true, count: pendientes.length };
  } catch (error) {
    console.error("Fallo crítico en sincronización:", error);
    return { success: false, error };
  }
};