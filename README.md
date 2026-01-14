 # Sistema de Reservas de Restaurantes - Requerimientos

## Perspectiva del Usuario

##  USUARIO CLIENTE

### 1. Búsqueda y Descubrimiento

*Como cliente quiero:*

- Poder buscar restaurantes por nombre, ubicación o tipo de comida
- Ver restaurantes disponibles cerca de mí
- Filtrar por precio, rating o características (terraza, wifi, etc.)


### 2.0 . Momento de hacer click- landing del restaurante
- Ver fotos del restaurante y ambiente


### 3. Proceso de Reserva

*Como cliente quiero:*
- Quiero ver un stepper
- Seleccionar fecha y hora para mi reserva
- Especificar número de personas
- Ver disponibilidad en tiempo real-nice to have
- Recibir sugerencias de horarios alternativos si mi primera opción no está disponible
- Poder hacer la reserva en menos de 2 minutos


### 4. Gestión de Mis Reservas

*Como cliente quiero:*

- Ver todas mis reservas futuras y pasadas
- Recibir recordatorio 24 horas antes de mi reserva
- Poder cancelar o modificar mi reserva fácilmente
- Recibir confirmación inmediata al hacer/modificar/cancelar


### 5. Experiencia Post-Visita-nice to have

*Como cliente quiero:*

- Poder calificar el restaurante y dejar comentarios
- Ver mi historial de restaurantes visitados
- Recibir ofertas especiales de mis restaurantes favoritos


## USUARIO RESTAURANTE

### 1. Gestión de Reservas

*Como restaurante quiero:*

- Ver todas las reservas del día en una vista clara
- Poder confirmar, rechazar o modificar reservas-notificar al usuario 
- Recibir notificaciones de nuevas reservas
- Hacer reservas manuales para clientes que llaman-nice to have


### 2. Configuración del Restaurante

*Como restaurante quiero:*

- Configurar horarios de apertura y cierre
- Definir capacidad máxima por turno-nice to have
- Establecer tiempos de duración de reservas
- Gestionar días festivos o cierres especiales


### 3. Panel de Control-nice to have

*Como restaurante quiero:*

- Ver métricas de ocupación y rendimiento-
- Analizar horarios más populares
- Gestionar información del perfil (menú, fotos, descripción)
  
estructura del proyecto
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
