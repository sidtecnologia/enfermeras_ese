import { Toaster } from 'react-hot-toast';
import Dashboard from './components/Dashboard';
import VisitaForm from './components/VisitaForm';

export default function App() {
  return (
    <div className="max-w-xl mx-auto px-4 py-10 bg-[#fcfdfe] min-h-screen">
      <Toaster position="top-center" />
      <header className="mb-10 text-center">
        <h1 className="text-4xl font-black text-slate-900 tracking-tighter">Caracterización<span className="text-indigo-600">ESE</span></h1>
        <p className="text-slate-400 text-[10px] font-bold uppercase tracking-[0.3em]">Barrancabermeja</p>
      </header>
      <main className="space-y-10">
        <Dashboard />
        <div className="h-[1px] bg-slate-100 w-full relative">
            <span className="absolute left-1/2 -translate-x-1/2 -translate-y-1/2 bg-[#fcfdfe] px-4 text-[9px] font-black text-slate-300 uppercase tracking-widest">Formulario</span>
        </div>
        <VisitaForm />
      </main>
    </div>
  );
}