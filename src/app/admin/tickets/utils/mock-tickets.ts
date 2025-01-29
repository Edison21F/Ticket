export interface Ticket {
    id: string
    type: "cinema" | "concert" | "transport"
    eventName: string
    date: string
    time: string
    location: string
    section?: string
    seat: {
      theater?: string
      row?: string
      number: string
    }
    image: string | null
    purchaseDate: string
  }
  
  export const mockTickets: Ticket[] = [
    {
      id: "T001",
      type: "cinema",
      eventName: "Inception",
      date: "2024-02-15",
      time: "19:30",
      location: "Cineplex Central",
      seat: {
        theater: "2",
        row: "F",
        number: "12",
      },
      image: "/img/spider-man.jpg",
      purchaseDate: "2024-01-28",
    },
    {
      id: "T002",
      type: "concert",
      eventName: "Rock Festival 2024",
      date: "2024-03-20",
      time: "20:00",
      location: "Stadium Arena",
      section: "VIP",
      seat: {
        number: "A45",
      },
      image: "/img/bad.bunny.jpg",
      purchaseDate: "2024-01-27",
    },
    {
      id: "T003",
      type: "transport",
      eventName: "Vuelo AA123",
      date: "2024-02-10",
      time: "10:15",
      location: "Aeropuerto Internacional",
      section: "Business",
      seat: {
        number: "14A",
      },
      image: "/img/metro.webp",
      purchaseDate: "2024-01-26",
    },
    // Add more mock tickets as needed
  ]
  
  