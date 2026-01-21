import { useState, useEffect } from "react";
import { 
  Store, 
  Calendar, 
  Clock, 
  MapPin, 
  Phone, 
  Mail, 
  Edit, 
  Users,
  CheckCircle,
  XCircle,
  AlertCircle,
  Menu,
  TrendingUp,
  DollarSign,
  Settings,
  LogOut
} from "lucide-react";
import Swal from "sweetalert2";
import { restaurantApi } from "../../services/api";
import "./restaurant-dashboard.css";

interface Restaurant {
  id: string;
  name: string;
  description: string;
  address: string;
  phone: string;
  email: string;
  image_url: string;
  opening_time: string;
  closing_time: string;
  cuisine_type: string;
  average_price: number;
  created_at: string;
}

interface Booking {
  id: string;
  date: string;
  time: string;
  guests: number;
  status: 'pending' | 'confirmed' | 'cancelled';
  special_requests?: string;
  user_id: string;
  customer_name?: string;
  customer_phone?: string;
  created_at: string;
}

interface RestaurantDashboardProps {
  onLogout: () => void;
}

export function RestaurantDashboard({ onLogout }: RestaurantDashboardProps) {
  const [restaurant, setRestaurant] = useState<Restaurant | null>(null);
  const [bookings, setBookings] = useState<Booking[]>([]);
  const [loading, setLoading] = useState(true);
  const [activeTab, setActiveTab] = useState<'bookings' | 'menu' | 'stats' | 'settings'>('bookings');
  const [sidebarOpen, setSidebarOpen] = useState(true);
  const [isEditing, setIsEditing] = useState(false);
  const [editForm, setEditForm] = useState<Restaurant | null>(null);

  useEffect(() => {
    loadRestaurantData();
  }, []);

  const loadRestaurantData = async () => {
    try {
      setLoading(true);
      const restaurantData = await restaurantApi.getMyRestaurant();
      setRestaurant(restaurantData);
      setBookings([]);
    } catch (error) {
      console.error('Error al cargar datos:', error);
      Swal.fire({
        title: "Error",
        text: "No se pudieron cargar los datos del restaurante",
        icon: "error",
      });
    } finally {
      setLoading(false);
    }
  };

  const handleConfirmBooking = async (bookingId: string) => {
    try {
      
      await Swal.fire({
        title: "Reserva confirmada",
        text: "El cliente recibirá una notificación",
        icon: "success",
        timer: 2000,
      });
      
      loadRestaurantData();
    } catch (error) {
      Swal.fire({
        title: "Error",
        text: "No se pudo confirmar la reserva",
        icon: "error",
      });
    }
  };

  const handleCancelBooking = async (bookingId: string) => {
    const result = await Swal.fire({
      title: "¿Cancelar reserva?",
      text: "Esta acción no se puede deshacer",
      icon: "warning",
      showCancelButton: true,
      confirmButtonText: "Sí, cancelar",
      cancelButtonText: "No",
      confirmButtonColor: "#ef4444",
    });

    if (result.isConfirmed) {
      try {
        
        await Swal.fire({
          title: "Reserva cancelada",
          icon: "success",
          timer: 2000,
        });
        
        loadRestaurantData();
      } catch (error) {
        Swal.fire({
          title: "Error",
          text: "No se pudo cancelar la reserva",
          icon: "error",
        });
      }
    }
  };

  const handleEditClick = () => {
    if (restaurant) {
      setEditForm({ ...restaurant });
      setIsEditing(true);
    }
  };

  const handleEditChange = (field: keyof Restaurant, value: any) => {
    if (editForm) {
      setEditForm({ ...editForm, [field]: value });
    }
  };

  const handleSaveEdit = async () => {
    if (!editForm || !restaurant) return;

    try {
      const token = localStorage.getItem("authToken");
      if (!token) {
        throw new Error("No hay sesión activa");
      }

      await restaurantApi.updateRestaurant(
        restaurant.id,
        {
          name: editForm.name,
          description: editForm.description,
          address: editForm.address,
          phone: editForm.phone,
          email: editForm.email,
          opening_time: editForm.opening_time,
          closing_time: editForm.closing_time,
          cuisine_type: editForm.cuisine_type,
          average_price: editForm.average_price,
        },
        token
      );

      await Swal.fire({
        title: "¡Actualizado!",
        text: "Los cambios se guardaron correctamente",
        icon: "success",
        timer: 2000,
      });

      setRestaurant(editForm);
      setIsEditing(false);
    } catch (error) {
      console.error("Error al actualizar:", error);
      Swal.fire({
        title: "Error",
        text: "No se pudo actualizar la información",
        icon: "error",
      });
    }
  };

  const handleCancelEdit = () => {
    setIsEditing(false);
    setEditForm(null);
  };

  if (loading) {
    return (
      <div className="dashboard-loading">
        <div className="loading-spinner"></div>
        <p>Cargando datos del restaurante...</p>
      </div>
    );
  }

  if (!restaurant) {
    return (
      <div className="dashboard-empty">
        <Store size={64} />
        <h2>No tienes un restaurante registrado</h2>
        <p>Completa el proceso de configuración para continuar</p>
      </div>
    );
  }

  const todayBookings = bookings.filter(b => b.status === 'pending').length;
  const totalClients = bookings.length;
  const monthlyRevenue = bookings
    .filter(b => b.status === 'confirmed')
    .reduce((sum, b) => sum + (b.guests * restaurant.average_price * 25), 0);

  return (
    <div className="dashboard-container">
      <aside className={`dashboard-sidebar ${sidebarOpen ? 'open' : 'closed'}`}>
        <div className="sidebar-header">
          <Store size={28} />
          {sidebarOpen && <h2>{restaurant.name}</h2>}
        </div>

        <nav className="sidebar-nav">
          <button
            className={`sidebar-item ${activeTab === 'bookings' ? 'active' : ''}`}
            onClick={() => setActiveTab('bookings')}
          >
            <Calendar size={20} />
            {sidebarOpen && <span>Reservas</span>}
          </button>
          <button
            className={`sidebar-item ${activeTab === 'menu' ? 'active' : ''}`}
            onClick={() => setActiveTab('menu')}
          >
            <Menu size={20} />
            {sidebarOpen && <span>Menú</span>}
          </button>
          <button
            className={`sidebar-item ${activeTab === 'stats' ? 'active' : ''}`}
            onClick={() => setActiveTab('stats')}
          >
            <TrendingUp size={20} />
            {sidebarOpen && <span>Estadísticas</span>}
          </button>
          <button
            className={`sidebar-item ${activeTab === 'settings' ? 'active' : ''}`}
            onClick={() => setActiveTab('settings')}
          >
            <Settings size={20} />
            {sidebarOpen && <span>Configuración</span>}
          </button>
        </nav>

        <div className="sidebar-footer">
          <button className="sidebar-item logout" onClick={onLogout}>
            <LogOut size={20} />
            {sidebarOpen && <span>Cerrar Sesión</span>}
          </button>
        </div>
      </aside>

      <main className="dashboard-main">
        <header className="dashboard-main-header">
          <h1>
            {activeTab === 'bookings' && 'Gestión de Reservas'}
            {activeTab === 'menu' && 'Gestión de Menú'}
            {activeTab === 'stats' && 'Estadísticas'}
            {activeTab === 'settings' && 'Configuración'}
          </h1>
          <button 
            className="toggle-sidebar"
            onClick={() => setSidebarOpen(!sidebarOpen)}
          >
            <Menu size={24} />
          </button>
        </header>

        <div className="stats-grid">
          <div className="stat-card">
            <div className="stat-icon reservas">
              <Calendar size={24} />
            </div>
            <div className="stat-content">
              <p className="stat-label">Reservas Hoy</p>
              <p className="stat-value">{todayBookings}</p>
            </div>
          </div>
        </div>

        <div className="dashboard-content-area">
          {activeTab === 'bookings' && (
            <div className="bookings-section">
              <div className="section-header">
                <h2>Lista de Reservas</h2>
              </div>

              {bookings.length === 0 ? (
                <div className="empty-state">
                  <Calendar size={64} />
                  <h3>No hay reservas</h3>
                  <p>Las reservas de tus clientes aparecerán aquí</p>
                </div>
              ) : (
                <div className="bookings-table">
                  <table>
                    <thead>
                      <tr>
                        <th>Fecha</th>
                        <th>Hora</th>
                        <th>Cliente</th>
                        <th>Personas</th>
                        <th>Estado</th>
                        <th>Acciones</th>
                      </tr>
                    </thead>
                    <tbody>
                      {bookings.map((booking) => (
                        <tr key={booking.id}>
                          <td>{new Date(booking.date).toLocaleDateString()}</td>
                          <td>{booking.time}</td>
                          <td>{booking.customer_name || 'Cliente'}</td>
                          <td>
                            <div className="guests-badge">
                              <Users size={14} />
                              {booking.guests}
                            </div>
                          </td>
                          <td>
                            <span className={`status-badge ${booking.status}`}>
                              {booking.status === 'pending' && 'Pendiente'}
                              {booking.status === 'confirmed' && 'Confirmada'}
                              {booking.status === 'cancelled' && 'Cancelada'}
                            </span>
                          </td>
                          <td>
                            {booking.status === 'pending' && (
                              <div className="action-buttons">
                                <button
                                  onClick={() => handleConfirmBooking(booking.id)}
                                  className="btn-action confirm"
                                  title="Confirmar"
                                >
                                  <CheckCircle size={16} />
                                </button>
                                <button
                                  onClick={() => handleCancelBooking(booking.id)}
                                  className="btn-action cancel"
                                  title="Rechazar"
                                >
                                  <XCircle size={16} />
                                </button>
                              </div>
                            )}
                          </td>
                        </tr>
                      ))}
                    </tbody>
                  </table>
                </div>
              )}
            </div>
          )}

          {activeTab === 'menu' && (
            <div className="menu-section">
              <div className="section-header">
                <h2>Gestión de Menú</h2>
                <button className="btn-primary">+ Agregar Platillo</button>
              </div>
              <div className="empty-state">
                <Menu size={64} />
                <h3>Próximamente</h3>
                <p>Podrás gestionar tu menú aquí</p>
              </div>
            </div>
          )}

          {activeTab === 'stats' && (
            <div className="stats-section">
              <div className="section-header">
                <h2>Información del Restaurante</h2>
              </div>
              <div className="stats-content">
                <div className="info-card">
                  <div className="info-grid">
                    <div className="info-row">
                      <MapPin size={18} />
                      <div>
                        <span className="info-label">Dirección</span>
                        <span className="info-value">{restaurant.address}</span>
                      </div>
                    </div>
                    <div className="info-row">
                      <Phone size={18} />
                      <div>
                        <span className="info-label">Teléfono</span>
                        <span className="info-value">{restaurant.phone}</span>
                      </div>
                    </div>
                    <div className="info-row">
                      <Mail size={18} />
                      <div>
                        <span className="info-label">Email</span>
                        <span className="info-value">{restaurant.email}</span>
                      </div>
                    </div>
                    <div className="info-row">
                      <Clock size={18} />
                      <div>
                        <span className="info-label">Horario</span>
                        <span className="info-value">
                          {restaurant.opening_time} - {restaurant.closing_time}
                        </span>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          )}

          {activeTab === 'settings' && (
            <div className="settings-section">
              <div className="section-header">
                <h2>Configuración</h2>
              </div>
              <div className="settings-content">
                <div className="setting-card">
                  <img 
                    src={restaurant.image_url} 
                    alt={restaurant.name}
                    className="restaurant-preview-image"
                    onError={(e) => {
                      (e.target as HTMLImageElement).src = 'https://images.unsplash.com/photo-1517248135467-4c7edcad34c4';
                    }}
                  />
                  <div className="setting-details">
                    <h3>{restaurant.name}</h3>
                    <p className="cuisine-badge">{restaurant.cuisine_type}</p>
                    <p className="description">{restaurant.description}</p>
                    <button className="btn-secondary" onClick={handleEditClick}>
                      <Edit size={16} />
                      Editar Información
                    </button>
                  </div>
                </div>
              </div>
            </div>
          )}
        </div>
      </main>

      {isEditing && editForm && (
        <div className="edit-modal-overlay" onClick={handleCancelEdit}>
          <div className="edit-modal" onClick={(e) => e.stopPropagation()}>
            <div className="edit-modal-header">
              <h2>Editar Información del Restaurante</h2>
              <button className="modal-close" onClick={handleCancelEdit}>
                <XCircle size={24} />
              </button>
            </div>
            
            <div className="edit-modal-body">
              <div className="edit-form-row">
                <div className="edit-form-group">
                  <label>Nombre</label>
                  <input
                    type="text"
                    value={editForm.name}
                    onChange={(e) => handleEditChange('name', e.target.value)}
                  />
                </div>

                <div className="edit-form-group">
                  <label>Tipo de Cocina</label>
                  <select
                    value={editForm.cuisine_type}
                    onChange={(e) => handleEditChange('cuisine_type', e.target.value)}
                  >
                    <option value="Italiana">Italiana</option>
                    <option value="Asiática">Asiática</option>
                    <option value="Española">Española</option>
                    <option value="Francesa">Francesa</option>
                    <option value="Americana">Americana</option>
                    <option value="Vegetariana">Vegetariana</option>
                    <option value="Fusión">Fusión</option>
                    <option value="Otro">Otro</option>
                  </select>
                </div>
              </div>

              <div className="edit-form-group">
                <label>Descripción</label>
                <textarea
                  rows={4}
                  value={editForm.description}
                  onChange={(e) => handleEditChange('description', e.target.value)}
                />
              </div>

              <div className="edit-form-group">
                <label>Dirección</label>
                <input
                  type="text"
                  value={editForm.address}
                  onChange={(e) => handleEditChange('address', e.target.value)}
                />
              </div>

              <div className="edit-form-row">
                <div className="edit-form-group">
                  <label>Teléfono</label>
                  <input
                    type="tel"
                    value={editForm.phone}
                    onChange={(e) => handleEditChange('phone', e.target.value)}
                  />
                </div>

                <div className="edit-form-group">
                  <label>Email</label>
                  <input
                    type="email"
                    value={editForm.email}
                    onChange={(e) => handleEditChange('email', e.target.value)}
                  />
                </div>
              </div>

              <div className="edit-form-row">
                <div className="edit-form-group">
                  <label>Hora Apertura</label>
                  <input
                    type="time"
                    value={editForm.opening_time}
                    onChange={(e) => handleEditChange('opening_time', e.target.value)}
                  />
                </div>

                <div className="edit-form-group">
                  <label>Hora Cierre</label>
                  <input
                    type="time"
                    value={editForm.closing_time}
                    onChange={(e) => handleEditChange('closing_time', e.target.value)}
                  />
                </div>
              </div>

              <div className="edit-form-group">
                <label>Precio Promedio (€)</label>
                <input
                  type="number"
                  value={editForm.average_price}
                  onChange={(e) => handleEditChange('average_price', parseFloat(e.target.value))}
                />
              </div>
            </div>

            <div className="edit-modal-footer">
              <button className="btn-secondary" onClick={handleCancelEdit}>
                Cancelar
              </button>
              <button className="btn-primary" onClick={handleSaveEdit}>
                <CheckCircle size={16} />
                Guardar Cambios
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
