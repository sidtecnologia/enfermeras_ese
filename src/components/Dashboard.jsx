import { useLiveQuery } from 'dexie-react-hooks';
import { db } from '../db/db';
import { exportarAExcel } from '../services/exportService';
import { motion } from 'framer-motion';
import { FileDown, Users, Activity } from 'lucide-react';
import toast from 'react-hot-toast';

export default function Dashboard() {
  const total = useLiveQuery(() => db.visitas.count());
  const hoyCount = useLiveQuery(async () => {
    const inicio = new Date().setHours(0,0,0,0);
    return await db.visitas.where('fecha_visita').above(new Date(inicio).toISOString()).count();
  });

  const handleExport = async () => {
    const loadingToast = toast.loading('Generando reporte detallado...');
    const ok = await exportarAExcel();
    toast.dismiss(loadingToast);
    
    if (ok) {
      toast.success('Excel descargado con éxito');
    } else {
      toast.error('No hay datos para exportar');
    }
  };

  return (
    <div className="grid grid-cols-2 gap-4">
      <div className="card-modern p-6">
        <Users size={20} className="text-indigo-600 mb-2" />
        <h2 className="text-3xl font-black">{total || 0}</h2>
        <p className="text-[10px] font-bold text-slate-400 uppercase">Total Visitas</p>
      </div>
      <div className="card-modern p-6">
        <Activity size={20} className="text-emerald-500 mb-2" />
        <h2 className="text-3xl font-black">{hoyCount || 0}</h2>
        <p className="text-[10px] font-bold text-slate-400 uppercase">Visitas Hoy</p>
      </div>
      <motion.button
        whileTap={{ scale: 0.98 }}
        onClick={handleExport}
        className="col-span-2 bg-slate-900 text-white p-5 rounded-3xl font-bold flex items-center justify-center gap-2 shadow-xl hover:bg-slate-800 transition-colors"
      >
        <FileDown size={18} /> Exportar Reporte Detallado
      </motion.button>
    </div>
  );
}