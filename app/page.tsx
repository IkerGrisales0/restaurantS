'use client'

import { useState, useMemo } from "react"
import { Navbar } from "@/components/Navbar"
import { HeroSection } from "@/components/HeroSection"
import { Features } from "@/components/Features"
import { FilterBar } from "@/components/FilterBar"
import { RestaurantGrid } from "@/components/RestaurantGrid"
import { RestaurantDetail } from "@/components/RestaurantDetail"
import { BookingModal, type BookingData } from "@/components/BookingModal"
import { Login } from "@/components/Login"
import { Register } from "@/components/Register"
import type { Filters } from "@/components/FilterPanel"
import { restaurants, type Restaurant } from "@/data/restaurants"
import { Footer } from "@/components/Footer"

type CurrentPage = 'home' | 'login' | 'register'

export default function Home() {
  const [currentPage, setCurrentPage] = useState<CurrentPage>('home')
  const [search, setSearch] = useState("")
  const [selectedRestaurant, setSelectedRestaurant] = useState<Restaurant | null>(null)
  const [showBooking, setShowBooking] = useState(false)
  const [filters, setFilters] = useState<Filters>({
    price: [1, 4],
    cuisine: null,
    amenities: {
      terrace: false,
      wifi: false,
      petFriendly: false
    }
  })

  const cuisines = useMemo(() => {
    return Array.from(new Set(restaurants.map(r => r.cuisine))).sort()
  }, [])

  const filteredRestaurants = useMemo(() => {
    let results = [...restaurants]

    if (search) {
      const query = search.toLowerCase()
      results = results.filter(
        (r) =>
          r.name.toLowerCase().includes(query) ||
          r.cuisine.toLowerCase().includes(query) ||
          r.city.toLowerCase().includes(query) ||
          r.description.toLowerCase().includes(query)
      )
    }

    results = results.filter(
      (r) => r.price >= filters.price[0] && r.price <= filters.price[1]
    )

    if (filters.cuisine) {
      results = results.filter((r) => r.cuisine === filters.cuisine)
    }

    if (filters.amenities.terrace) {
      results = results.filter((r) => r.amenities.terrace)
    }
    if (filters.amenities.wifi) {
      results = results.filter((r) => r.amenities.wifi)
    }
    if (filters.amenities.petFriendly) {
      results = results.filter((r) => r.amenities.petFriendly)
    }

    return results
  }, [search, filters])

  const handleBookingConfirm = (booking: BookingData) => {
    alert(
      `¡Reserva confirmada! 🎉\n\nRestaurante: ${selectedRestaurant?.name}\nFecha: ${booking.date}\nHora: ${booking.time}\nPersonas: ${booking.guests}\n\nRecibirás un email de confirmación.`
    )
    setShowBooking(false)
    // Ya no cerramos el restaurante, nos quedamos en el detalle
  }

  // Renderizar página de login
  if (currentPage === 'login') {
    return (
      <Login
        onSwitchToRegister={() => setCurrentPage('register')}
        onBackToHome={() => setCurrentPage('home')}
      />
    )
  }

  // Renderizar página de registro
  if (currentPage === 'register') {
    return (
      <Register
        onSwitchToLogin={() => setCurrentPage('login')}
        onBackToHome={() => setCurrentPage('home')}
      />
    )
  }

  // Renderizar página principal (home)
  return (
    <>
      <Navbar
        onLoginClick={() => setCurrentPage('login')}
        onRegisterClick={() => setCurrentPage('register')}
      />
      <HeroSection onSearch={setSearch} />
      <Features />
      <FilterBar filters={filters} onChange={setFilters} cuisines={cuisines} />
      <RestaurantGrid
        restaurants={filteredRestaurants}
        onRestaurantClick={setSelectedRestaurant}
      />

      {selectedRestaurant && !showBooking && (
        <RestaurantDetail
          restaurant={selectedRestaurant}
          onClose={() => setSelectedRestaurant(null)}
          onReserve={() => setShowBooking(true)}
        />
      )}

      {selectedRestaurant && showBooking && (
        <BookingModal
          restaurant={selectedRestaurant}
          onClose={() => setShowBooking(false)}
          onConfirm={handleBookingConfirm}
        />
      )}

      <Footer />
    </>
  )
}