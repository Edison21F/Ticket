'use client'
import React, { useState } from 'react';
import AdminView from './AdminView'; // Asegúrate de importar el componente AdminView

// TIPOS Y INTERFACES
type EstadoAsiento = 'disponible' | 'reservado' | 'vendido';

interface Seccion {
  id: string;
  nombre: string;
  color: string;
  filaInicio: string;
  filaFin: string;
  asientosPorFila: number[];
  precio: number;
}

interface Asiento {
  id: string;
  numero: number;
  fila: string;
  seccion: string;
  estado: EstadoAsiento;
  precio: number;
}

// Sections Configuration
const SECCIONES: Seccion[] = [
  {
    id: 'vip',
    nombre: 'VIP',
    color: 'bg-purple-100',
    filaInicio: 'A',
    filaFin: 'E',
    asientosPorFila: Array(5).fill(20),
    precio: 150
  },
  {
    id: 'preferencial',
    nombre: 'PREFERENCIAL',
    color: 'bg-orange-100',
    filaInicio: 'A',
    filaFin: 'H',
    asientosPorFila: Array(8).fill(25),
    precio: 100
  },
  {
    id: 'tribuna',
    nombre: 'TRIBUNA',
    color: 'bg-blue-100',
    filaInicio: 'A',
    filaFin: 'K',
    asientosPorFila: Array(11).fill(30),
    precio: 50
  }
];

const SECCIONES_LATERALES = [
  {
    id: 'platinum-derecha',
    nombre: 'PLATINUM DER',
    numeroInicio: 1,
    numeroFin: 4,
    filas: 5,
    posicion: 'derecha',
    precio: 200
  },
  {
    id: 'platinum-izquierda',
    nombre: 'PLATINUM IZQ',
    numeroInicio: 1,
    numeroFin: 4,
    filas: 5,
    posicion: 'izquierda',
    precio: 200
  }
];

// Seat Generation Function
const generarAsientos = () => {
  const asientos: Asiento[] = [];
  
  SECCIONES.forEach(seccion => {
    const letrasFilas = Array.from(
      { length: seccion.filaFin.charCodeAt(0) - seccion.filaInicio.charCodeAt(0) + 1 },
      (_, i) => String.fromCharCode(seccion.filaInicio.charCodeAt(0) + i)
    );
    
    letrasFilas.forEach((fila, indiceFila) => {
      const numAsientos = seccion.asientosPorFila[indiceFila] || seccion.asientosPorFila[0];
      for (let numAsiento = 1; numAsiento <= numAsientos; numAsiento++) {
        asientos.push({
          id: `${seccion.id}-${fila}${numAsiento}`,
          numero: numAsiento,
          fila: fila,
          seccion: seccion.id,
          estado: Math.random() > 0.3 ? 'disponible' : Math.random() > 0.5 ? 'reservado' : 'vendido',
          precio: seccion.precio
        });
      }
    });
  });

  SECCIONES_LATERALES.forEach(seccion => {
    for (let fila = 1; fila <= seccion.filas; fila++) {
      for (let numBox = seccion.numeroInicio; numBox <= seccion.numeroFin; numBox++) {
        asientos.push({
          id: `${seccion.id}-${fila}-${numBox}`,
          numero: numBox,
          fila: fila.toString(),
          seccion: seccion.id,
          estado: Math.random() > 0.3 ? 'disponible' : Math.random() > 0.5 ? 'reservado' : 'vendido',
          precio: seccion.precio
        });
      }
    }
  });

  return asientos;
};

// Componentes de Sección
const SeccionPrincipal = ({ 
  seccion, 
  asientos,
  onSeleccionarAsiento
}: { 
  seccion: Seccion, 
  asientos: Asiento[],
  onSeleccionarAsiento: (asiento: Asiento) => void
}) => {
  const asientosSeccion = asientos.filter(asiento => asiento.seccion === seccion.id);
  
  return (
    <div className="flex flex-col gap-0.5 overflow-x-auto">
      {Array.from({ length: seccion.filaFin.charCodeAt(0) - seccion.filaInicio.charCodeAt(0) + 1 }).map((_, indiceFila) => {
        const letraFila = String.fromCharCode(seccion.filaInicio.charCodeAt(0) + indiceFila);
        const asientosFila = asientosSeccion.filter(asiento => asiento.fila === letraFila);
        
        return (
          <div key={letraFila} className="flex gap-0.5 justify-center items-center text-xs min-w-max px-4">
            <span className="w-6 text-right pr-2 text-gray-500 font-medium">{letraFila}</span>
            {asientosFila.map(asiento => (
              <button
                key={asiento.id}
                onClick={() => asiento.estado === 'disponible' && onSeleccionarAsiento(asiento)}
                className={`w-4 h-4 md:w-5 md:h-5 flex items-center justify-center text-[8px] md:text-[10px] font-medium
                  rounded transition-all duration-200 ${
                  asiento.estado === 'disponible' 
                    ? 'bg-green-400 hover:bg-green-500 text-white' 
                    : asiento.estado === 'reservado' 
                    ? 'bg-yellow-400 text-white cursor-not-allowed' 
                    : 'bg-red-400 text-white cursor-not-allowed'
                }`}
                title={`${asiento.fila}${asiento.numero} - $${asiento.precio}`}
              >
                {asiento.numero}
              </button>
            ))}
            <span className="w-6 text-left pl-2 text-gray-500 font-medium">{letraFila}</span>
          </div>
        );
      })}
    </div>
  );
};

const SeccionLateral = ({
  seccion,
  asientos,
  onSeleccionarAsiento
}: {
  seccion: typeof SECCIONES_LATERALES[0],
  asientos: Asiento[],
  onSeleccionarAsiento: (asiento: Asiento) => void
}) => {
  const asientosSeccion = asientos.filter(asiento => asiento.seccion === seccion.id);
  
  return (
    <div className="flex flex-col gap-1">
      {Array.from({ length: seccion.filas }).map((_, indiceFila) => (
        <div key={indiceFila} className="flex gap-1">
          {Array.from({ length: seccion.numeroFin - seccion.numeroInicio + 1 }).map((_, indiceAsiento) => {
            const asiento = asientosSeccion.find(
              a => a.fila === (indiceFila + 1).toString() && a.numero === indiceAsiento + seccion.numeroInicio
            );
            if (!asiento) return null;
            
            return (
              <button
                key={asiento.id}
                onClick={() => asiento.estado === 'disponible' && onSeleccionarAsiento(asiento)}
                className={`w-4 h-4 md:w-6 md:h-6 flex items-center justify-center text-[8px] md:text-[10px] font-medium
                  rounded transition-all duration-200 ${
                  asiento.estado === 'disponible' 
                    ? 'bg-blue-400 hover:bg-blue-500 text-white' 
                    : asiento.estado === 'reservado' 
                    ? 'bg-yellow-400 text-white cursor-not-allowed' 
                    : 'bg-red-400 text-white cursor-not-allowed'
                }`}
                title={`Platinum ${asiento.fila}-${asiento.numero} - $${asiento.precio}`}
              >
                {asiento.numero}
              </button>
            );
          })}
        </div>
      ))}
    </div>
  );
};

// Componente Principal
const StadiumLayout: React.FC = () => {
  const [asientos, setAsientos] = useState<Asiento[]>(generarAsientos());
  const [asientosSeleccionados, setAsientosSeleccionados] = useState<Asiento[]>([]);
  const [mostrarMensajeExito, setMostrarMensajeExito] = useState(false);
  const [mostrarAdminView, setMostrarAdminView] = useState(false); // Estado para controlar la vista de Admin

  const manejarSeleccionAsiento = (asiento: Asiento) => {
    if (asientosSeleccionados.find(a => a.id === asiento.id)) {
      setAsientosSeleccionados(asientosSeleccionados.filter(a => a.id !== asiento.id));
    } else {
      setAsientosSeleccionados([...asientosSeleccionados, asiento]);
    }
  };

  const manejarReserva = () => {
    const asientosActualizados = asientos.map(asiento => {
      if (asientosSeleccionados.find(a => a.id === asiento.id)) {
        return { ...asiento, estado: 'reservado' as EstadoAsiento };
      }
      return asiento;
    });
    
    setAsientos(asientosActualizados);
    setAsientosSeleccionados([]);
    setMostrarMensajeExito(true);
    setTimeout(() => setMostrarMensajeExito(false), 3000);
  };

  const obtenerNombreSeccion = (seccionId: string) => {
    const seccionPrincipal = SECCIONES.find(s => s.id === seccionId);
    if (seccionPrincipal) return seccionPrincipal.nombre;
    
    const seccionLateral = SECCIONES_LATERALES.find(s => s.id === seccionId);
    return seccionLateral ? seccionLateral.nombre : seccionId;
  };

  return (
    <div className="w-full max-w-7xl mx-auto p-2 md:p-4 bg-transparent min-h-screen">
      {/* Contenedor para el botón de Admin */}
      <div className="flex justify-end mb-4">
        <button
          onClick={() => setMostrarAdminView(!mostrarAdminView)}
          className="flex items-center px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors duration-200"
        >
          <svg className="w-5 h-5 mr-2" fill="currentColor" viewBox="0 0 20 20">
            <path d="M10 2a8 8 0 100 16 8 8 0 000-16zm0 14a6 6 0 110-12 6 6 0 010 12z" />
            <path d="M10 4a6 6 0 100 12 6 6 0 000-12zm0 10a4 4 0 110-8 4 4 0 010 8z" />
          </svg>
          {mostrarAdminView ? 'Ocultar Vista de Administración' : 'Mostrar Vista de Administración'}
        </button>
      </div>

      {/* Mostrar AdminView si el estado es verdadero */}
      {mostrarAdminView && <AdminView />}

      {/* Escenario */}
      <div className="w-full max-w-4xl mx-auto mb-4 md:mb-8">
        <div className="bg-amber-500 h-12 md:h-20 rounded-t-full relative flex items-start justify-center">
          <div className="absolute -top-2 left-1/2 transform -translate-x-1/2 
            bg-amber-600 text-black px-4 md:px-8 py-1 md:py-2 rounded-full text-xs md:text-sm font-bold">
            ESCENARIO
          </div>
        </div>
      </div>
    
      {/* Layout del Concierto */}
      <div className="w-full max-w-6xl mx-auto bg-transparent rounded-lg p-4 md:p-8 relative">
        <div className="flex flex-col md:flex-row justify-between items-center md:items-start gap-4 md:gap-8">
          {/* Platinum Izquierda */}
          <div className="md:order-1">
            <h3 className="text-xs md:text-sm font-bold mb-2 text-center text-gray-200">PLATINUM IZQ</h3>
            <SeccionLateral 
              seccion={SECCIONES_LATERALES.find(s => s.id === 'platinum-izquierda')!}
              asientos={asientos}
              onSeleccionarAsiento={manejarSeleccionAsiento}
            />
          </div>
    
          {/* Secciones Principales */}
          <div className="space-y-4 md:space-y-8 flex-grow overflow-x-auto md:order-2">
            {SECCIONES.map((seccion) => (
              <div key={seccion.id} className="relative">
                <h3 className="text-xs md:text-sm font-bold mb-2 md:mb-4 text-center text-gray-200">{seccion.nombre}</h3>
                <SeccionPrincipal 
                  seccion={seccion}
                  asientos={asientos}
                  onSeleccionarAsiento={manejarSeleccionAsiento}
                />
              </div>
            ))}
          </div>
    
          {/* Platinum Derecha */}
          <div className="md:order-3">
            <h3 className="text-xs md:text-sm font-bold mb-2 text-center text-gray-200">PLATINUM DER</h3>
            <SeccionLateral 
              seccion={SECCIONES_LATERALES.find(s => s.id === 'platinum-derecha')!}
              asientos={asientos}
              onSeleccionarAsiento={manejarSeleccionAsiento}
            />
          </div>
        </div>
      </div>
    
      {/* Panel de Asientos Seleccionados */}
      {asientosSeleccionados.length > 0 && (
        <div className="fixed bottom-4 right-4 bg-transparent rounded-lg shadow-2xl p-4 w-full max-w-xs md:w-80 border border-gray-700">
          <h3 className="text-base md:text-lg font-bold mb-2 text-gray-200">
            Asientos Seleccionados ({asientosSeleccionados.length})
          </h3>
          <div className="space-y-2 mb-4 max-h-48 overflow-y-auto">
            {asientosSeleccionados.map(asiento => (
              <div key={asiento.id} className="flex justify-between items-center text-sm md:text-base text-gray-300">
                <span>
                  {obtenerNombreSeccion(asiento.seccion)} - Fila {asiento.fila} Asiento {asiento.numero}
                </span>
                <span className="font-bold text-gray-200">${asiento.precio}</span>
              </div>
            ))}
            <div className="border-t border-gray-700 pt-2 mt-2">
              <div className="flex justify-between font-bold text-gray-200">
                <span>Total:</span>
                <span>${asientosSeleccionados.reduce((sum, asiento) => sum + asiento.precio, 0)}</span>
              </div>
            </div>
          </div> 
          <div className="flex gap-2">
            <button
              onClick={() => setAsientosSeleccionados([])}
              className="flex-1 px-4 py-2 bg-gray-700 text-sm md:text-base text-gray-200 rounded-lg 
                hover:bg-gray-600 transition-colors duration-200"
            >
              Limpiar
            </button>
            <button
              onClick={manejarReserva}
              className="flex-1 px-4 py-2 bg-green-600 text-sm md:text-base text-white rounded-lg 
                hover:bg-green-700 transition-colors duration-200"
            >
              Reservar
            </button>
          </div>
        </div>
      )}
  
      {/* Mensaje de Éxito con Detalles */}
      {mostrarMensajeExito && (
        <div className="fixed bottom-4 left-4 bg-transparent border-l-4 border-green-500 p-4 rounded shadow-lg 
        text-green-100 w-full max-w-xs md:max-w-md z-50">
          <div className="flex">
            <div className="flex-shrink-0">
              <svg className="h-5 w-5 text-green-500" viewBox="0 0 20 20" fill="currentColor">
                <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clipRule="evenodd" />
              </svg>
            </div>
            <div className="ml-3">
              <p className="text-base md:text-lg font-medium text-green-100">
                ¡Reserva exitosa!
              </p>
              <div className="mt-1 text-xs md:text-sm">
                {asientosSeleccionados.map((asiento) => (
                  <p key={asiento.id}>
                    {obtenerNombreSeccion(asiento.seccion)} - Fila {asiento.fila} Asiento {asiento.numero}
                  </p>
                ))}
              </div>
            </div>
          </div>
        </div>
      )}

      {/* Leyenda de Estados de Asientos */}
      <div className="mt-4 md:mt-8 flex flex-wrap gap-4 md:gap-6 justify-center">
        <div className="flex items-center gap-2">
          <div className="w-4 h-4 bg-green-400 rounded-sm" />
          <span className="text-xs md:text-sm text-gray-300">Disponible</span>
        </div>
        <div className="flex items-center gap-2">
          <div className="w-4 h-4 bg-yellow-400 rounded-sm" />
          <span className="text-xs md:text-sm text-gray-300">Reservado</span>
        </div>
        <div className="flex items-center gap-2">
          <div className="w-4 h-4 bg-red-400 rounded-sm" />
          <span className="text-xs md:text-sm text-gray-300">Vendido</span>
        </div>
      </div>
    </div>
  );
};

export default StadiumLayout;