'use client'

import React, { useState } from "react";
import { motion } from "framer-motion";
import { FaEdit, FaTrash } from "react-icons/fa";

interface TransportSeat {
  id: string;
  section: string;
  row: string;
  number: number;
  status: string;
  price: number;
}

interface TransportSection {
  id: string;
  name: string;
  rows: number;
}

const TransportPage: React.FC = () => {
  const [selectedSeat, setSelectedSeat] = useState<TransportSeat | null>(null);
  const [seats, setSeats] = useState<TransportSeat[]>([
    { id: "1", section: "economy", row: "1", number: 1, status: "available", price: 50 },
    { id: "2", section: "economy", row: "1", number: 2, status: "reserved", price: 50 },
    { id: "3", section: "business", row: "1", number: 1, status: "available", price: 150 },
    // Agrega más asientos según sea necesario
  ]);

  const sections: TransportSection[] = [
    { id: "economy", name: "Economy Class", rows: 10 },
    { id: "business", name: "Business Class", rows: 5 },
  ];

  const handleSeatUpdate = (seatId: string, status: string) => {
    setSeats((prevSeats) =>
      prevSeats.map((seat) =>
        seat.id === seatId ? { ...seat, status } : seat
      )
    );
  };

  const handleSeatDelete = (seatId: string) => {
    setSeats((prevSeats) => prevSeats.filter((seat) => seat.id !== seatId));
  };

  const getSectionSeats = (sectionId: string) => {
    return seats.filter((seat) => seat.section === sectionId);
  };

  const renderSeatGroup = (sectionSeats: TransportSeat[], rowNum: string) => {
    const rowSeats = sectionSeats.filter((seat) => seat.row === rowNum);
    const leftSeats = rowSeats.slice(0, 3);
    const rightSeats = rowSeats.slice(3);

    return (
      <div className="flex justify-between w-full">
        <div className="flex gap-2">{leftSeats.map((seat) => renderSeat(seat))}</div>
        <div className="flex gap-2">{rightSeats.map((seat) => renderSeat(seat))}</div>
      </div>
    );
  };

  const renderSeat = (seat: TransportSeat) => (
    <div key={seat.id} className="relative">
      <motion.button
        className={`w-10 h-10 rounded-md flex items-center justify-center ${
          seat.status === "available"
            ? "bg-green-500 hover:bg-green-400"
            : seat.status === "reserved"
            ? "bg-gray-500"
            : "bg-red-500"
        }`}
        whileHover={{ scale: 1.1 }}
        whileTap={{ scale: 0.9 }}
        onClick={() => setSelectedSeat(seat)}
      >
        {seat.row}
        {seat.number}
      </motion.button>
      <div className="absolute top-0 left-0 w-full h-full flex items-center justify-center gap-2 opacity-0 hover:opacity-100">
        <button
          className="p-2 bg-blue-500 text-white rounded-md"
          onClick={() => handleSeatUpdate(seat.id, "available")}
        >
          <FaEdit />
        </button>
        <button
          className="p-2 bg-red-500 text-white rounded-md"
          onClick={() => handleSeatDelete(seat.id)}
        >
          <FaTrash />
        </button>
      </div>
    </div>
  );

  return (
    <div className="p-8">
      <h1 className="text-2xl font-bold text-center mb-8">Gestión de Transporte</h1>
      <div className="bg-gray-800 p-8 rounded-lg text-white">
        {sections.map((section) => (
          <div key={section.id} className="mb-8">
            <h2 className="text-xl font-semibold mb-4">{section.name}</h2>
            {Array.from({ length: section.rows }, (_, i) => (
              <div key={i} className="flex items-center gap-2 mb-2">
                <span className="w-6">{i + 1}</span>
                {renderSeatGroup(getSectionSeats(section.id), (i + 1).toString())}
              </div>
            ))}
          </div>
        ))}
      </div>
      {selectedSeat && (
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="fixed bottom-4 left-1/2 transform -translate-x-1/2 bg-white text-black p-4 rounded-lg shadow-lg"
        >
          <p>Asiento seleccionado: Fila {selectedSeat.row}, Asiento {selectedSeat.number}</p>
          <p>Precio: ${selectedSeat.price}</p>
          <div className="mt-4 flex gap-2">
            <button
              className="bg-gray-500 text-white py-2 px-4 rounded-md"
              onClick={() => setSelectedSeat(null)}
            >
              Cancelar
            </button>
            <button
              className="bg-green-500 text-white py-2 px-4 rounded-md"
              onClick={() => {
                console.log("Reservando asiento:", selectedSeat);
                setSelectedSeat(null);
              }}
            >
              Reservar
            </button>
          </div>
        </motion.div>
      )}
    </div>
  );
};

export default TransportPage;
