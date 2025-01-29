import React from 'react';
import './style.css'; // Asegúrate de que esta ruta sea la correcta

const Dashboard: React.FC = () => {
  return (
    <div className="main-content">
      {/* Tarjetas de la Parte Superior */}
      <div className="dashboard-header">
    <div className="dashboard-card card-1 group">
        <h3>Número de Usuarios</h3>
        <p>1,291,922</p>
        <a href="/admin/usuarios" className="view-detail">View Detail ▶</a>
        <img className="icon-hover" src="https://cdn-icons-png.flaticon.com/512/5828/5828807.png" alt="Icono 1" />
    </div>
    <div className="dashboard-card card-2 group">
        <h3>Eventos Creados</h3>
        <p>3,291,922</p>
        <a href="/admin/eventos" className="view-detail">View Detail ▶</a>
        <img className="icon-hover" src="https://cdn-icons-png.freepik.com/512/10386/10386037.png" alt="Icono 2" />
    </div>
    <div className="dashboard-card card-3 group">
        <h3>Tickets Disponibles</h3>
        <p>20.44%</p>
        <a href="#" className="view-detail">View Detail ▶</a>
        <img className="icon-hover" src="https://cdn-icons-png.flaticon.com/256/17300/17300802.png" alt="Icono 3" />
    </div>
    <div className="dashboard-card card-4 group">
        <h3>Ventas Realizadas</h3>
        <p>$3,650.65</p>
        <a href="#" className="view-detail">View Detail ▶</a>
        <img className="icon-hover" src="https://cdn-icons-png.freepik.com/512/10103/10103336.png" alt="Icono 4" />
    </div>
</div>

      {/* FINDE DE LAS TARJETAS DE LA PARTE SUPERIROR */}

      {/* INICIO DE LAS TARJETAS DE WELCOME-SECTION */}
      <div className="welcome-section">
        <h2>¡Hola, Administrador!</h2>
        <p>
          Explora los eventos más destacados y esperados de esta temporada. Han
          conquistado a miles de usuarios gracias a su impecable organización,
          contenido excepcional y experiencias inolvidables que no querrás perderte.
        </p>
      </div>
      
      <div className="events-section">
        <h2>Eventos a destacar</h2>
        <div className="product-container">
          <div className="product-item">
            <div className="product-image">
              <img
                src="https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcRMuPz1zW7xkikdAxWK1p3X_KHGIplY9vYcUw&s"
                alt="Spiderman"
              />
              <span className="status">INSTOCK</span>
            </div>
            <div className="product-info">
              <h3>Spiderman No Way Home</h3>
              <div className="product-actions">
                <button className="buy-now">Buy Now</button>
                <button className="wishlist">♥</button>
              </div>
            </div>
          </div>
          
          <div className="separator"></div>
          <div className="product-item">
            <div className="product-image">
              <img
                src="https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcRMuPz1zW7xkikdAxWK1p3X_KHGIplY9vYcUw&s"
                alt="Spiderman"
              />
              <span className="status">INSTOCK</span>
            </div>
            <div className="product-info">
              <h3>Spiderman No Way Home</h3>
              <div className="product-actions">
                <button className="buy-now">Buy Now</button>
                <button className="wishlist">♥</button>
              </div>
            </div>
          </div>
          <div className="product-item">
            <div className="product-image">
              <img
                src="https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcRMuPz1zW7xkikdAxWK1p3X_KHGIplY9vYcUw&s"
                alt="Spiderman"
              />
              <span className="status">INSTOCK</span>
            </div>
            <div className="product-info">
              <h3>Spiderman No Way Home</h3>
              <div className="product-actions">
                <button className="buy-now">Buy Now</button>
                <button className="wishlist">♥</button>
              </div>
            </div>
          </div>
        </div>
      </div>
      {/* FIN DE LAS TARJETAS DE WELCOME-SECTION */}

      {/* Tarjetas Pequeñas debajo de la Tarjeta Grande */}
      <div className="modern-cards">
        {/* Tarjeta 1 */}
        <div className="modern-card">
          <div className="modern-card-header">
            <span>Eventos más Vendidos</span>
            <div className="modern-icons">
              <i className="fas fa-heart"></i>
              <i className="fas fa-share"></i>
            </div>
          </div>
          <div className="modern-card-content">
            <div className="event-background">🎟️Cine: Spider-Man: No Way Home</div>
            <p>
              Descubre los eventos más populares y demandados de esta temporada!
              Estos eventos han cautivado a miles de usuarios y se han destacado
              por su excelente organización, contenido de calidad y experiencias
              únicas.
            </p>
            <button className="modern-card-button">Ver Lista</button>
          </div>
          <div className="modern-card-footer">
            <p>Cantidad de eventos vendidos</p>
            <p>120 Vendidos</p>
          </div>
        </div>

        {/* Tarjeta 2 */}
        <div className="modern-card">
          <div className="modern-card-header">
            <span>Gestionar los Usuarios</span>
            <div className="modern-icons">
              <i className="fas fa-heart"></i>
              <i className="fas fa-share"></i>
            </div>
          </div>
          <div className="modern-card-content">
            <img
              src="https://cdn-icons-png.flaticon.com/512/14427/14427123.png"
              alt="Card Image"
              className="modern-card-image"
            />
            <button className="modern-card-button">Ver Lista</button>
          </div>
          <div className="modern-card-footer">
            <p>Gestionar los Usuarios</p>
            <p>250 Usuarios Activos</p>
          </div>
        </div>

        {/* Tarjeta 3 */}
        <div className="modern-card">
          <div className="modern-card-header">
            <span>Gestionar servicios</span>
            <div className="modern-icons">
              <i className="fas fa-heart"></i>
              <i className="fas fa-share"></i>
            </div>
          </div>
          <div className="modern-card-content">
            <img
              src="https://cdn-icons-png.freepik.com/512/5474/5474438.png"
              alt="Card Image"
              className="modern-card-image"
            />
            <button className="modern-card-button">Ver servicios</button>
          </div>
          <div className="modern-card-footer">
            <p>Gestionar Servicios</p>
            <p>35 Servicios Activos</p>
          </div>
        </div>
      </div>
    </div>
  );
};

// Página asíncrona con exportación predeterminada
export default async function Page() {
  return (
    <div>
      <Dashboard />
    </div>
  );
}
