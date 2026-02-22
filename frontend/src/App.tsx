import { useEffect, useState } from 'react';
import { toast } from 'sonner';
import { UserPlus, Users, Phone, Mail } from 'lucide-react';
import { Cliente } from './types';
import { obtenerClientes, guardarCliente } from './services/cliente.service';

function App() {
  const [clientes, setClientes] = useState<Cliente[]>([]);
  const [formData, setFormData] = useState({ nombre: '', email: '', telefono: '' });
  const [cargando, setCargando] = useState(false);

  // Cargar clientes al iniciar la app
  useEffect(() => {
    cargarClientes();
  }, []);

  const cargarClientes = async () => {
    try {
      const data = await obtenerClientes();
      setClientes(data);
    } catch (error) {
      toast.error('No se pudieron cargar los clientes. ¿Está prendido el backend?');
    }
  };

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!formData.nombre || !formData.email) {
      toast.warning('El nombre y el email son obligatorios');
      return;
    }

    setCargando(true);
    try {
      await guardarCliente(formData);
      toast.success('¡Cliente agregado con éxito!');
      setFormData({ nombre: '', email: '', telefono: '' }); // Limpiar formulario
      cargarClientes(); // Recargar la lista
    } catch (error) {
      toast.error('Hubo un error al guardar el cliente');
    } finally {
      setCargando(false);
    }
  };

  return (
    <div className="min-h-screen bg-yellow-400 p-8 font-sans">
      <div className="max-w-4xl mx-auto space-y-8">
        
        {/* Título */}
        <header className="bg-white border-4 border-black p-6 shadow-[8px_8px_0px_0px_rgba(0,0,0,1)]">
          <h1 className="text-4xl font-black uppercase tracking-tight flex items-center gap-4">
            <Users size={40} className="text-blue-600" />
            Sistema de Fidelización
          </h1>
          <p className="font-bold text-gray-700 mt-2 text-lg">Gestión de Clientes</p>
        </header>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
          
          {/* Formulario de Alta */}
          <section className="bg-white p-6 border-4 border-black shadow-[8px_8px_0px_0px_rgba(0,0,0,1)] h-fit">
            <h2 className="text-2xl font-black mb-6 flex items-center gap-2 uppercase">
              <UserPlus className="text-green-600" />
              Nuevo Cliente
            </h2>
            
            <form onSubmit={handleSubmit} className="space-y-4">
              <div>
                <label className="block font-bold mb-1 uppercase text-sm">Nombre Completo</label>
                <input
                  type="text"
                  name="nombre"
                  value={formData.nombre}
                  onChange={handleChange}
                  className="w-full border-4 border-black p-3 bg-gray-50 focus:bg-white focus:outline-none transition-colors"
                  placeholder="Ej: Juan Pérez"
                />
              </div>
              <div>
                <label className="block font-bold mb-1 uppercase text-sm">Email</label>
                <input
                  type="email"
                  name="email"
                  value={formData.email}
                  onChange={handleChange}
                  className="w-full border-4 border-black p-3 bg-gray-50 focus:bg-white focus:outline-none transition-colors"
                  placeholder="juan@ejemplo.com"
                />
              </div>
              <div>
                <label className="block font-bold mb-1 uppercase text-sm">Teléfono</label>
                <input
                  type="text"
                  name="telefono"
                  value={formData.telefono}
                  onChange={handleChange}
                  className="w-full border-4 border-black p-3 bg-gray-50 focus:bg-white focus:outline-none transition-colors"
                  placeholder="3472..."
                />
              </div>
              
              <button
                type="submit"
                disabled={cargando}
                className="w-full bg-blue-500 text-white font-black uppercase text-lg p-4 border-4 border-black shadow-[4px_4px_0px_0px_rgba(0,0,0,1)] hover:translate-y-1 hover:shadow-[0px_0px_0px_0px_rgba(0,0,0,1)] transition-all disabled:opacity-50"
              >
                {cargando ? 'Guardando...' : 'Guardar Cliente'}
              </button>
            </form>
          </section>

          {/* Lista de Clientes */}
          <section className="space-y-4">
            <h2 className="text-3xl font-black uppercase mb-4 bg-black text-white p-2 inline-block shadow-[4px_4px_0px_0px_rgba(255,255,255,1)]">
              Clientes Registrados
            </h2>
            
            {clientes.length === 0 ? (
              <div className="bg-white p-6 border-4 border-black shadow-[8px_8px_0px_0px_rgba(0,0,0,1)] font-bold text-center">
                Aún no hay clientes registrados.
              </div>
            ) : (
              clientes.map((cliente) => (
                <div 
                  key={cliente.id} 
                  className="bg-white p-5 border-4 border-black shadow-[6px_6px_0px_0px_rgba(0,0,0,1)] hover:-translate-y-1 transition-transform flex flex-col gap-2"
                >
                  <div className="flex justify-between items-start">
                    <h3 className="text-xl font-black uppercase">{cliente.nombre}</h3>
                    <span className="bg-green-400 border-2 border-black font-bold px-2 py-1 text-sm shadow-[2px_2px_0px_0px_rgba(0,0,0,1)]">
                      {cliente.puntos_totales} Pts
                    </span>
                  </div>
                  
                  <div className="flex gap-4 text-sm font-bold text-gray-700">
                    <span className="flex items-center gap-1"><Mail size={16} /> {cliente.email}</span>
                    {cliente.telefono && (
                      <span className="flex items-center gap-1"><Phone size={16} /> {cliente.telefono}</span>
                    )}
                  </div>
                </div>
              ))
            )}
          </section>

        </div>
      </div>
    </div>
  );
}

export default App;