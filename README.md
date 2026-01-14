# Plataforma de Reservas de Restaurantes

Una aplicación moderna de reservas de restaurantes construida con **React + Vite + TypeScript**.

## 📁 Estructura del Proyecto

```
/src/
  ├── app/
  │   ├── data/
  │   │   └── restaurants.ts          # Base de datos de restaurantes
  │   ├── components/
  │   │   ├── Navbar.tsx              # Barra de navegación superior
  │   │   ├── HeroSection.tsx         # Sección principal con búsqueda
  │   │   ├── Features.tsx            # Características destacadas
  │   │   ├── FilterBar.tsx           # Barra de filtros
  │   │   ├── FilterPanel.tsx         # Panel de filtros avanzados
  │   │   ├── RestaurantGrid.tsx      # Grid de restaurantes
  │   │   ├── RestaurantCard.tsx      # Tarjeta individual de restaurante
  │   │   ├── RestaurantDetail.tsx    # Vista detallada del restaurante
  │   │   ├── BookingModal.tsx        # Modal de reserva
  │   │   ├── Login.tsx               # Página de login
  │   │   └── Register.tsx            # Página de registro
  │   └── App.tsx                     # Componente principal
  └── styles/
      ├── global.css                  # Estilos globales base
      ├── theme.css                   # Variables CSS y tema
      ├── navbar.css
      ├── hero.css
      ├── features.css
      ├── filter-bar.css
      ├── filter-panel.css
      ├── restaurant-grid.css
      ├── restaurant-card.css
      ├── restaurant-detail.css
      ├── modal.css
      └── auth.css

/public/images/restaurants/           # Carpeta para imágenes
  ├── trattoria/
  │   ├── main.jpg                   # Imagen principal
  │   ├── 1.jpg                      # Imagen galería 1
  │   ├── 2.jpg                      # Imagen galería 2
  │   ├── 3.jpg                      # Imagen galería 3
  │   ├── 4.jpg                      # Imagen galería 4
  │   └── 5.jpg                      # Imagen galería 5
  ├── sakura/
  ├── mexicano/
  ├── prime/
  ├── green/
  └── bistrot/
```

## 🎨 Características

- ✅ **React 18** con Vite
- ✅ **TypeScript** completo
- ✅ **CSS tradicional** (sin Tailwind - por petición expresa)
- ✅ **Variables simples y básicas**
- ✅ **Diseño limpio y moderno**
- ✅ **Responsive design**
- ✅ **Sistema de filtros avanzado**
- ✅ **Búsqueda en tiempo real**
- ✅ **Modal de reservas con horarios alternativos**
- ✅ **Vista detallada de restaurantes (página completa, no modal)**
- ✅ **Galería de imágenes con navegación**
- ✅ **Completamente en español**

## 🖼️ Cómo Agregar Imágenes

### 1. Crear carpeta para el restaurante:
- Ve a `/public/images/restaurants/`
- Crea una carpeta con el nombre del restaurante (sin espacios, minúsculas)
- Ejemplo: `trattoria`, `sakura`, `mexicano`

### 2. Agregar imágenes:
Coloca 6 imágenes en la carpeta:
- `main.jpg` - Imagen principal (se muestra en la tarjeta del grid)
- `1.jpg` a `5.jpg` - Galería de imágenes (se ven en el detalle)

### 3. Formatos recomendados:
- Formato: JPG o PNG
- Tamaño recomendado: 1080x720px
- Peso: menos de 500KB por imagen

## 📝 Cómo Agregar un Nuevo Restaurante

Edita el archivo `/src/app/data/restaurants.ts`:

```typescript
{
  id: "7",                                    // ID único
  name: "Nombre del Restaurante",            // Nombre
  cuisine: "Tipo de Cocina",                 // Italiana, Japonesa, etc.
  city: "Ciudad",                            // Madrid, Barcelona, etc.
  address: "Dirección completa",             // Dirección
  price: 3,                                  // 1-4 ($ a $$$$)
  mainImage: "/images/restaurants/carpeta/main.jpg",
  images: [
    "/images/restaurants/carpeta/1.jpg",
    "/images/restaurants/carpeta/2.jpg",
    "/images/restaurants/carpeta/3.jpg",
    "/images/restaurants/carpeta/4.jpg",
    "/images/restaurants/carpeta/5.jpg"
  ],
  description: "Descripción del restaurante",
  hours: {
    "Lunes-Viernes": "13:00 - 16:00, 20:00 - 23:00",
    "Sábado-Domingo": "13:00 - 00:00"
  },
  amenities: {
    terrace: true,      // ¿Tiene terraza?
    wifi: true,         // ¿Tiene WiFi?
    petFriendly: false  // ¿Acepta mascotas?
  }
}
```

## 🎯 Variables Principales

### En `restaurants.ts`:
- `restaurants` - Lista de todos los restaurantes
- `price` - Rango de precio (1-4)
- `amenities` - Comodidades del restaurante

### En `App.tsx`:
- `currentPage` - Página actual ('home' | 'login' | 'register' | 'restaurant')
- `search` - Texto de búsqueda
- `filters` - Filtros activos (precio, comodidades)
- `selectedRestaurant` - Restaurante seleccionado
- `showBooking` - Mostrar modal de reserva

### En componentes:
- `restaurant` - Datos del restaurante
- `onClick` - Acción al hacer clic
- `onClose` - Acción al cerrar
- `onConfirm` - Acción al confirmar

## 🚀 Navegación de la App

1. **Página Home**: Hero + Features + Filtros + Grid de restaurantes
2. **Página Restaurant**: Vista completa del restaurante (NO modal)
3. **Click en tarjeta**: Navega a la página del restaurante
4. **Click en logo**: Vuelve al home
5. **Botón X en detalle**: Vuelve al home

## 💡 Consejos

- Usa nombres de carpetas simples para las imágenes (sin espacios, todo minúsculas)
- Las rutas de imágenes siempre empiezan con `/images/restaurants/`
- Para agregar un nuevo tipo de cocina, solo agrégalo en un nuevo restaurante
- Los filtros se actualizan automáticamente según los restaurantes disponibles
- No uses Tailwind - todo está en CSS tradicional
- Variables con nombres básicos y simples

## 📚 Tecnologías

- **Vite** - Build tool rápido
- **React 18** - Library UI
- **TypeScript** - Tipado estático
- **Lucide React** - Iconos modernos
- **CSS puro** - Sin frameworks de CSS

---

✨ **Plataforma completamente funcional y lista para usar**
