'use client'

import React, { useState } from 'react';
import { Settings, X } from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';
import { Doughnut } from 'react-chartjs-2';
import {
  Chart as ChartJS,
  ArcElement,
  Tooltip,
  Legend,
} from 'chart.js';

// Registrar los componentes necesarios de Chart.js
ChartJS.register(ArcElement, Tooltip, Legend);

// Definir tipos para nuestros datos
interface PaymentRecord {
  id: string;
  serviceName: string;
  ticketCount: number;
  amount: number;
  status: 'Cancelado' | 'En progreso' | 'Finalizado' | 'Reembolso';
}

interface PaymentMethod {
  id: string;
  name: string;
  color: string;
}

const PaymentManagement = () => {
  // Datos de ejemplo para las estadísticas
  const paymentStats = [
    { name: 'Transporte', value: 35, color: '#00BFA5' },
    { name: 'Cine', value: 25, color: '#FF4081' },
    { name: 'Conciertos', value: 30, color: '#7C4DFF' },
    { name: 'Otros', value: 10, color: '#FFC107' },
  ];

  // Estados para búsqueda y filtrado
  const [searchTerm, setSearchTerm] = useState('');
  const [filterStatus, setFilterStatus] = useState('');

  // Estado para métodos de pago
  const [paymentMethods, setPaymentMethods] = useState<PaymentMethod[]>([
    { id: '1', name: 'Efectivo', color: '#FFC107' },
    { id: '2', name: 'Tarjetas', color: '#2196F3' },
    { id: '3', name: 'PayPal', color: '#3F51B5' },
    { id: '4', name: 'Transferencia', color: '#4CAF50' },
  ]);

  // Estados para modales y detalles
  const [showDetails, setShowDetails] = useState<PaymentRecord | null>(null);
  const [showAlert, setShowAlert] = useState<string | null>(null);
  const [isEditingPaymentMethods, setIsEditingPaymentMethods] = useState(false);

  // Datos de ejemplo para la tabla
  const [payments] = useState<PaymentRecord[]>([
    { id: '196', serviceName: 'Bus - Cooperativa Transplaneta', ticketCount: 196, amount: 365.85, status: 'Cancelado' },
    { id: '883', serviceName: 'Cine - Avengers: Endgame', ticketCount: 883, amount: 310.75, status: 'En progreso' },
    { id: '357', serviceName: 'Concierto - Coldplay', ticketCount: 357, amount: 410.40, status: 'Finalizado' },
    { id: '459', serviceName: 'Cine - Spider-Man', ticketCount: 459, amount: 420.00, status: 'Reembolso' },
    { id: '782', serviceName: 'Concierto - Metallica', ticketCount: 782, amount: 589.50, status: 'En progreso' },
    { id: '102', serviceName: 'Cine - Avatar 2', ticketCount: 102, amount: 250.00, status: 'Finalizado' },
  ]);

  // Filtrar pagos según la búsqueda y el estado
  const filteredPayments = payments.filter(payment =>
    payment.serviceName.toLowerCase().includes(searchTerm.toLowerCase()) &&
    (filterStatus ? payment.status === filterStatus : true)
  );

  // Función de ayuda para obtener el color del estado
  const getStatusColor = (status: string) => {
    switch (status) {
      case 'Cancelado': return 'bg-red-500';
      case 'En progreso': return 'bg-yellow-500';
      case 'Finalizado': return 'bg-green-500';
      case 'Reembolso': return 'bg-purple-500';
      default: return 'bg-gray-500';
    }
  };

  // Funciones para manejar alertas
  const handleAction = (action: string, payment: PaymentRecord) => {
    setShowAlert(`${action} seleccionado para ${payment.serviceName}`);
    setTimeout(() => {
      setShowAlert(null);
    }, 3000);
  };

  // Funciones para métodos de pago
  const addPaymentMethod = () => {
    const newMethod: PaymentMethod = {
      id: (paymentMethods.length + 1).toString(),
      name: `Nuevo Método ${paymentMethods.length + 1}`,
      color: '#FFFFFF',
    };
    setPaymentMethods([...paymentMethods, newMethod]);
  };

  const deletePaymentMethod = (id: string) => {
    setPaymentMethods(paymentMethods.filter(method => method.id !== id));
  };

  const editPaymentMethodName = (id: string, newName: string) => {
    setPaymentMethods(paymentMethods.map(method => method.id === id ? { ...method, name: newName } : method));
  };

  // Datos para el gráfico
  const chartData = {
    labels: paymentStats.map(stat => stat.name),
    datasets: [
      {
        data: paymentStats.map(stat => stat.value),
        backgroundColor: paymentStats.map(stat => stat.color),
        hoverBackgroundColor: paymentStats.map(stat => stat.color),
      },
    ],
  };

  // Opciones para el gráfico
  const chartOptions = {
    animation: {
      animateScale: true,
    },
    plugins: {
      legend: {
        display: false,
      },
    },
    cutout: '70%',
  };

  return (
    <div className="p-6  min-h-screen">
      {/* Mensaje de alerta */}
      <AnimatePresence>
        {showAlert && (
          <motion.div
            className="fixed top-4 right-4 bg-gray-800 text-white px-4 py-2 rounded-md shadow-lg"
            initial={{ opacity: 0, y: -20 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -20 }}
          >
            {showAlert}
          </motion.div>
        )}
      </AnimatePresence>

      {/* Detalles del pago */}
      <AnimatePresence>
        {showDetails && (
          <motion.div
            className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
          >
            <motion.div
              className="bg-gray-800 rounded-xl p-6 w-96 relative"
              initial={{ scale: 0.8 }}
              animate={{ scale: 1 }}
              exit={{ scale: 0.8 }}
            >
              <button
                className="absolute top-4 right-4 text-gray-400 hover:text-gray-200"
                onClick={() => setShowDetails(null)}
              >
                <X className="w-6 h-6" />
              </button>
              <h2 className="text-2xl font-bold text-white mb-4">{showDetails.serviceName}</h2>
              <p className="text-white mb-2">Cantidad de Tickets: {showDetails.ticketCount}</p>
              <p className="text-white mb-2">Recaudación: ${showDetails.amount.toFixed(2)}</p>
              <p className="text-white">Estado: {showDetails.status}</p>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>

      {/* Editar Métodos de Pago */}
      <AnimatePresence>
        {isEditingPaymentMethods && (
          <motion.div
            className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
          >
            <motion.div
              className="bg-gray-800 rounded-xl p-6 w-96 relative"
              initial={{ scale: 0.8 }}
              animate={{ scale: 1 }}
              exit={{ scale: 0.8 }}
            >
              <button
                className="absolute top-4 right-4 text-gray-400 hover:text-gray-200"
                onClick={() => setIsEditingPaymentMethods(false)}
              >
                <X className="w-6 h-6" />
              </button>
              <h2 className="text-2xl font-bold text-white mb-4">Editar Métodos de Pago</h2>
              <div className="space-y-4">
                {paymentMethods.map((method) => (
                  <div key={method.id} className="flex items-center space-x-2">
                    <input
                      type="text"
                      value={method.name}
                      onChange={(e) => editPaymentMethodName(method.id, e.target.value)}
                      className="px-2 py-1 rounded-md bg-gray-700 text-white flex-1"
                    />
                    <button
                      className="px-2 py-1 bg-red-600 text-white rounded-md hover:bg-red-700"
                      onClick={() => deletePaymentMethod(method.id)}
                    >
                      Eliminar
                    </button>
                  </div>
                ))}
                <button
                  className="w-full px-3 py-2 bg-green-600 text-white rounded-md hover:bg-green-700"
                  onClick={addPaymentMethod}
                >
                  Agregar Método de Pago
                </button>
              </div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        {/* Sección Izquierda (Estadísticas & Métodos de Pago) */}
        <div className="space-y-6">
          {/* Tarjeta de Estadísticas */}
          <div className="border border-gray-700 rounded-xl p-6 shadow-lg">
            {/* Gráfico de dona con animaciones */}
            <div className="relative w-64 h-64 mx-auto">
              <Doughnut data={chartData} options={chartOptions} />
              <div className="absolute inset-0 flex flex-col items-center justify-center">
                <h2 className="text-2xl font-bold text-white mt-6">Ventas</h2>
                <p className="text-gray-400 text-sm">Recaudación total</p>
                <div className="text-3xl font-bold text-white mt-2">$3,291.92</div>
              </div>
            </div>
            {/* Leyenda */}
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
          </div>

          {/* Tarjeta de Métodos de Pago */}
          <div className=" border border-gray-700 rounded-xl p-6 shadow-lg">
            <div className="flex justify-between items-start">
              <div>
                <h2 className="text-2xl font-bold text-white">Métodos de pago</h2>
                <p className="text-gray-400 text-sm">Lista de métodos de pago aprobados</p>
              </div>
              <button
                className="p-2 hover:bg-gray-700 rounded-full"
                onClick={() => setIsEditingPaymentMethods(true)}
              >
                <Settings className="w-6 h-6 text-gray-400" />
              </button>
            </div>
            <div className="space-y-4 mt-6">
              {paymentMethods.map((method) => (
                <div key={method.id} className="flex items-center space-x-3 text-white">
                  <div
                    className="w-6 h-6 rounded-full"
                    style={{ backgroundColor: method.color }}
                  />
                  <span>{method.name}</span>
                </div>
              ))}
            </div>
          </div>
        </div>

        {/* Sección Derecha (Tabla de Gestión de Pagos) */}
        <div className="lg:col-span-2">
          <div className=" rounded-xl shadow-lg overflow-hidden border border-gray-700">
            <div className="p-6">
              <h2 className="text-2xl font-bold text-white mb-4">Gestión de Pagos</h2>
              <div className="flex flex-col md:flex-row items-center md:justify-between space-y-4 md:space-y-0">
                <input
                  type="text"
                  placeholder="Buscar por servicio..."
                  value={searchTerm}
                  onChange={(e) => setSearchTerm(e.target.value)}
                  className="px-4 py-2 rounded-md bg-gray-700 text-white w-full md:w-1/2"
                />
                <select
                  value={filterStatus}
                  onChange={(e) => setFilterStatus(e.target.value)}
                  className="px-4 py-2 rounded-md bg-gray-700 text-white w-full md:w-1/4"
                >
                  <option value="">Todos los estados</option>
                  <option value="Cancelado">Cancelado</option>
                  <option value="En progreso">En progreso</option>
                  <option value="Finalizado">Finalizado</option>
                  <option value="Reembolso">Reembolso</option>
                </select>
              </div>
            </div>
            <div className="overflow-x-auto">
              <table className="w-full">
                <thead className="bg-gray-600">
                  <tr>
                    <th className="px-6 py-3 text-left text-sm font-medium text-gray-300">Nombre del Servicio</th>
                    <th className="px-6 py-3 text-left text-sm font-medium text-gray-300">Cantidad de Tickets</th>
                    <th className="px-6 py-3 text-left text-sm font-medium text-gray-300">Recaudación</th>
                    <th className="px-6 py-3 text-left text-sm font-medium text-gray-300">Estado</th>
                    <th className="px-6 py-3 text-left text-sm font-medium text-gray-300">Acciones</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-gray-700">
                  {filteredPayments.map((payment) => (
                    <tr key={payment.id} className="hover:bg-gray-700 transition-colors duration-200">
                      <td className="px-6 py-4 text-sm text-white">{payment.serviceName}</td>
                      <td className="px-6 py-4 text-sm text-white">{payment.ticketCount}</td>
                      <td className="px-6 py-4 text-sm text-white">${payment.amount.toFixed(2)}</td>
                      <td className="px-6 py-4 text-sm">
                        <span className={`px-3 py-1 rounded-full text-xs ${getStatusColor(payment.status)} text-white`} style={{ whiteSpace: 'nowrap' }}>
                          {payment.status}
                        </span>
                      </td>
                      <td className="px-6 py-4 text-sm space-y-2">
                        <button
                          className="w-full px-3 py-1 bg-teal-600 text-white rounded-md hover:bg-teal-700"
                          onClick={() => setShowDetails(payment)}
                        >
                          Detalles
                        </button>
                        <button
                          className="w-full px-3 py-1 bg-orange-600 text-white rounded-md hover:bg-orange-700"
                          onClick={() => handleAction('Reembolso', payment)}
                        >
                          Reembolso
                        </button>
                        <button
                          className="w-full px-3 py-1 bg-blue-600 text-white rounded-md hover:bg-blue-700"
                          onClick={() => handleAction('Cancelar', payment)}
                        >
                          Cancelar
                        </button>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
              {filteredPayments.length === 0 && (
                <div className="p-6 text-center text-white">
                  No se encontraron pagos que coincidan con los criterios.
                </div>
              )}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default PaymentManagement;
