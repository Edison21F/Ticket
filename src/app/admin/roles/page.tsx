'use client'
import React, { useState } from 'react';
import {
  Shield,
  Users,
  Plus,
  Edit2,
  Trash2,
  Search,
  UserPlus,
  Ticket,
  CreditCard,
  Calendar
} from 'lucide-react';

interface Role {
  id: number;
  name: string;
  users: number;
}

interface Permission {
  id: string;
  name: string;
}

interface PermissionGroupProps {
  title: string;
  icon: React.FC;
  permissions: Permission[];
  selectedPermissions: string[];
  onToggle: (permissionId: string) => void;
}

interface RoleCardProps {
  role: Role;
  isActive: boolean;
  onClick: () => void;
}

const RoleCard: React.FC<RoleCardProps> = ({ role, isActive, onClick }) => (
  <div
    onClick={onClick}
    className={`p-4 rounded-lg cursor-pointer transition-all duration-300 transform hover:scale-105 ${isActive
        ? 'bg-white text-gray-900 shadow-lg'
        : 'bg-gray-800 text-white hover:bg-gray-700'
      }`}
  >
    <div className="flex items-center justify-between">
      <div className="flex items-center gap-3">
        <Shield className={`w-5 h-5 ${isActive ? 'text-blue-600' : 'text-gray-400'}`} />
        <h3 className="font-semibold">{role.name}</h3>
      </div>
      <span className={`text-sm ${isActive ? 'text-gray-600' : 'text-gray-400'}`}>
        {role.users} usuarios
      </span>
    </div>
  </div>
);

const PermissionGroup: React.FC<PermissionGroupProps> = ({ title, permissions, selectedPermissions, onToggle }) => (
  <div className="bg-gray-800 rounded-lg p-4 mb-4 transition-transform transform hover:scale-105">
    <div className="flex items-center gap-2 mb-4">
      <i className="w-5 h-5 text-gray-400" />
      <h3 className="font-semibold text-white">{title}</h3>
    </div>
    <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
      {permissions.map(permission => (
        <label
          key={permission.id}
          className="flex items-center justify-between p-3 bg-gray-700 rounded-lg cursor-pointer hover:bg-gray-600 transition-colors"
        >
          <span className="text-gray-200">{permission.name}</span>
          <input
            type="checkbox"
            checked={selectedPermissions.includes(permission.id)}
            onChange={() => onToggle(permission.id)}
            className="w-4 h-4 accent-blue-500"
          />
        </label>
      ))}
    </div>
  </div>
);

const RolesManager: React.FC = () => {
  const [activeRole, setActiveRole] = useState<Role | null>(null);
  const [showNewRoleForm, setShowNewRoleForm] = useState(false);
  const [showAssignRole, setShowAssignRole] = useState(false);
  const [selectedPermissions, setSelectedPermissions] = useState<string[]>([]);
  const [searchUser, setSearchUser] = useState('');

  const roles: Role[] = [
    { id: 1, name: 'Administrador', users: 3 },
    { id: 2, name: 'Editor', users: 8 },
    { id: 3, name: 'Moderador', users: 5 },
    { id: 4, name: 'Visualizador', users: 12 }
  ];

  const permissionGroups = [
    {
      title: 'Usuarios',
      icon: Users,
      permissions: [
        { id: 'user_create', name: 'Crear usuarios' },
        { id: 'user_edit', name: 'Editar usuarios' },
        { id: 'user_delete', name: 'Eliminar usuarios' },
        { id: 'user_view', name: 'Ver usuarios' }
      ]
    },
    {
      title: 'Eventos',
      icon: Calendar,
      permissions: [
        { id: 'event_create', name: 'Crear eventos' },
        { id: 'event_edit', name: 'Editar eventos' },
        { id: 'event_delete', name: 'Eliminar eventos' },
        { id: 'event_view', name: 'Ver eventos' }
      ]
    },
    {
      title: 'Tickets',
      icon: Ticket,
      permissions: [
        { id: 'ticket_create', name: 'Crear tickets' },
        { id: 'ticket_edit', name: 'Editar tickets' },
        { id: 'ticket_delete', name: 'Eliminar tickets' },
        { id: 'ticket_view', name: 'Ver tickets' }
      ]
    },
    {
      title: 'Pagos',
      icon: CreditCard,
      permissions: [
        { id: 'payment_process', name: 'Procesar pagos' },
        { id: 'payment_refund', name: 'Realizar reembolsos' },
        { id: 'payment_view', name: 'Ver transacciones' },
        { id: 'payment_report', name: 'Generar reportes' }
      ]
    }
  ];

  const togglePermission = (permissionId: string) => {
    setSelectedPermissions(prev =>
      prev.includes(permissionId)
        ? prev.filter(id => id !== permissionId)
        : [...prev, permissionId]
    );
  };

  return (
    <div className="min-h-screen  p-8">
      <div className="flex-1">
        <div className="flex items-center justify-between mb-8">
          <div>
            <h1 className="text-3xl font-bold text-white mb-2">Gestión de Roles y Permisos</h1>
            <p className="text-gray-400">Administra los roles y permisos de los usuarios del sistema</p>
          </div>
          <div className="flex gap-3">
            <button
              onClick={() => setShowNewRoleForm(true)}
              className="bg-gradient-to-r from-cyan-500 to-purple-500 hover:from-cyan-600 hover:to-purple-600 text-white px-4 py-2 rounded-lg hover:opacity-90 transition-colors flex items-center gap-2"            >
              <Plus className="w-4 h-4" />
              Nuevo Rol
            </button>
            <button
              onClick={() => setShowAssignRole(true)}
              className="bg-gray-700 text-white px-4 py-2 rounded-lg hover:bg-gray-600 transition-colors flex items-center gap-2"
            >
              <UserPlus className="w-4 h-4" />
              Asignar Rol
            </button>
          </div>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          {/* Lista de Roles */}
          <div className="space-y-3">
            <div className="flex items-center justify-between mb-4">
              <h2 className="text-xl font-semibold text-white">Roles</h2>
              <span className="text-sm text-gray-400">{roles.length} roles</span>
            </div>
            {roles.map(role => (
              <RoleCard
                key={role.id}
                role={role}
                isActive={activeRole?.id === role.id}
                onClick={() => setActiveRole(role)}
              />
            ))}
          </div>

          {/* Permisos del Rol */}
          <div className="lg:col-span-2">
            {activeRole ? (
              <div className="bg-gray-800/50 backdrop-blur rounded-xl p-6">
                <div className="flex items-center justify-between mb-6">
                  <div className="flex items-center gap-3">
                    <Shield className="w-6 h-6 text-blue-500" />
                    <h2 className="text-xl font-semibold text-white">
                      Permisos de {activeRole.name}
                    </h2>
                  </div>
                  <div className="flex gap-2">
                    <button className="p-2 text-gray-400 hover:text-white transition-colors">
                      <Edit2 className="w-5 h-5" />
                    </button>
                    <button className="p-2 text-gray-400 hover:text-red-500 transition-colors">
                      <Trash2 className="w-5 h-5" />
                    </button>
                  </div>
                </div>

                {permissionGroups.map(group => (
                  <PermissionGroup
                    key={group.title}
                    {...group}
                    selectedPermissions={selectedPermissions}
                    onToggle={togglePermission}
                  />
                ))}

                <div className="flex justify-end gap-3 mt-6">
                  <button className="px-4 py-2 bg-gray-700 text-white rounded-lg hover:bg-gray-600 transition-colors">
                    Cancelar
                  </button>
                  <button className="px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors">
                    Guardar Cambios
                  </button>
                </div>
              </div>
            ) : (
              <div className="h-full flex items-center justify-center text-gray-500">
                Selecciona un rol para ver sus permisos
              </div>
            )}
          </div>
        </div>

        {/* Modal de Nuevo Rol */}
        {showNewRoleForm && (
          <div className="fixed inset-0 bg-black/50 backdrop-blur-sm flex items-center justify-center p-4">
            <div className="bg-gray-800 rounded-xl p-6 max-w-md w-full">
              <h3 className="text-xl font-semibold text-white mb-4">Crear Nuevo Rol</h3>
              <input
                type="text"
                placeholder="Nombre del rol"
                className="w-full p-3 bg-gray-700 rounded-lg text-white mb-4"
              />
              <div className="flex justify-end gap-3">
                <button
                  onClick={() => setShowNewRoleForm(false)}
                  className="px-4 py-2 bg-gray-700 text-white rounded-lg hover:bg-gray-600 transition-colors"
                >
                  Cancelar
                </button>
                <button className="px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors">
                  Crear Rol
                </button>
              </div>
            </div>
          </div>
        )}

        {/* Modal de Asignar Rol */}
        {showAssignRole && (
          <div className="fixed inset-0 bg-black/50 backdrop-blur-sm flex items-center justify-center p-4">
            <div className="bg-gray-800 rounded-xl p-6 max-w-xl w-full">
              <h3 className="text-xl font-semibold text-white mb-4">Asignar Rol a Usuario</h3>
              <div className="relative mb-4">
                <Search className="w-5 h-5 text-gray-400 absolute left-3 top-1/2 transform -translate-y-1/2" />
                <input
                  type="text"
                  placeholder="Buscar usuario..."
                  value={searchUser}
                  onChange={(e) => setSearchUser(e.target.value)}
                  className="w-full pl-10 p-3 bg-gray-700 rounded-lg text-white"
                />
              </div>
              <div className="max-h-64 overflow-y-auto mb-4">
                {/* Lista de usuarios */}
                {[1, 2, 3].map(user => (
                  <div key={user} className="flex items-center justify-between p-3 hover:bg-gray-700 rounded-lg">
                    <div className="flex items-center gap-3">
                      <div className="w-10 h-10 bg-gray-600 rounded-full" />
                      <div>
                        <h4 className="text-white font-medium">Usuario {user}</h4>
                        <p className="text-sm text-gray-400">usuario{user}@email.com</p>
                      </div>
                    </div>
                    <select className="bg-gray-700 text-white p-2 rounded-lg">
                      <option>Seleccionar rol</option>
                      {roles.map(role => (
                        <option key={role.id} value={role.id}>{role.name}</option>
                      ))}
                    </select>
                  </div>
                ))}
              </div>
              <div className="flex justify-end gap-3">
                <button
                  onClick={() => setShowAssignRole(false)}
                  className="px-4 py-2 bg-gray-700 text-white rounded-lg hover:bg-gray-600 transition-colors"
                >
                  Cancelar
                </button>
                <button className="px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors">
                  Guardar Cambios
                </button>
              </div>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default RolesManager;