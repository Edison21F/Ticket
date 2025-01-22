'use client';

import React, { useState } from 'react';
import './usuarios.css'; // Importamos el archivo de estilo global

// Definimos la interfaz para el tipo de usuario
interface Usuario {
  nombre: string;
  email: string;
  fechaRegistro: string;
  estado: string;
  rol: string;
  imagen: string;
}

const UsuariosPage: React.FC = () => {
  const [searchTerm, setSearchTerm] = useState(''); // Estado para almacenar el término de búsqueda
  const [usuarios, setUsuarios] = useState<Usuario[]>([
    {
      nombre: 'Juan Pérez',
      email: 'juan.perez@example.com',
      fechaRegistro: '01/01/2025',
      estado: 'Activo',
      rol: 'Administrador',
      imagen: 'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQUcNdEFR29DXre9LTLKm6c4tVsc8hODLXlYg&s',
    },
    {
      nombre: 'María López',
      email: 'maria.lopez@example.com',
      fechaRegistro: '15/02/2025',
      estado: 'Inactivo',
      rol: 'Usuario',
      imagen: 'https://vivolabs.es/wp-content/uploads/2022/03/perfil-mujer-vivo.png',
    },
    {
      nombre: 'Juan Pérez',
      email: 'juan.perez@example.com',
      fechaRegistro: '01/01/2025',
      estado: 'Activo',
      rol: 'Administrador',
      imagen: 'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQUcNdEFR29DXre9LTLKm6c4tVsc8hODLXlYg&s',
    },
    {
      nombre: 'María López',
      email: 'maria.lopez@example.com',
      fechaRegistro: '15/02/2025',
      estado: 'Inactivo',
      rol: 'Usuario',
      imagen: 'https://vivolabs.es/wp-content/uploads/2022/03/perfil-mujer-vivo.png',
    },
    {
      nombre: 'Juan Pérez',
      email: 'juan.perez@example.com',
      fechaRegistro: '01/01/2025',
      estado: 'Activo',
      rol: 'Administrador',
      imagen: 'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQUcNdEFR29DXre9LTLKm6c4tVsc8hODLXlYg&s',
    },
    {
      nombre: 'María López',
      email: 'maria.lopez@example.com',
      fechaRegistro: '15/02/2025',
      estado: 'Inactivo',
      rol: 'Usuario',
      imagen: 'https://vivolabs.es/wp-content/uploads/2022/03/perfil-mujer-vivo.png',
    },
    // ... otros usuarios
  ]);

  const [editingUser , setEditingUser ] = useState<Usuario | null>(null); // Estado para controlar si un usuario está siendo editado
  const [editedData, setEditedData] = useState<Omit<Usuario, 'imagen' | 'fechaRegistro'> | null>(null); // Omitimos campos no editables

  // Filtramos los usuarios por nombre en función del término de búsqueda
  const filteredUsers = usuarios.filter(usuario =>
    usuario.nombre.toLowerCase().includes(searchTerm.toLowerCase())
  );

  // Función para editar un usuario
  const handleEdit = (usuario: Usuario) => {
    setEditingUser (usuario);
    setEditedData({ nombre: usuario.nombre, email: usuario.email, estado: usuario.estado, rol: usuario.rol });
  };

  // Función para guardar los cambios de edición
  const handleSaveEdit = () => {
    if (editedData && editingUser ) {
      setUsuarios(usuarios.map(user =>
        user === editingUser  ? { ...user, ...editedData } : user
      ));
      setEditingUser (null); // Cerrar la tarjeta de edición
    }
  };

  // Función para eliminar un usuario
  const handleDelete = (usuario: Usuario) => {
    setUsuarios(usuarios.filter(user => user !== usuario));
  };

  return (
    <div className="container">
      <h1 className="header">Gestión de Usuarios</h1>
      <div className="searchContainer">
        <input
          type="text"
          placeholder="Buscar por nombre..."
          value={searchTerm}
          onChange={(e) => setSearchTerm(e.target.value)}
          className="searchInput"
        />
      </div>

      {/* Tarjeta de edición flotante */}
      {editingUser  && (
        <div className="editCard">
          <h2>Editar Usuario</h2>
          <label>
            Nombre:
            <input 
              type="text" 
              value={editedData?.nombre} 
              onChange={(e) => setEditedData({ ...editedData!, nombre: e.target.value })} 
            />
          </label>
          <label>
            Email:
            <input 
              type="email" 
              value={editedData?.email} 
              onChange={(e) => setEditedData({ ...editedData!, email: e.target.value })} 
            />
          </label>
          <label>
            Estado:
            <input 
              type="text" 
              value={editedData?.estado} 
              onChange={(e) => setEditedData({ ...editedData!, estado: e.target.value })} 
            />
          </label>
          <label>
            Rol:
            <input 
              type="text" 
              value={editedData?.rol} 
              onChange={(e) => setEditedData({ ...editedData!, rol: e.target.value })} 
            />
          </label>
          <div className="editCardButtons">
            <button onClick={handleSaveEdit}>Guardar Cambios</button>
            <button onClick={() => setEditingUser (null)}>Cancelar</button>
          </div>
        </div>
      )}

      <div className="cardContainer">
        {filteredUsers.map((usuario, index) => (
          <div key={index} className="card">
            <div className="cardInner">
              {/* Parte delantera */}
              <div className="cardFront">
                <div className="cardTitle">{usuario.nombre}</div>
                <img
                  src={usuario.imagen}
                  alt={`${usuario.nombre}`}
                  className="image"
                />
                <div className="cardContent">
                  <p>
                    <strong>Correo:</strong> {usuario.email}
                  </p>
                  <p>
                    <strong>Fecha de Registro:</strong> {usuario.fechaRegistro}
                  </p>
                  <p>
                    <strong>Estado:</strong> {usuario.estado}
                  </p>
                  <p>
                    <strong>Rol:</strong> {usuario.rol}
                  </p>
                </div>
              </div>

              {/* Parte trasera */}
              <div className="cardBack">
                <div className="cardTitle">Acciones</div>
                <div className="buttonContainer">
                  <button className="editButton" onClick={() => handleEdit(usuario)}>Editar</button>
                  <button className="deleteButton" onClick={() => handleDelete(usuario)}>Eliminar</button>
                </div>
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default UsuariosPage;