import { useForm } from 'react-hook-form';
import { db } from '../db/db';
import { SECCIONES_FORMULARIO } from '../constants/preguntas';
import { motion, AnimatePresence } from 'framer-motion';
import toast from 'react-hot-toast';
import { Save, AlertCircle, Check } from 'lucide-react';

export default function VisitaForm() {
  const { register, handleSubmit, reset, watch, formState: { errors } } = useForm();

  const onSubmit = async (data) => {
    await db.visitas.put({ ...data, fecha_visita: new Date().toISOString() });
    toast.success('Guardado');
    reset();
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  return (
    <form onSubmit={handleSubmit(onSubmit)} className="space-y-6 pb-24">
      {SECCIONES_FORMULARIO.map((seccion) => (
        <div key={seccion.id} className="card-modern p-6 md:p-8">
          <h3 className="text-xs font-black text-indigo-600 mb-6 uppercase tracking-widest flex items-center gap-2">
            <span className="w-4 h-1 bg-indigo-600 rounded-full"></span> {seccion.titulo}
          </h3>
          <div className="space-y-5">
            {seccion.preguntas.map((p) => (
              <div key={p.id}>
                <label className="text-[10px] font-bold text-slate-400 mb-1 block uppercase">{p.label}</label>
                {p.tipo === 'select' ? (
                  <select {...register(p.id, { required: "Obligatorio" })} className={`input-field font-semibold ${errors[p.id] ? 'input-error' : ''}`}>
                    <option value="">Seleccione...</option>
                    {p.opciones.map(o => <option key={o} value={o}>{o}</option>)}
                  </select>
                ) : p.tipo === 'multiselect' ? (
                  <div className="grid grid-cols-1 gap-2">
                    {p.opciones.map((o) => (
                      <label key={o} className={`flex items-center p-4 rounded-2xl border-2 transition-all cursor-pointer ${(watch(p.id) || []).includes(o) ? 'border-indigo-500 bg-indigo-50' : 'border-slate-50 bg-slate-50'}`}>
                        <input type="checkbox" value={o} {...register(p.id, { required: "Seleccione uno" })} className="hidden" />
                        <div className={`w-5 h-5 rounded border-2 mr-3 flex items-center justify-center ${(watch(p.id) || []).includes(o) ? 'bg-indigo-600 border-indigo-600' : 'bg-white'}`}>
                          {(watch(p.id) || []).includes(o) && <Check size={14} className="text-white" />}
                        </div>
                        <span className="font-bold text-sm">{o}</span>
                      </label>
                    ))}
                  </div>
                ) : (
                  <input type={p.tipo} {...register(p.id, { required: "Obligatorio" })} className={`input-field font-semibold ${errors[p.id] ? 'input-error' : ''}`} />
                )}
                {errors[p.id] && <p className="text-red-500 text-[10px] font-bold mt-1 uppercase tracking-tighter italic">Este campo es requerido</p>}
              </div>
            ))}
          </div>
        </div>
      ))}
      <button type="submit" className="w-full bg-indigo-600 text-white py-6 rounded-3xl font-black text-lg shadow-2xl flex items-center justify-center gap-3 active:scale-95 transition-transform">
        <Save size={24} /> GUARDAR VISITA
      </button>
    </form>
  );
}