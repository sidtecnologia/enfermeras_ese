import { useState } from 'react';
import { useForm } from 'react-hook-form';
import { db } from '../db/db';
import { PAGE_1, PAGE_2 } from '../constants/formulario';
import GrupoFamiliarModal from './GrupoFamiliarModal';
import { motion } from 'framer-motion';
import toast from 'react-hot-toast';
import { Save, Check, ChevronRight, ChevronLeft, Users, Trash2, ClipboardList, Search } from 'lucide-react';

export default function VisitaForm() {
  const [tipoRegistro, setTipoRegistro] = useState(null);
  const [step, setStep] = useState(1);
  const [modalOpen, setModalOpen] = useState(false);
  const [grupoFamiliar, setGrupoFamiliar] = useState([]);
  const { register, handleSubmit, watch, trigger, reset, formState: { errors } } = useForm();

  const handleNext = async () => {
    const fieldsToValidate = PAGE_1.flatMap(s => s.preguntas.map(p => p.id));
    const isValid = await trigger(fieldsToValidate);
    if (isValid) {
      setStep(2);
      window.scrollTo({ top: 0, behavior: 'smooth' });
    } else {
      toast.error('Complete los campos obligatorios');
    }
  };

  const handlePrev = () => {
    setStep(1);
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  const onSubmit = async (data) => {
    try {
      const registroFinal = {
        ...data,
        tipoRegistro,
        grupoFamiliar: tipoRegistro === 'caracterizacion' ? grupoFamiliar : [],
        fecha_visita: new Date().toISOString()
      };

      await db.visitas.add(registroFinal);
      
      toast.success(`${tipoRegistro === 'caracterizacion' ? 'Caracterización' : 'Seguimiento'} registrado`);
      reset();
      setGrupoFamiliar([]);
      setStep(1);
      setTipoRegistro(null);
      window.scrollTo({ top: 0, behavior: 'smooth' });
    } catch (e) {
      console.error(e);
      toast.error('Error crítico al guardar');
    }
  };

  const renderPreguntas = (secciones) => secciones.map((seccion) => (
    <div key={seccion.id} className="card-modern p-6 md:p-8 mb-6">
      <h3 className="text-xs font-black text-indigo-600 mb-6 uppercase tracking-widest flex items-center gap-2">
        <span className="w-4 h-1 bg-indigo-600 rounded-full"></span> {seccion.titulo}
      </h3>
      <div className="space-y-5">
        {seccion.preguntas.map((p) => (
          <div key={p.id}>
            <label className="text-[10px] font-bold text-slate-400 mb-1 block uppercase">{p.label}</label>
            {p.tipo === 'select' ? (
              <select {...register(p.id, { required: true })} className={`input-field font-semibold ${errors[p.id] ? 'input-error' : ''}`}>
                <option value="">Seleccione...</option>
                {p.opciones.map(o => <option key={o} value={o}>{o}</option>)}
              </select>
            ) : p.tipo === 'multiselect' ? (
              <div className="grid grid-cols-1 md:grid-cols-2 gap-2">
                {p.opciones.map((o) => (
                  <label key={o} className={`flex items-center p-3 rounded-xl border-2 transition-all cursor-pointer ${(watch(p.id) || []).includes(o) ? 'border-indigo-500 bg-indigo-50' : 'border-slate-50 bg-slate-50'}`}>
                    <input type="checkbox" value={o} {...register(p.id, { required: true })} className="hidden" />
                    <div className={`w-5 h-5 rounded border-2 mr-3 flex items-center justify-center ${(watch(p.id) || []).includes(o) ? 'bg-indigo-600 border-indigo-600' : 'bg-white'}`}>
                      {(watch(p.id) || []).includes(o) && <Check size={14} className="text-white" />}
                    </div>
                    <span className="font-bold text-sm">{o}</span>
                  </label>
                ))}
              </div>
            ) : (
              <input type={p.tipo} step={p.tipo === 'number' ? 'any' : undefined} {...register(p.id, { required: true })} className={`input-field font-semibold ${errors[p.id] ? 'input-error' : ''}`} />
            )}
          </div>
        ))}
      </div>
    </div>
  ));

  if (!tipoRegistro) {
    return (
      <div className="grid grid-cols-1 gap-4">
        <button onClick={() => setTipoRegistro('caracterizacion')} className="card-modern p-8 text-left hover:border-indigo-500 transition-all group">
          <ClipboardList className="text-indigo-600 mb-4 group-hover:scale-110 transition-transform" size={32} />
          <h3 className="text-xl font-black">Caracterización</h3>
          <p className="text-sm text-slate-500 font-medium">Registro completo: Paciente, Vivienda y Entorno.</p>
        </button>
        <button onClick={() => setTipoRegistro('seguimiento')} className="card-modern p-8 text-left hover:border-emerald-500 transition-all group">
          <Search className="text-emerald-500 mb-4 group-hover:scale-110 transition-transform" size={32} />
          <h3 className="text-xl font-black">Seguimiento</h3>
          <p className="text-sm text-slate-500 font-medium">Registro rápido: Solo datos del paciente y actividad.</p>
        </button>
      </div>
    );
  }

  return (
    <div className="pb-24">
      <div className="flex justify-between items-center mb-6 px-2">
        <button onClick={() => { setTipoRegistro(null); setStep(1); }} className="text-[10px] font-black uppercase text-slate-400 hover:text-indigo-600">← Cambiar Tipo</button>
        <div className="flex items-center gap-4 flex-1 justify-end">
          <span className={`text-xs font-black uppercase ${step === 1 ? 'text-indigo-600' : 'text-slate-300'}`}>1. Paciente</span>
          {tipoRegistro === 'caracterizacion' && (
            <>
              <div className="h-1 w-12 bg-slate-100 rounded-full overflow-hidden">
                <div className="h-full bg-indigo-600 transition-all" style={{ width: step === 1 ? '50%' : '100%' }}></div>
              </div>
              <span className={`text-xs font-black uppercase ${step === 2 ? 'text-indigo-600' : 'text-slate-300'}`}>2. Entorno</span>
            </>
          )}
        </div>
      </div>

      <form onSubmit={handleSubmit(onSubmit)}>
        <div className={step === 1 ? 'block' : 'hidden'}>
          {renderPreguntas(PAGE_1)}
          {tipoRegistro === 'caracterizacion' ? (
            <button type="button" onClick={handleNext} className="w-full bg-slate-900 text-white py-6 rounded-3xl font-black text-lg shadow-2xl flex items-center justify-center gap-3">
              Siguiente Página <ChevronRight size={24} />
            </button>
          ) : (
            <button type="submit" className="w-full bg-emerald-600 text-white py-6 rounded-3xl font-black text-lg shadow-2xl flex items-center justify-center gap-3">
              <Save size={24} /> GUARDAR SEGUIMIENTO
            </button>
          )}
        </div>

        {tipoRegistro === 'caracterizacion' && (
          <div className={step === 2 ? 'block' : 'hidden'}>
            {renderPreguntas(PAGE_2.slice(0, 3))}
            <div className="card-modern p-6 md:p-8 mb-6 border-2 border-dashed border-indigo-100 bg-indigo-50/30">
              <h3 className="text-xs font-black text-indigo-600 mb-4 uppercase tracking-widest flex items-center gap-2">
                <Users size={16} /> Grupo Familiar Registrado ({grupoFamiliar.length})
              </h3>
              <div className="space-y-2 mb-4">
                {grupoFamiliar.map((fam, i) => (
                  <div key={i} className="bg-white p-4 rounded-2xl flex justify-between items-center shadow-sm">
                    <div>
                      <p className="font-bold text-sm">{fam.nombreCompleto}</p>
                      <p className="text-[10px] text-slate-400 uppercase font-bold">{fam.parentesco} - {fam.numeroDocumento}</p>
                    </div>
                    <button type="button" onClick={() => setGrupoFamiliar(grupoFamiliar.filter((_, idx) => idx !== i))} className="text-red-400 p-2"><Trash2 size={18}/></button>
                  </div>
                ))}
              </div>
              <button type="button" onClick={() => setModalOpen(true)} className="w-full py-4 bg-white text-indigo-600 font-bold rounded-2xl shadow-sm border border-indigo-100">
                + Agregar Miembro
              </button>
            </div>
            {renderPreguntas(PAGE_2.slice(3))}
            <div className="flex gap-4 mt-8">
              <button type="button" onClick={handlePrev} className="bg-slate-200 text-slate-700 py-6 px-6 rounded-3xl font-black shadow-sm flex items-center justify-center">
                <ChevronLeft size={24} />
              </button>
              <button type="submit" className="flex-1 bg-indigo-600 text-white py-6 rounded-3xl font-black text-lg shadow-2xl flex items-center justify-center gap-3">
                <Save size={24} /> GUARDAR CARACTERIZACIÓN
              </button>
            </div>
          </div>
        )}
      </form>

      <GrupoFamiliarModal isOpen={modalOpen} onClose={() => setModalOpen(false)} onAdd={(data) => { setGrupoFamiliar([...grupoFamiliar, data]); setModalOpen(false); }} />
    </div>
  );
}