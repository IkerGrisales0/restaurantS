export interface Restaurant {
  id: string
  name: string
  cuisine: string
  city: string
  address: string
  price: number
  mainImage: string
  images: string[]
  description: string
  hours: {
    [key: string]: string
  }
  amenities: {
    terrace: boolean
    wifi: boolean
    petFriendly: boolean
  }
}

export const restaurants: Restaurant[] = [
  {
    id: "1",
    name: "La Trattoria",
    cuisine: "Italiana",
    city: "Madrid",
    address: "Calle Mayor 45, Madrid",
    price: 3,
    mainImage: "/images/restaurants/trattoria/main.jpg",
    images: [
      "/images/restaurants/trattoria/1.jpg",
      "/images/restaurants/trattoria/2.jpg",
      "/images/restaurants/trattoria/3.jpg",
      "/images/restaurants/trattoria/4.jpg",
      "/images/restaurants/trattoria/5.jpg"
    ],
    description: "Auténtica cocina italiana con recetas tradicionales de la Toscana. Pasta fresca hecha a mano y pizzas al horno de leña.",
    hours: {
      "Lunes-Viernes": "13:00 - 16:00, 20:00 - 23:30",
      "Sábado-Domingo": "13:00 - 00:00"
    },
    amenities: {
      terrace: true,
      wifi: true,
      petFriendly: false
    }
  },
  {
    id: "2",
    name: "Sakura Sushi Bar",
    cuisine: "Japonesa",
    city: "Barcelona",
    address: "Passeig de Gràcia 88, Barcelona",
    price: 4,
    mainImage: "/images/restaurants/sakura/main.jpg",
    images: [
      "/images/restaurants/sakura/1.jpg",
      "/images/restaurants/sakura/2.jpg",
      "/images/restaurants/sakura/3.jpg",
      "/images/restaurants/sakura/4.jpg",
      "/images/restaurants/sakura/5.jpg"
    ],
    description: "Experiencia gastronómica japonesa de alta gama. Sushi fresco elaborado por chefs certificados en Tokio.",
    hours: {
      "Lunes-Jueves": "19:00 - 23:00",
      "Viernes-Domingo": "13:00 - 16:00, 19:00 - 00:00"
    },
    amenities: {
      terrace: false,
      wifi: true,
      petFriendly: false
    }
  },
  {
    id: "3",
    name: "El Mexicano Loco",
    cuisine: "Mexicana",
    city: "Valencia",
    address: "Calle Colón 12, Valencia",
    price: 2,
    mainImage: "/images/restaurants/mexicano/main.jpg",
    images: [
      "/images/restaurants/mexicano/1.jpg",
      "/images/restaurants/mexicano/2.jpg",
      "/images/restaurants/mexicano/3.jpg",
      "/images/restaurants/mexicano/4.jpg",
      "/images/restaurants/mexicano/5.jpg"
    ],
    description: "Sabores auténticos de México con un toque moderno. Tacos, burritos y margaritas en un ambiente festivo.",
    hours: {
      "Todos los días": "12:00 - 01:00"
    },
    amenities: {
      terrace: true,
      wifi: true,
      petFriendly: true
    }
  },
  {
    id: "4",
    name: "Prime Steakhouse",
    cuisine: "Asador",
    city: "Madrid",
    address: "Calle Serrano 92, Madrid",
    price: 4,
    mainImage: "/images/restaurants/prime/main.jpg",
    images: [
      "/images/restaurants/prime/1.jpg",
      "/images/restaurants/prime/2.jpg",
      "/images/restaurants/prime/3.jpg",
      "/images/restaurants/prime/4.jpg",
      "/images/restaurants/prime/5.jpg"
    ],
    description: "Los mejores cortes de carne madurada en un ambiente elegante y sofisticado. Bodega premium.",
    hours: {
      "Martes-Domingo": "13:00 - 16:00, 20:30 - 23:30",
      "Lunes": "Cerrado"
    },
    amenities: {
      terrace: false,
      wifi: true,
      petFriendly: false
    }
  },
  {
    id: "5",
    name: "Green Garden Café",
    cuisine: "Vegetariana",
    city: "Barcelona",
    address: "Carrer del Rec 15, Barcelona",
    price: 2,
    mainImage: "/images/restaurants/green/main.jpg",
    images: [
      "/images/restaurants/green/1.jpg",
      "/images/restaurants/green/2.jpg",
      "/images/restaurants/green/3.jpg",
      "/images/restaurants/green/4.jpg",
      "/images/restaurants/green/5.jpg"
    ],
    description: "Comida saludable 100% vegana y vegetariana. Ingredientes orgánicos y de temporada en un espacio acogedor.",
    hours: {
      "Todos los días": "09:00 - 22:00"
    },
    amenities: {
      terrace: true,
      wifi: true,
      petFriendly: true
    }
  },
  {
    id: "6",
    name: "Le Petit Bistrot",
    cuisine: "Francesa",
    city: "Madrid",
    address: "Plaza de las Cortes 8, Madrid",
    price: 3,
    mainImage: "/images/restaurants/bistrot/main.jpg",
    images: [
      "/images/restaurants/bistrot/1.jpg",
      "/images/restaurants/bistrot/2.jpg",
      "/images/restaurants/bistrot/3.jpg",
      "/images/restaurants/bistrot/4.jpg",
      "/images/restaurants/bistrot/5.jpg"
    ],
    description: "Cocina francesa clásica con el encanto de un bistró parisino. Especialidad en quesos y vinos franceses.",
    hours: {
      "Lunes-Sábado": "13:00 - 16:00, 20:00 - 23:00",
      "Domingo": "13:00 - 16:00"
    },
    amenities: {
      terrace: true,
      wifi: false,
      petFriendly: true
    }
  }
]
