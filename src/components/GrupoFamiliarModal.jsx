import { useForm } from 'react-hook-form';
import { motion } from 'framer-motion';
import { X, PlusCircle } from 'lucide-react';
import { OpcionesEPS, OpcionesRegimen } from '../constants/opciones';

export default function GrupoFamiliarModal({ isOpen, onClose, onAdd }) {
  const { register, handleSubmit, reset, formState: { errors } } = useForm();

  if (!isOpen) return null;

  const onSubmit = (data) => {
    onAdd(data);
    reset();
  };

  return (
    <div className="fixed inset-0 bg-slate-900/40 backdrop-blur-sm z-50 flex items-center justify-center p-4">
      <motion.div initial={{ scale: 0.9, opacity: 0 }} animate={{ scale: 1, opacity: 1 }} className="bg-[#fcfdfe] w-full max-w-lg max-h-[90vh] overflow-y-auto rounded-[2rem] shadow-2xl p-6">
        <div className="flex justify-between items-center mb-6">
          <h3 className="text-lg font-black text-slate-800">Agregar Familiar</h3>
          <button onClick={onClose} className="p-2 bg-slate-100 rounded-full text-slate-500"><X size={20}/></button>
        </div>
        
        <form onSubmit={handleSubmit(onSubmit)} className="space-y-4">
          <div>
            <label className="text-[10px] font-bold text-slate-400 mb-1 block uppercase">Nombre Completo</label>
            <input {...register('nombreCompleto', { required: true })} className="input-field" />
          </div>
          <div className="grid grid-cols-2 gap-4">
            <div>
              <label className="text-[10px] font-bold text-slate-400 mb-1 block uppercase">Tipo Documento</label>
              <select {...register('tipoDocumento', { required: true })} className="input-field">
                <option value="">Seleccione...</option>
                <option value="CC">CC</option>
                <option value="TI">TI</option>
                <option value="RC">RC</option>
                <option value="CE">CE</option>
              </select>
            </div>
            <div>
              <label className="text-[10px] font-bold text-slate-400 mb-1 block uppercase">Número Documento</label>
              <input {...register('numeroDocumento', { required: true })} className="input-field" />
            </div>
          </div>
          <div className="grid grid-cols-2 gap-4">
            <div>
              <label className="text-[10px] font-bold text-slate-400 mb-1 block uppercase">Parentesco</label>
              <input {...register('parentesco', { required: true })} className="input-field" />
            </div>
            <div>
              <label className="text-[10px] font-bold text-slate-400 mb-1 block uppercase">Fecha Nacimiento</label>
              <input type="date" {...register('fechaNacimiento', { required: true })} className="input-field" />
            </div>
          </div>
          <div className="grid grid-cols-2 gap-4">
            <div>
              <label className="text-[10px] font-bold text-slate-400 mb-1 block uppercase">Género</label>
              <select {...register('genero', { required: true })} className="input-field">
                <option value="">Seleccione...</option>
                <option value="Masculino">Masculino</option>
                <option value="Femenino">Femenino</option>
              </select>
            </div>
            <div>
              <label className="text-[10px] font-bold text-slate-400 mb-1 block uppercase">Vive en vivienda</label>
              <select {...register('viveEnVivienda', { required: true })} className="input-field">
                <option value="Si">Sí</option>
                <option value="No">No</option>
              </select>
            </div>
          </div>
          <div>
            <label className="text-[10px] font-bold text-slate-400 mb-1 block uppercase">EPS</label>
            <select {...register('eps')} className="input-field">
              <option value="">Seleccione...</option>
              {OpcionesEPS.map(e => <option key={e} value={e}>{e}</option>)}
            </select>
          </div>
          <div>
            <label className="text-[10px] font-bold text-slate-400 mb-1 block uppercase">Régimen</label>
            <select {...register('regimen')} className="input-field">
              <option value="">Seleccione...</option>
              {OpcionesRegimen.map(r => <option key={r} value={r}>{r}</option>)}
            </select>
          </div>
          <div className="grid grid-cols-2 gap-4">
            <div>
              <label className="text-[10px] font-bold text-slate-400 mb-1 block uppercase">Ocupación</label>
              <input {...register('ocupacion')} className="input-field" />
            </div>
            <div>
              <label className="text-[10px] font-bold text-slate-400 mb-1 block uppercase">Curso de Vida</label>
              <select {...register('cursoVida')} className="input-field">
                <option value="">Seleccione...</option>
                <option value="Primera Infancia">Primera Infancia</option>
                <option value="Adolecencia">Adolecencia</option>
                <option value="Juventud">Juventud</option>
                <option value="Adultez">Adultez</option>
                <option value="Vejez">Vejez</option>
              </select>
            </div>
          </div>
          <button type="submit" className="w-full bg-slate-900 text-white py-5 rounded-2xl font-bold mt-4 flex items-center justify-center gap-2">
            <PlusCircle size={20} /> Guardar Familiar
          </button>
        </form>
      </motion.div>
    </div>
  );
}