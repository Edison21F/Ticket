'use client'
import React, { useState } from 'react';

type SeatStatus = 'available' | 'reserved' | 'sold';

interface Section {
  id: string;
  name: string;
  color: string;
  capacity: number;
  gates: string[];
  position: string;
  price: number;
}

interface Seat {
  id: string;
  number: number;
  row: number;
  section: string;
  status: SeatStatus;
  price: number;
}

interface StadiumLayoutProps {
  isAdmin?: boolean;
  onSeatStatusChange?: (seatId: string, status: SeatStatus) => void;
  onSeatDelete?: (seatId: string) => void;
  onSeatPriceChange?: (seatId: string, price: number) => void;
}

const SECTIONS: Section[] = [
    { 
        id: 'vip',
        name: 'VIP',
        color: 'bg-purple-600',
        capacity: 100,
        gates: ['14'],
        position: 'top-[10%] left-1/2 transform -translate-x-1/2 w-[30%] h-[20%]',
        price: 500
      },
      {
        id: 'general',
        name: 'GENERAL',
        color: 'bg-blue-600',
        capacity: 500,
        gates: ['7A', '7B', '8', '9'],
        position: 'bottom-0 left-1/2 transform -translate-x-1/2 w-[60%] h-[25%]',
        price: 200
      },
      {
        id: 'tribuna',
        name: 'TRIBUNA',
        color: 'bg-red-600',
        capacity: 200,
        gates: ['3B', '4A', '4B', '5', '6'],
        position: 'left-0 top-1/2 transform -translate-y-1/2 w-[20%] h-[100%]',
        price: 300
      },
      {
        id: 'preferencia',
        name: 'PREFERENCIA',
        color: 'bg-pink-600',
        capacity: 200,
        gates: ['11', '12', '13'],
        position: 'right-0 top-1/2 transform -translate-y-1/2 w-[20%] h-[100%]',
        price: 300
      }
];

const generateMockSeats = (): Seat[] => 
  Array.from({ length: 100 }, (_, i) => ({
    id: `seat-${i}`,
    number: i + 1,
    row: Math.floor(i / 10) + 1,
    section: SECTIONS[Math.floor(Math.random() * SECTIONS.length)].id,
    status: Math.random() > 0.3 ? 'available' : Math.random() > 0.5 ? 'reserved' : 'sold',
    price: Math.floor(Math.random() * 50 + 50) * 10
  }));

export const StadiumLayout = ({ 
  isAdmin = false, 
  onSeatStatusChange,
  onSeatDelete,
  onSeatPriceChange 
}: StadiumLayoutProps) => {
  
    const [selectedSection, setSelectedSection] = useState<string | null>(null);
    const [selectedSeat, setSelectedSeat] = useState<Seat | null>(null);
    const [seats, setSeats] = useState<Seat[]>(generateMockSeats());
    const [editingSeat, setEditingSeat] = useState<Seat | null>(null);
    const [newPrice, setNewPrice] = useState<string>('');
  
    const getSectionSeats = (sectionId: string) => 
      seats.filter((seat) => seat.section === sectionId);
  
    const handleStatusChange = (seatId: string, status: SeatStatus) => {
      const updatedSeats = seats.map(seat =>
        seat.id === seatId ? { ...seat, status } : seat
      );
      setSeats(updatedSeats);
      onSeatStatusChange?.(seatId, status);
    };
  
    const handleDelete = (seatId: string) => {
      if (!onSeatDelete) return;
      const updatedSeats = seats.filter(seat => seat.id !== seatId);
      setSeats(updatedSeats);
      onSeatDelete(seatId);
    };
  
    const handlePriceChange = (seatId: string) => {
      const price = Number(newPrice);
      if (!isNaN(price) && price > 0 && onSeatPriceChange) {
        const updatedSeats = seats.map(seat =>
          seat.id === seatId ? { ...seat, price } : seat
        );
        setSeats(updatedSeats);
        onSeatPriceChange(seatId, price);
        setEditingSeat(null);
        setNewPrice('');
      }
    };
  
    const handleSeatSelection = (seat: Seat) => {
      if (isAdmin || seat.status !== 'available') return;
      setSelectedSeat(seat);
    };
  
    const handleReservation = (seat: Seat) => {
      handleStatusChange(seat.id, 'reserved');
      setSelectedSeat(null);
    };
  
    return (
      <div className="relative w-full max-w-4xl mx-auto p-4">
        {/* Stage Area */}
        <div className="w-full h-24 bg-gradient-to-b from-purple-900 to-purple-800 rounded-t-lg mb-8 relative overflow-hidden">
          <div className="absolute inset-0 bg-[radial-gradient(circle,_rgba(255,255,255,0.1)_0%,_transparent_60%)] animate-pulse" />
          <div className="absolute inset-0 flex items-center justify-center">
            <div className="text-white text-2xl font-bold tracking-wider">STAGE</div>
          </div>
          <div className="absolute bottom-0 w-full h-8 bg-gradient-to-b from-transparent to-black/50" />
        </div>
  
        {/* Stadium Layout */}
        <div className="relative aspect-[2/1] bg-gray-900 rounded-[100%] overflow-hidden border-4 border-purple-500/30">
          <div className="absolute inset-0 bg-[radial-gradient(circle,_rgba(139,92,246,0.1)_0%,_transparent_60%)]" />
  
          {/* Center Stage Area */}
          <div className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 w-[40%] h-[30%] 
            bg-gradient-to-b from-purple-900 to-purple-800 rounded-[100%] border-2 border-purple-400/30 
            flex items-center justify-center overflow-hidden">
            <div className="absolute inset-0 bg-[radial-gradient(circle,_rgba(255,255,255,0.1)_0%,_transparent_60%)] animate-pulse" />
            <div className="w-[80%] h-[80%] border border-purple-400/20 rounded-[100%]" />
          </div>
  
          {/* Sections */}
          {SECTIONS.map((section) => (
            <div
              key={section.id}
              className={`absolute ${section.position} ${section.color} cursor-pointer 
                hover:opacity-90 transition-all duration-300 flex items-center justify-center
                group hover:scale-[1.02] hover:shadow-lg hover:shadow-purple-500/20`}
              onClick={() => setSelectedSection(section.id)}
            >
              <div className="absolute inset-0 bg-gradient-to-b from-white/10 to-transparent" />
              <div className="relative flex flex-col items-center">
                <span className="text-white font-bold text-sm mb-1">{section.name}</span>
                <span className="text-white/80 text-xs opacity-0 group-hover:opacity-100 transition-opacity">
                  Desde ${section.price}
                </span>
              </div>
            </div>
          ))}
  
          {/* Gates */}
          <div className="absolute bottom-2 left-1/2 transform -translate-x-1/2 text-purple-200 text-sm font-bold">
            ENTRADA PRINCIPAL
          </div>
        </div>
  
        {/* Selected Section Detail */}
        {selectedSection && (
          <div className="mt-8 p-6 bg-gray-900 rounded-lg shadow-lg border border-purple-500/30">
            <div className="flex justify-between items-center mb-6">
              <div>
                <h3 className="text-2xl font-bold text-purple-400">
                  {SECTIONS.find((s) => s.id === selectedSection)?.name}
                </h3>
                <p className="text-gray-400 text-sm mt-1">
                  Selecciona un asiento disponible
                </p>
              </div>
              <button 
                className="px-4 py-2 bg-purple-600 text-white rounded-lg hover:bg-purple-700 
                  transition-colors duration-200"
                onClick={() => setSelectedSection(null)}
              >
                Cerrar
              </button>
            </div>
  
            <div className="grid grid-cols-10 gap-2">
              {getSectionSeats(selectedSection).map((seat) => (
                <div key={seat.id} className="relative group">
                  <button
                    className={`w-10 h-10 rounded-lg text-sm font-bold flex items-center justify-center
                      transition-all duration-200 ${
                        seat.status === 'available' 
                          ? 'bg-green-500 text-white hover:bg-green-600 hover:scale-110' 
                          : seat.status === 'reserved'
                          ? 'bg-yellow-500 text-white cursor-not-allowed'
                          : 'bg-red-500 text-white cursor-not-allowed'
                      }`}
                    onClick={() => handleSeatSelection(seat)}
                    disabled={seat.status !== 'available' && !isAdmin}
                  >
                    {seat.number}
                  </button>
  
                  {isAdmin && (
                    <div className="absolute -top-12 left-1/2 transform -translate-x-1/2 hidden group-hover:flex 
                      flex-col items-center gap-1 bg-gray-800 p-2 rounded-lg shadow-lg z-10">
                      <select
                        className="text-xs bg-gray-700 text-white rounded px-1 py-0.5"
                        value={seat.status}
                        onChange={(e) => handleStatusChange(seat.id, e.target.value as SeatStatus)}
                      >
                        <option value="available">Disponible</option>
                        <option value="reserved">Reservado</option>
                        <option value="sold">Vendido</option>
                      </select>
                      {editingSeat?.id === seat.id ? (
                        <div className="flex gap-1">
                          <input
                            type="number"
                            value={newPrice}
                            onChange={(e) => setNewPrice(e.target.value)}
                            className="w-16 text-xs bg-gray-700 text-white rounded px-1 py-0.5"
                            placeholder="Precio"
                          />
                          <button
                            onClick={() => handlePriceChange(seat.id)}
                            className="text-xs bg-green-600 text-white rounded px-2 py-0.5"
                          >
                            ✓
                          </button>
                        </div>
                      ) : (
                        <button
                          onClick={() => setEditingSeat(seat)}
                          className="text-xs bg-blue-600 text-white rounded px-2 py-0.5 w-full"
                        >
                          ${seat.price}
                        </button>
                      )}
                      {onSeatDelete && (
                        <button
                          onClick={() => handleDelete(seat.id)}
                          className="text-xs bg-red-600 text-white rounded px-2 py-0.5 w-full"
                        >
                          Eliminar
                        </button>
                      )}
                    </div>
                  )}
                </div>
              ))}
            </div>
  
            <div className="mt-6 flex justify-between text-gray-400 text-sm">
              <div className="flex items-center gap-4">
                <div className="flex items-center gap-2">
                  <div className="w-4 h-4 rounded bg-green-500" />
                  <span>Disponible</span>
                </div>
                <div className="flex items-center gap-2">
                  <div className="w-4 h-4 rounded bg-yellow-500" />
                  <span>Reservado</span>
                </div>
                <div className="flex items-center gap-2">
                  <div className="w-4 h-4 rounded bg-red-500" />
                  <span>Vendido</span>
                </div>
              </div>
              <div>
                Total asientos: {getSectionSeats(selectedSection).length}
              </div>
            </div>
          </div>
        )}
  
        {/* Seat Selection Modal */}
        {selectedSeat && (
          <div className="fixed inset-0 bg-black/80 flex items-center justify-center p-4 z-50">
            <div className="bg-gray-900 p-8 rounded-lg max-w-md w-full border border-purple-500/30">
              <h3 className="text-2xl font-bold text-purple-400 mb-6">Detalles del Asiento</h3>
              <div className="space-y-4 text-gray-300">
                <p>Sección: {SECTIONS.find(s => s.id === selectedSeat.section)?.name}</p>
                <p>Fila: {selectedSeat.row}</p>
                <p>Número: {selectedSeat.number}</p>
                <p className="text-xl font-bold text-purple-400">Precio: ${selectedSeat.price}</p>
              </div>
              <div className="flex gap-4 mt-8">
                <button 
                  className="flex-1 px-4 py-3 bg-gray-700 text-white rounded-lg hover:bg-gray-600
                    transition-colors duration-200"
                  onClick={() => setSelectedSeat(null)}
                >
                  Cancelar
                </button>
                <button 
                  className="flex-1 px-4 py-3 bg-purple-600 text-white rounded-lg hover:bg-purple-700
                    transition-colors duration-200"
                  onClick={() => handleReservation(selectedSeat)}
                >
                  Reservar
                </button>
              </div>
            </div>
          </div>
        )}
      </div>
    );
};