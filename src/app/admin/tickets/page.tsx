"use client";

import React, { useState } from "react";
import "./ModernTicketListing.css";
import { Search, Music, Film, Bus, Calendar, Clock, MapPin, User, Ticket } from "lucide-react";

const ModernTicketListing = () => {
  const [searchTerm, setSearchTerm] = useState("");

  const tickets = [
    {
      type: "concert",
      class: "VIP ACCESS",
      eventName: "Bad Bunny World Tour",
      location: "Madison Square Garden",
      date: "2025-02-15",
      time: "20:00",
      gate: "A1",
      seat: "VIP-123",
      price: "$350.00",
      icon: <Music className="w-6 h-6" />,
      perks: ["Meet & Greet", "Early Access", "Exclusive Merch"],
      color: "from-purple-600 to-pink-500",
    },
    {
      type: "concert",
      class: "GENERAL",
      eventName: "Bad Bunny World Tour",
      location: "Madison Square Garden",
      date: "2025-02-15",
      time: "20:00",
      gate: "B2",
      seat: "GA-456",
      price: "$150.00",
      icon: <Music className="w-6 h-6" />,
      perks: ["Standard Entry", "Standing Area"],
      color: "from-blue-500 to-purple-500",
    },
    {
      type: "cinema",
      class: "PREMIERE",
      eventName: "Dune: Part Two",
      location: "Cinemark Premium",
      date: "2025-01-25",
      time: "19:30",
      gate: "C3",
      seat: "P-789",
      price: "$25.00",
      icon: <Film className="w-6 h-6" />,
      perks: ["Reclining Seat", "Food Service"],
      color: "from-red-500 to-orange-500",
    },
    {
      type: "transport",
      class: "FIRST CLASS",
      eventName: "Express Bus Service",
      location: "Central Station",
      date: "2025-01-24",
      time: "10:15",
      gate: "D4",
      seat: "FC-012",
      price: "$45.00",
      icon: <Bus className="w-6 h-6" />,
      perks: ["Priority Boarding", "Extra Legroom"],
      color: "from-green-500 to-emerald-500",
    },
  ];

  const filteredTickets = tickets.filter((ticket) =>
    ticket.eventName.toLowerCase().includes(searchTerm.toLowerCase()) ||
    ticket.type.toLowerCase().includes(searchTerm.toLowerCase()) ||
    ticket.class.toLowerCase().includes(searchTerm.toLowerCase())
  );

  return (
    <div className="container">
      <div className="header flex items-center justify-between">
        <h1>E-TICKETS</h1>
        <div className="relative w-64">
          <input
            type="text"
            placeholder="Search tickets..."
            className="searchInput pl-10 bg-gray-800 text-white"
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
          />
          <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-5 h-5" />
        </div>
      </div>

      <div className="grid gap-6 p-6">
        {filteredTickets.map((ticket, index) => (
          <div
            key={index}
            className="ticket bg-gray-900 rounded-lg overflow-hidden shadow-xl hover:shadow-2xl transition-all duration-300"
          >
            <div className={`ticket-header bg-gradient-to-r ${ticket.color} p-6 text-white`}>
              <div className="flex justify-between items-start">
                <div className="space-y-2">
                  <div className="flex items-center gap-2">
                    {ticket.icon}
                    <span className="font-bold">{ticket.type.toUpperCase()}</span>
                  </div>
                  <div className="text-2xl font-bold">{ticket.class}</div>
                </div>
                <div className="text-right">
                  <div className="text-sm opacity-75">Price</div>
                  <div className="text-xl font-bold">{ticket.price}</div>
                </div>
              </div>
            </div>
            <div className="ticket-body p-6 bg-gray-800">
              <div className="flex justify-between items-center border-b border-gray-700 pb-4">
                <div>
                  <div className="text-gray-400 text-sm">Event</div>
                  <div className="text-white font-bold text-lg">{ticket.eventName}</div>
                </div>
                <Ticket className="w-8 h-8 text-gray-400" />
              </div>
              <div className="grid grid-cols-2 gap-4 py-4">
                <div>
                  <div className="flex items-center gap-2 text-gray-400">
                    <Calendar className="w-4 h-4" />
                    <span>Date</span>
                  </div>
                  <div className="text-white">{ticket.date}</div>
                </div>
                <div>
                  <div className="flex items-center gap-2 text-gray-400">
                    <Clock className="w-4 h-4" />
                    <span>Time</span>
                  </div>
                  <div className="text-white">{ticket.time}</div>
                </div>
                <div>
                  <div className="flex items-center gap-2 text-gray-400">
                    <MapPin className="w-4 h-4" />
                    <span>Location</span>
                  </div>
                  <div className="text-white">{ticket.location}</div>
                </div>
                <div>
                  <div className="flex items-center gap-2 text-gray-400">
                    <User className="w-4 h-4" />
                    <span>Seat</span>
                  </div>
                  <div className="text-white">{ticket.seat}</div>
                </div>
              </div>
              <div className="ticket-footer border-t border-gray-700 pt-4 mt-4">
                <div className="text-gray-400 mb-2">Perks</div>
                <div className="flex gap-2 flex-wrap">
                  {ticket.perks.map((perk, i) => (
                    <span key={i} className="perk px-2 py-1 bg-gray-700 rounded-full text-sm text-white">
                      {perk}
                    </span>
                  ))}
                </div>
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default ModernTicketListing;