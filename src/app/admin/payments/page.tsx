'use client'

import React from 'react';
import { Settings } from 'lucide-react';

// Define types for our data
interface PaymentRecord {
  id: string;
  serviceName: string;
  ticketCount: number;
  amount: number;
  status: 'Cancelado' | 'En progreso' | 'Finalizado' | 'Reembolso';
}

const PaymentManagement = () => {
  // Sample data for the stats
  const paymentStats = [
    { name: 'Transporte', value: 35, color: '#00BFA5' },
    { name: 'Cine', value: 25, color: '#FF4081' },
    { name: 'Conciertos', value: 30, color: '#7C4DFF' },
    { name: 'Otros', value: 10, color: '#FFC107' },
  ];

  // Sample data for the table
  const payments: PaymentRecord[] = [
    { id: '196', serviceName: 'Bus- Coperativa Transplaneta', ticketCount: 196, amount: 365.85, status: 'Cancelado' },
    { id: '883', serviceName: 'Cine- Avengers: Endgame', ticketCount: 883, amount: 310.75, status: 'En progreso' },
    { id: '357', serviceName: 'Concierto- Coldplay', ticketCount: 357, amount: 410.40, status: 'Finalizado' },
    { id: '459', serviceName: 'Cine- Spider-Man', ticketCount: 459, amount: 420.00, status: 'Reembolso' },
    { id: '782', serviceName: 'Concierto- Metallica', ticketCount: 782, amount: 589.50, status: 'En progreso' },
    { id: '102', serviceName: 'Cine- Avatar 2', ticketCount: 102, amount: 250.00, status: 'Finalizado' },
  ];

  // Helper function to get status color
  const getStatusColor = (status: string) => {
    switch (status) {
      case 'Cancelado': return 'bg-red-500';
      case 'En progreso': return 'bg-yellow-500';
      case 'Finalizado': return 'bg-green-500';
      case 'Reembolso': return 'bg-purple-500';
      default: return 'bg-gray-500';
    }
  };

  return (
    <div className="min-h-screen bg-gray-900 p-6">
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        {/* Left Section (Stats & Payment Methods) */}
        <div className="space-y-6">
          {/* Stats Card */}
          <div className="bg-gray-800 rounded-xl p-6 shadow-lg">
            <div className="relative w-48 h-48 mx-auto">
              {/* CSS pie chart */}
              <div className="absolute inset-0 flex items-center justify-center">
                <div className="w-32 h-32 rounded-full bg-gray-700"></div>
              </div>
              {paymentStats.map((stat, index) => (
                <div
                  key={stat.name}
                  className="absolute inset-0"
                  style={{
                    transform: `rotate(${index * (360 / paymentStats.length)}deg)`,
                    clipPath: `polygon(50% 50%, 50% 0, ${50 + 50 * Math.cos((2 * Math.PI * stat.value) / 100)}% ${50 - 50 * Math.sin((2 * Math.PI * stat.value) / 100)}%)`
                  }}
                >
                  <div
                    className="w-full h-full"
                    style={{ backgroundColor: stat.color }}
                  ></div>
                </div>
              ))}
            </div>
            <div className="mt-6 space-y-2">
              {paymentStats.map((stat) => (
                <div key={stat.name} className="flex items-center justify-between">
                  <div className="flex items-center gap-2">
                    <div 
                      className="w-3 h-3 rounded-full" 
                      style={{ backgroundColor: stat.color }}
                    />
                    <span className="text-white text-sm">{stat.name}</span>
                  </div>
                  <span className="text-white text-sm">{stat.value}%</span>
                </div>
              ))}
            </div>
            <h2 className="text-2xl font-bold text-white mt-6">Ventas</h2>
            <p className="text-gray-400 text-sm">Recaudación de todos los eventos</p>
            <div className="text-3xl font-bold text-white mt-2">$3,291.92</div>
          </div>

          {/* Payment Methods Card */}
          <div className="bg-gray-800 rounded-xl p-6 shadow-lg">
            <div className="flex justify-between items-start">
              <div>
                <h2 className="text-2xl font-bold text-white">Métodos de pago</h2>
                <p className="text-gray-400 text-sm">Lista de métodos de pago aprobados</p>
              </div>
              <button className="p-2 hover:bg-gray-700 rounded-full">
                <Settings className="w-6 h-6 text-gray-400" />
              </button>
            </div>
            <div className="space-y-4 mt-6">
              <div className="flex items-center space-x-3 text-white">
                <div className="w-6 h-6 bg-yellow-500 rounded-full" />
                <span>Efectivo</span>
              </div>
              <div className="flex items-center space-x-3 text-white">
                <div className="w-6 h-6 bg-blue-500 rounded-full" />
                <span>Tarjetas</span>
              </div>
              <div className="flex items-center space-x-3 text-white">
                <div className="w-6 h-6 bg-indigo-500 rounded-full" />
                <span>PayPal</span>
              </div>
              <div className="flex items-center space-x-3 text-white">
                <div className="w-6 h-6 bg-green-500 rounded-full" />
                <span>Transferencia</span>
              </div>
            </div>
          </div>
        </div>

        {/* Right Section (Payment Management Table) */}
        <div className="lg:col-span-2">
          <div className="bg-gray-800 rounded-xl shadow-lg overflow-hidden">
            <div className="p-6">
              <h2 className="text-2xl font-bold text-white mb-4">Gestión de Pagos</h2>
            </div>
            <div className="overflow-x-auto">
              <table className="w-full">
                <thead className="bg-gray-900">
                  <tr>
                    <th className="px-6 py-3 text-left text-sm font-medium text-gray-300">Nombre del Servicio</th>
                    <th className="px-6 py-3 text-left text-sm font-medium text-gray-300">Cantidad de Tickets</th>
                    <th className="px-6 py-3 text-left text-sm font-medium text-gray-300">Recaudación</th>
                    <th className="px-6 py-3 text-left text-sm font-medium text-gray-300">Estado</th>
                    <th className="px-6 py-3 text-left text-sm font-medium text-gray-300">Acciones</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-gray-700">
                  {payments.map((payment) => (
                    <tr key={payment.id} className="hover:bg-gray-700">
                      <td className="px-6 py-4 text-sm text-white">{payment.serviceName}</td>
                      <td className="px-6 py-4 text-sm text-white">{payment.ticketCount}</td>
                      <td className="px-6 py-4 text-sm text-white">${payment.amount.toFixed(2)}</td>
                      <td className="px-6 py-4 text-sm">
                        <span className={`px-3 py-1 rounded-full text-xs ${getStatusColor(payment.status)} text-white`} style={{ whiteSpace: 'nowrap' }}>
                          {payment.status}
                        </span>
                      </td>
                      <td className="px-6 py-4 text-sm space-y-2">
                        <button className="px-3 py-1 bg-teal-600 text-white rounded-md hover:bg-teal-700 block">
                          Detalles
                        </button>
                        <button className="px-3 py-1 bg-orange-600 text-white rounded-md hover:bg-orange-700 block">
                          Reembolso
                        </button>
                        <button className="px-3 py-1 bg-blue-600 text-white rounded-md hover:bg-blue-700 block">
                          Cancelar
                        </button>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default PaymentManagement;
