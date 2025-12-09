import React from 'react';
import { Clock, CheckCircle, AlertCircle, ChefHat } from 'lucide-react';
import { Button } from '@/components/ui/button';

const demoOrders = [
  {
    id: 'ORD-001',
    items: [
      { name: 'Lomito Completo', quantity: 2, notes: 'Sin cebolla' },
      { name: 'Papas con Cheddar', quantity: 1 },
    ],
    orderType: 'Salón - Mesa 5',
    time: '5 min',
    priority: 'normal',
  },
  {
    id: 'ORD-002',
    items: [
      { name: 'Hamburguesa Doble', quantity: 1, notes: 'Extra bacon' },
      { name: 'Coca-Cola 500ml', quantity: 1 },
    ],
    orderType: 'Delivery',
    time: '8 min',
    priority: 'urgent',
  },
  {
    id: 'ORD-003',
    items: [
      { name: 'Combo Lomito', quantity: 3 },
      { name: 'Pancho Completo', quantity: 2 },
    ],
    orderType: 'Para llevar',
    time: '3 min',
    priority: 'normal',
  },
];

export default function KitchenPage() {
  return (
    <div className="h-screen flex flex-col p-4 lg:p-6">
      {/* Header */}
      <header className="flex items-center justify-between mb-6">
        <div>
          <h1 className="text-2xl lg:text-3xl font-display font-bold text-foreground flex items-center gap-3">
            <ChefHat className="w-8 h-8 text-primary" />
            Pantalla de Cocina
          </h1>
          <p className="text-muted-foreground text-sm mt-1">
            {demoOrders.length} pedidos pendientes
          </p>
        </div>
        <div className="flex items-center gap-2 text-sm text-muted-foreground">
          <Clock className="w-4 h-4" />
          {new Date().toLocaleTimeString('es-AR', { hour: '2-digit', minute: '2-digit' })}
        </div>
      </header>

      {/* Orders Grid */}
      <div className="flex-1 overflow-y-auto custom-scrollbar">
        <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-4">
          {demoOrders.map((order) => (
            <div
              key={order.id}
              className={`glass rounded-2xl p-5 transition-all duration-300 hover:border-primary/30 ${
                order.priority === 'urgent' ? 'border-warning/50' : ''
              }`}
            >
              {/* Order Header */}
              <div className="flex items-center justify-between mb-4">
                <div className="flex items-center gap-2">
                  <span className="text-lg font-bold text-foreground">{order.id}</span>
                  {order.priority === 'urgent' && (
                    <span className="flex items-center gap-1 px-2 py-0.5 rounded-full bg-warning/20 text-warning text-xs font-medium">
                      <AlertCircle className="w-3 h-3" />
                      Urgente
                    </span>
                  )}
                </div>
                <span className="flex items-center gap-1 text-sm text-muted-foreground">
                  <Clock className="w-4 h-4" />
                  {order.time}
                </span>
              </div>

              {/* Order Type */}
              <p className="text-sm text-primary font-medium mb-3">{order.orderType}</p>

              {/* Items */}
              <div className="space-y-2 mb-4">
                {order.items.map((item, idx) => (
                  <div key={idx} className="flex items-start gap-2">
                    <span className="w-6 h-6 rounded-lg bg-secondary flex items-center justify-center text-sm font-bold text-foreground flex-shrink-0">
                      {item.quantity}
                    </span>
                    <div>
                      <p className="text-foreground font-medium">{item.name}</p>
                      {item.notes && (
                        <p className="text-xs text-primary italic">• {item.notes}</p>
                      )}
                    </div>
                  </div>
                ))}
              </div>

              {/* Action */}
              <Button variant="success" className="w-full gap-2">
                <CheckCircle className="w-4 h-4" />
                Marcar Listo
              </Button>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
