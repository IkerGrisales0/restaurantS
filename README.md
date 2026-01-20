 # Sistema de Reservas de Restaurantes

## 🏗️ Arquitectura del Proyecto

Este proyecto utiliza **Screaming Architecture**, que significa que la estructura de carpetas refleja las funcionalidades de la aplicación, no los tipos de archivos.

Ver [SCREAMING_ARCHITECTURE.md](./SCREAMING_ARCHITECTURE.md) para una guía completa de la estructura.

**Características principales:**
- `features/authentication/` - Autenticación y registro
- `features/restaurant-discovery/` - Búsqueda y filtrados de restaurantes
- `features/restaurant-detail/` - Detalles de restaurante y reservas
- `features/restaurant-setup/` - Configuración de restaurantes por administradores
- `features/shared/` - Componentes compartidos (Navbar, Hero, etc.)
- `features/common/` - Utilidades comunes (Modal, datos, etc.)

---

## Requerimientos

## # Sistema de Reservas de Restaurantes - Requerimientos

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
  
