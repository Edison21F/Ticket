import { SideNav } from "./side-nav"
import { TopBar } from "./top-bar"
const navigationItems = [
  {
    label: 'Inicio',
    items: [
      { label: 'Dashboard', icon: 'pi pi-fw pi-home', routerLink: ['/admin'] }
    ]
  },
  {
    label: 'Gestión de Usuarios',
    items: [
      { label: 'Usuarios', icon: 'pi pi-fw pi-users', routerLink: ['/admin/usuarios'] },
      { label: 'Roles y Permisos', icon: 'pi pi-fw pi-key', routerLink: ['/admin/roles'] }
    ]
  },
  {
    label: 'Eventos',
    items: [
      { label: 'Listado de Eventos', icon: 'pi pi-fw pi-list', routerLink: ['/admin/eventos'] },
      { label: 'Conciertos', icon: 'pi pi-id-card', routerLink: ['/admin/eventos/concierto'] },
      { label: 'Cine', icon: 'pi pi-discord', routerLink: ['/admin/eventos/cine'] },
      { label: 'Transporte', icon: 'pi pi-car', routerLink: ['/admin/eventos/transporte'] },
      { label: 'Otros', icon: 'pi pi-microsoft', routerLink: ['/admin/eventos/varios'] }
    ]
  },
  {
    label: 'Tickets',
    items: [
      { label: 'Listado de Tickets', icon: 'pi pi-fw pi-ticket', routerLink: ['/tickets'] },
      { label: 'Crear Ticket', icon: 'pi pi-fw pi-plus', routerLink: ['/tickets/create'] }
    ]
  },
  {
    label: 'Pagos y Transacciones',
    items: [
      { label: 'Gestión de Pagos', icon: 'pi pi-fw pi-wallet', routerLink: ['/admin/payments'] }
    ]
  },
  {
    label: 'Reportes y Analíticas',
    items: [
      { label: 'Reportes', icon: 'pi pi-fw pi-chart-line', routerLink: ['/reports'] }
    ]
  },
  {
    label: 'Centro de Soporte',
    items: [
      { label: 'Soporte', icon: 'pi pi-fw pi-support', routerLink: ['/support'] }
    ]
  },
  {
    label: 'Configuración',
    items: [
      { label: 'Ajustes', icon: 'pi pi-fw pi-cog', routerLink: ['/settings'] }
    ]
  }
];

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="en" >
      <body className="bg-[#1D1E2C] text-white">
        <div className="flex min-h-screen">
          <SideNav items={navigationItems} />
          
          <div className="flex-1">
            <TopBar />
            
            <main className="flex-1">{children}</main>
          </div>
        </div>
      </body>
    </html>
  )
}

