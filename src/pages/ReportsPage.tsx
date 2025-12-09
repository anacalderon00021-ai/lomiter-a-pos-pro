import React from 'react';
import { BarChart3, TrendingUp, DollarSign, ShoppingBag, Users, Download, Calendar } from 'lucide-react';
import { Button } from '@/components/ui/button';

const stats = [
  {
    label: 'Ventas Hoy',
    value: '$124,500',
    change: '+12.5%',
    icon: DollarSign,
    trend: 'up',
  },
  {
    label: 'Pedidos',
    value: '48',
    change: '+8%',
    icon: ShoppingBag,
    trend: 'up',
  },
  {
    label: 'Ticket Promedio',
    value: '$2,594',
    change: '+3.2%',
    icon: TrendingUp,
    trend: 'up',
  },
  {
    label: 'Clientes Delivery',
    value: '23',
    change: '-2%',
    icon: Users,
    trend: 'down',
  },
];

const topProducts = [
  { name: 'Lomito Completo', sales: 42, revenue: 189000 },
  { name: 'Combo Lomito', sales: 35, revenue: 227500 },
  { name: 'Hamburguesa Doble', sales: 28, revenue: 145600 },
  { name: 'Papas con Cheddar', sales: 24, revenue: 52800 },
  { name: 'Pancho Completo', sales: 18, revenue: 45000 },
];

export default function ReportsPage() {
  return (
    <div className="h-screen flex flex-col p-4 lg:p-6 overflow-auto custom-scrollbar">
      {/* Header */}
      <header className="flex flex-col lg:flex-row lg:items-center justify-between gap-4 mb-6">
        <div>
          <h1 className="text-2xl lg:text-3xl font-display font-bold text-foreground flex items-center gap-3">
            <BarChart3 className="w-8 h-8 text-primary" />
            Informes
          </h1>
          <p className="text-muted-foreground text-sm mt-1">
            Resumen de rendimiento
          </p>
        </div>
        <div className="flex items-center gap-2">
          <Button variant="glass" className="gap-2">
            <Calendar className="w-4 h-4" />
            Hoy
          </Button>
          <Button variant="premium" className="gap-2">
            <Download className="w-4 h-4" />
            Exportar
          </Button>
        </div>
      </header>

      {/* Stats Grid */}
      <div className="grid grid-cols-2 lg:grid-cols-4 gap-4 mb-6">
        {stats.map((stat) => (
          <div key={stat.label} className="glass rounded-2xl p-5">
            <div className="flex items-center justify-between mb-3">
              <div className="w-10 h-10 rounded-xl bg-primary/10 flex items-center justify-center">
                <stat.icon className="w-5 h-5 text-primary" />
              </div>
              <span
                className={`text-xs font-medium ${
                  stat.trend === 'up' ? 'text-success' : 'text-destructive'
                }`}
              >
                {stat.change}
              </span>
            </div>
            <p className="text-2xl font-bold text-foreground">{stat.value}</p>
            <p className="text-sm text-muted-foreground">{stat.label}</p>
          </div>
        ))}
      </div>

      {/* Charts Row */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 mb-6">
        {/* Sales Chart Placeholder */}
        <div className="glass rounded-2xl p-6">
          <h3 className="text-lg font-display font-semibold text-foreground mb-4">
            Ventas por Hora
          </h3>
          <div className="h-64 flex items-end justify-between gap-2 px-4">
            {[40, 65, 45, 80, 55, 90, 70, 85, 60, 75, 50, 95].map((height, i) => (
              <div key={i} className="flex-1 flex flex-col items-center gap-2">
                <div
                  className="w-full bg-gradient-to-t from-primary to-primary-glow rounded-t-lg transition-all duration-500 hover:opacity-80"
                  style={{ height: `${height}%` }}
                />
                <span className="text-xs text-muted-foreground">{10 + i}</span>
              </div>
            ))}
          </div>
        </div>

        {/* Top Products */}
        <div className="glass rounded-2xl p-6">
          <h3 className="text-lg font-display font-semibold text-foreground mb-4">
            Productos Más Vendidos
          </h3>
          <div className="space-y-4">
            {topProducts.map((product, i) => (
              <div key={product.name} className="flex items-center gap-4">
                <span className="w-8 h-8 rounded-lg bg-secondary flex items-center justify-center text-sm font-bold text-foreground">
                  {i + 1}
                </span>
                <div className="flex-1">
                  <p className="font-medium text-foreground">{product.name}</p>
                  <p className="text-xs text-muted-foreground">{product.sales} unidades</p>
                </div>
                <span className="font-semibold text-primary">
                  ${product.revenue.toLocaleString()}
                </span>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* Payment Methods */}
      <div className="glass rounded-2xl p-6">
        <h3 className="text-lg font-display font-semibold text-foreground mb-4">
          Ingresos por Método de Pago
        </h3>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
          <div className="flex items-center gap-4 p-4 rounded-xl bg-secondary/50">
            <div className="w-12 h-12 rounded-full bg-success/20 flex items-center justify-center">
              <DollarSign className="w-6 h-6 text-success" />
            </div>
            <div>
              <p className="text-2xl font-bold text-foreground">$68,200</p>
              <p className="text-sm text-muted-foreground">Efectivo (54.8%)</p>
            </div>
          </div>
          <div className="flex items-center gap-4 p-4 rounded-xl bg-secondary/50">
            <div className="w-12 h-12 rounded-full bg-primary/20 flex items-center justify-center">
              <DollarSign className="w-6 h-6 text-primary" />
            </div>
            <div>
              <p className="text-2xl font-bold text-foreground">$42,300</p>
              <p className="text-sm text-muted-foreground">Tarjeta (34%)</p>
            </div>
          </div>
          <div className="flex items-center gap-4 p-4 rounded-xl bg-secondary/50">
            <div className="w-12 h-12 rounded-full bg-warning/20 flex items-center justify-center">
              <DollarSign className="w-6 h-6 text-warning" />
            </div>
            <div>
              <p className="text-2xl font-bold text-foreground">$14,000</p>
              <p className="text-sm text-muted-foreground">Transferencia (11.2%)</p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
