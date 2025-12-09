import React from 'react';
import { NavLink } from '@/components/NavLink';
import { useAuth } from '@/context/AuthContext';
import { Button } from '@/components/ui/button';
import { cn } from '@/lib/utils';
import {
  LayoutDashboard,
  ShoppingCart,
  ChefHat,
  History,
  BarChart3,
  Package,
  Users,
  Settings,
  LogOut,
  Menu,
  X,
} from 'lucide-react';

interface SidebarProps {
  isOpen: boolean;
  onToggle: () => void;
}

const navItems = [
  { to: '/pos', icon: ShoppingCart, label: 'Caja', roles: ['owner', 'manager', 'cashier'] },
  { to: '/kitchen', icon: ChefHat, label: 'Cocina', roles: ['owner', 'manager', 'kitchen'] },
  { to: '/history', icon: History, label: 'Historial', roles: ['owner', 'manager', 'cashier'] },
  { to: '/reports', icon: BarChart3, label: 'Informes', roles: ['owner', 'manager'] },
  { to: '/products', icon: Package, label: 'Productos', roles: ['owner', 'manager'] },
  { to: '/employees', icon: Users, label: 'Empleados', roles: ['owner', 'manager'] },
  { to: '/settings', icon: Settings, label: 'Configuración', roles: ['owner'] },
];

export default function Sidebar({ isOpen, onToggle }: SidebarProps) {
  const { user, logout } = useAuth();

  const filteredNavItems = navItems.filter(
    (item) => user && item.roles.includes(user.role)
  );

  return (
    <>
      {/* Mobile Overlay */}
      {isOpen && (
        <div
          className="fixed inset-0 bg-background/80 backdrop-blur-sm z-40 lg:hidden"
          onClick={onToggle}
        />
      )}

      {/* Sidebar */}
      <aside
        className={cn(
          "fixed lg:static inset-y-0 left-0 z-50 w-64 flex flex-col bg-sidebar border-r border-sidebar-border transition-transform duration-300",
          isOpen ? "translate-x-0" : "-translate-x-full lg:translate-x-0"
        )}
      >
        {/* Header */}
        <div className="flex items-center justify-between p-4 border-b border-sidebar-border">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 rounded-xl bg-gradient-to-br from-primary to-primary-glow flex items-center justify-center shadow-glow">
              <ChefHat className="w-5 h-5 text-primary-foreground" />
            </div>
            <div>
              <h1 className="font-display font-bold text-foreground">La Lomitería</h1>
              <p className="text-xs text-muted-foreground">Sistema de Caja</p>
            </div>
          </div>
          <Button
            variant="ghost"
            size="icon-sm"
            className="lg:hidden"
            onClick={onToggle}
          >
            <X className="w-5 h-5" />
          </Button>
        </div>

        {/* Navigation */}
        <nav className="flex-1 overflow-y-auto p-3 space-y-1">
          {filteredNavItems.map((item) => (
            <NavLink
              key={item.to}
              to={item.to}
              className="flex items-center gap-3 px-4 py-3 rounded-xl text-sidebar-foreground hover:bg-sidebar-accent transition-all duration-200"
              activeClassName="bg-primary text-primary-foreground shadow-glow"
            >
              <item.icon className="w-5 h-5" />
              <span className="font-medium">{item.label}</span>
            </NavLink>
          ))}
        </nav>

        {/* User Section */}
        <div className="p-4 border-t border-sidebar-border">
          <div className="flex items-center gap-3 mb-3">
            <div className="w-10 h-10 rounded-full bg-secondary flex items-center justify-center">
              <span className="text-sm font-semibold text-foreground">
                {user?.name.charAt(0)}
              </span>
            </div>
            <div className="flex-1 min-w-0">
              <p className="font-medium text-sm text-foreground truncate">{user?.name}</p>
              <p className="text-xs text-muted-foreground capitalize">{user?.role}</p>
            </div>
          </div>
          <Button
            variant="secondary"
            size="sm"
            className="w-full justify-start gap-2"
            onClick={logout}
          >
            <LogOut className="w-4 h-4" />
            Cerrar Sesión
          </Button>
        </div>
      </aside>

      {/* Mobile Toggle Button */}
      <Button
        variant="glass"
        size="icon"
        className="fixed bottom-4 left-4 z-30 lg:hidden shadow-premium"
        onClick={onToggle}
      >
        <Menu className="w-5 h-5" />
      </Button>
    </>
  );
}
