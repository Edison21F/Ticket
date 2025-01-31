// AdminView.tsx
// AdminView.tsx
'use client'
import React, { useState, useEffect } from 'react';

type EstadoAsiento = 'disponible' | 'reservado' | 'vendido';
//type TipoAccion = 'cambiar_estado' | 'eliminar_reserva' | 'bloquear';

interface Asiento {
  id: string;
  numero: number;
  fila: string;
  seccion: string;
  estado: EstadoAsiento;
  precio: number;
  reservadoPor?: string; // Información adicional para admin
  bloqueado?: boolean;
}

interface Reserva {
  id: string;
  cliente: string;
  fechaReserva: Date;
  asientos: Asiento[];
  estado: 'pendiente' | 'confirmada' | 'cancelada';
}

const AdminView: React.FC = () => {
  const [asientos, setAsientos] = useState<Asiento[]>([]);
  const [reservas, setReservas] = useState<Reserva[]>([]);
  const [filtroSeccion, setFiltroSeccion] = useState<string>('todos');
  const [filtroEstado, setFiltroEstado] = useState<EstadoAsiento | 'todos'>('todos');

  // (simularía una llamada a backend)
  useEffect(() => {
    const generarAsientosAdmin = (): Asiento[] => {
      const secciones = ['VIP', 'PREFERENCIAL', 'TRIBUNA', 'PLATINUM-IZQ', 'PLATINUM-DER'];
      const asientosGenerados: Asiento[] = [];

      secciones.forEach(seccion => {
        const filas = seccion.includes('PLATINUM') ? 5 : seccion === 'VIP' ? 5 : seccion === 'PREFERENCIAL' ? 8 : 11;
        const asientosPorFila = seccion.includes('PLATINUM') ? 4 : seccion === 'VIP' ? 20 : seccion === 'PREFERENCIAL' ? 25 : 30;

        for (let f = 1; f <= filas; f++) {
          const letraFila = String.fromCharCode(64 + f);
          for (let num = 1; num <= asientosPorFila; num++) {
            asientosGenerados.push({
              id: `${seccion}-${letraFila}${num}`,
              numero: num,
              fila: letraFila,
              seccion,
              estado: Math.random() > 0.5 ? 'disponible' : Math.random() > 0.5 ? 'reservado' : 'vendido',
              precio: seccion === 'VIP' ? 150 : seccion === 'PREFERENCIAL' ? 100 : seccion.includes('PLATINUM') ? 200 : 50,
              reservadoPor: Math.random() > 0.7 ? `Cliente ${Math.floor(Math.random() * 1000)}` : undefined
            });
          }
        }
      });

      return asientosGenerados;
    };

    setAsientos(generarAsientosAdmin());
    
    // Generar algunas reservas de ejemplo
    const reservasGeneradas: Reserva[] = Array(10).fill(null).map((_, index) => ({
      id: `reserva-${index + 1}`,
      cliente: `Cliente ${Math.floor(Math.random() * 1000)}`,
      fechaReserva: new Date(),
      asientos: generarAsientosAdmin().slice(0, Math.floor(Math.random() * 5) + 1),
      estado: ['pendiente', 'confirmada', 'cancelada'][Math.floor(Math.random() * 3)] as 'pendiente' | 'confirmada' | 'cancelada'
    }));

    setReservas(reservasGeneradas);
  }, []);

  const aplicarFiltros = () => {
    return asientos.filter(asiento => 
      (filtroSeccion === 'todos' || asiento.seccion === filtroSeccion) &&
      (filtroEstado === 'todos' || asiento.estado === filtroEstado)
    );
  };

  const cambiarEstadoAsiento = (asientoId: string, nuevoEstado: EstadoAsiento) => {
    setAsientos(asientos.map(asiento => 
      asiento.id === asientoId ? { ...asiento, estado: nuevoEstado } : asiento
    ));
  };

  const eliminarReserva = (reservaId: string) => {
    setReservas(reservas.filter(reserva => reserva.id !== reservaId));
  };

  const renderAsientoColor = (estado: EstadoAsiento) => {
    switch(estado) {
      case 'disponible': return 'bg-green-500';
      case 'reservado': return 'bg-yellow-500';
      case 'vendido': return 'bg-red-500';
    }
  };

  return (
    <div className="bg-transparent min-h-screen p-4 md:p-8 text-white">
      <h1 className="text-2xl md:text-3xl font-bold mb-6 text-center">Panel Administrativo de Asientos</h1>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
        {/* Filtros */}
        <div className="bg-gray-800 p-4 rounded-lg">
          <h2 className="text-xl font-semibold mb-4">Filtros</h2>
          <div className="space-y-4">
            <div>
              <label className="block mb-2">Sección</label>
              <select 
                value={filtroSeccion} 
                onChange={(e) => setFiltroSeccion(e.target.value)}
                className="w-full bg-gray-700 p-2 rounded"
              >
                <option value="todos">Todas las Secciones</option>
                <option value="VIP">VIP</option>
                <option value="PREFERENCIAL">Preferencial</option>
                <option value="TRIBUNA">Tribuna</option>
                <option value="PLATINUM-IZQ">Platinum Izquierda</option>
                <option value="PLATINUM-DER">Platinum Derecha</option>
              </select>
            </div>
            <div>
              <label className="block mb-2">Estado</label>
              <select 
                value={filtroEstado} 
                onChange={(e) => setFiltroEstado(e.target.value as EstadoAsiento | 'todos')}
                className="w-full bg-gray-700 p-2 rounded"
              >
                <option value="todos">Todos los Estados</option>
                <option value="disponible">Disponible</option>
                <option value="reservado">Reservado</option>
                <option value="vendido">Vendido</option>
              </select>
            </div>
          </div>
        </div>

        {/* Vista de Asientos */}
        <div className="bg-gray-800 p-4 rounded-lg col-span-1 md:col-span-2">
          <h2 className="text-xl font-semibold mb-4">Asientos ({aplicarFiltros().length})</h2>
          <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 gap-2 max-h-96 overflow-y-auto">
            {aplicarFiltros().map(asiento => (
              <div 
                key={asiento.id} 
                className={`p-2 rounded text-center cursor-pointer ${renderAsientoColor(asiento.estado)}`}
                onClick={() => {
                  const estados: EstadoAsiento[] = ['disponible', 'reservado', 'vendido'];
                  const indiceActual = estados.indexOf(asiento.estado);
                  const nuevoEstado = estados[(indiceActual + 1) % estados.length];
                  cambiarEstadoAsiento(asiento.id, nuevoEstado);
                }}
                title={`Sección: ${asiento.seccion}\nFila: ${asiento.fila}\nAsiento: ${asiento.numero}\nPrecio: $${asiento.precio}\nReservado por: ${asiento.reservadoPor || 'N/A'}`}
              >
                {asiento.fila}{asiento.numero}
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* Reservas */}
      <div className="mt-8 bg-gray-800 p-4 rounded-lg">
        <h2 className="text-xl font-semibold mb-4">Reservas Recientes</h2>
        <div className="overflow-x-auto">
          <table className="w-full">
            <thead>
              <tr className="bg-gray-700">
                <th className="p-2">ID</th>
                <th className="p-2">Cliente</th>
                <th className="p-2">Fecha</th>
                <th className="p-2">Asientos</th>
                <th className="p-2">Estado</th>
                <th className="p-2">Acciones</th>
              </tr>
            </thead>
            <tbody>
              {reservas.map(reserva => (
                <tr key={reserva.id} className="border-b border-gray-700">
                  <td className="p-2 text-center">{reserva.id}</td>
                  <td className="p-2 text-center">{reserva.cliente}</td>
                  <td className="p-2 text-center">{reserva.fechaReserva.toLocaleDateString()}</td>
                  <td className="p-2 text-center">
                    {reserva.asientos.map(a => `${a.seccion}-${a.fila}${a.numero}`).join(', ')}
                  </td>
                  <td className="p-2 text-center">
                    <span className={`px-2 py-1 rounded ${
                      reserva.estado === 'pendiente' ? 'bg-yellow-600' :
                      reserva.estado === 'confirmada' ? 'bg-green-600' : 'bg-red-600'
                    }`}>
                      {reserva.estado}
                    </span>
                  </td>
                  <td className="p-2 text-center">
                    <button 
                      onClick={() => eliminarReserva(reserva.id)}
                      className="bg-red-600 hover:bg-red-700 px-2 py-1 rounded"
                    >
                      Eliminar
                    </button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
};

export default AdminView;