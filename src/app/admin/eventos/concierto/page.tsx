'use client';

import { StadiumLayout } from './StadiumLayout';

export default function ConcertPage() {
  const handleSeatStatusChange = (seatId: string, status: string) => {
    console.log('Seat status changed:', seatId, status);
  };

  const handleSeatDelete = (seatId: string) => {
    console.log('Seat deleted:', seatId);
  };

  const handleSeatPriceChange = (seatId: string, price: number) => {
    console.log('Seat price changed:', seatId, price);
  };

  return (
    <div className="container mx-auto py-8">
      <h1 className="text-2xl font-bold text-purple-400 mb-6">
        Administración de Asientos
      </h1>
      <StadiumLayout
        isAdmin={true}
        onSeatStatusChange={handleSeatStatusChange}
        onSeatDelete={handleSeatDelete}
        onSeatPriceChange={handleSeatPriceChange}
      />
    </div>
  );
}
