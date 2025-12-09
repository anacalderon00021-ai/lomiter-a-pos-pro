import React from 'react';
import { History, Search, Filter, Eye, Printer, Copy, FileText } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';

const demoSales = [
  {
    id: 'VTA-0123',
    date: '09/12/2024 14:32',
    type: 'Salón',
    items: 3,
    total: 12500,
    payment: 'Efectivo',
    status: 'completed',
    cashier: 'María',
  },
  {
    id: 'VTA-0122',
    date: '09/12/2024 13:45',
    type: 'Delivery',
    items: 2,
    total: 8900,
    payment: 'Tarjeta',
    status: 'completed',
    cashier: 'María',
  },
  {
    id: 'VTA-0121',
    date: '09/12/2024 12:20',
    type: 'Para llevar',
    items: 5,
    total: 18200,
    payment: 'Transferencia',
    status: 'completed',
    cashier: 'Carlos',
  },
  {
    id: 'VTA-0120',
    date: '09/12/2024 11:15',
    type: 'Salón',
    items: 1,
    total: 4500,
    payment: 'Efectivo',
    status: 'pending',
    cashier: 'María',
  },
];

export default function HistoryPage() {
  return (
    <div className="h-screen flex flex-col p-4 lg:p-6">
      {/* Header */}
      <header className="flex flex-col lg:flex-row lg:items-center justify-between gap-4 mb-6">
        <div>
          <h1 className="text-2xl lg:text-3xl font-display font-bold text-foreground flex items-center gap-3">
            <History className="w-8 h-8 text-primary" />
            Historial de Ventas
          </h1>
          <p className="text-muted-foreground text-sm mt-1">
            Últimas transacciones
          </p>
        </div>
        <div className="flex items-center gap-2">
          <div className="relative flex-1 lg:w-64">
            <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-muted-foreground" />
            <Input placeholder="Buscar venta..." className="pl-10" />
          </div>
          <Button variant="glass" size="icon">
            <Filter className="w-4 h-4" />
          </Button>
        </div>
      </header>

      {/* Table */}
      <div className="flex-1 overflow-auto custom-scrollbar">
        <div className="glass rounded-2xl overflow-hidden">
          <table className="w-full">
            <thead className="bg-secondary/50">
              <tr>
                <th className="text-left px-4 py-3 text-sm font-semibold text-foreground">ID</th>
                <th className="text-left px-4 py-3 text-sm font-semibold text-foreground">Fecha</th>
                <th className="text-left px-4 py-3 text-sm font-semibold text-foreground hidden md:table-cell">Tipo</th>
                <th className="text-left px-4 py-3 text-sm font-semibold text-foreground hidden lg:table-cell">Items</th>
                <th className="text-left px-4 py-3 text-sm font-semibold text-foreground">Total</th>
                <th className="text-left px-4 py-3 text-sm font-semibold text-foreground hidden md:table-cell">Pago</th>
                <th className="text-left px-4 py-3 text-sm font-semibold text-foreground">Estado</th>
                <th className="text-right px-4 py-3 text-sm font-semibold text-foreground">Acciones</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-border">
              {demoSales.map((sale) => (
                <tr key={sale.id} className="hover:bg-secondary/30 transition-colors">
                  <td className="px-4 py-3">
                    <span className="font-mono text-sm text-foreground">{sale.id}</span>
                  </td>
                  <td className="px-4 py-3 text-sm text-muted-foreground">{sale.date}</td>
                  <td className="px-4 py-3 text-sm text-foreground hidden md:table-cell">{sale.type}</td>
                  <td className="px-4 py-3 text-sm text-foreground hidden lg:table-cell">{sale.items}</td>
                  <td className="px-4 py-3">
                    <span className="font-semibold text-primary">${sale.total.toLocaleString()}</span>
                  </td>
                  <td className="px-4 py-3 text-sm text-foreground hidden md:table-cell">{sale.payment}</td>
                  <td className="px-4 py-3">
                    <span
                      className={`inline-flex items-center px-2 py-1 rounded-full text-xs font-medium ${
                        sale.status === 'completed'
                          ? 'bg-success/20 text-success'
                          : 'bg-warning/20 text-warning'
                      }`}
                    >
                      {sale.status === 'completed' ? 'Completado' : 'Pendiente'}
                    </span>
                  </td>
                  <td className="px-4 py-3">
                    <div className="flex items-center justify-end gap-1">
                      <Button variant="ghost" size="icon-sm">
                        <Eye className="w-4 h-4" />
                      </Button>
                      <Button variant="ghost" size="icon-sm">
                        <Printer className="w-4 h-4" />
                      </Button>
                      <Button variant="ghost" size="icon-sm">
                        <Copy className="w-4 h-4" />
                      </Button>
                    </div>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
}
