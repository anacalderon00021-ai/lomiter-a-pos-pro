import React from 'react';
import { useCart } from '@/context/CartContext';
import { Button } from '@/components/ui/button';
import { Dialog, DialogContent, DialogHeader, DialogTitle } from '@/components/ui/dialog';
import { cn } from '@/lib/utils';

interface TableSelectorProps {
  isOpen: boolean;
  onClose: () => void;
}

const tables = [
  { id: 1, status: 'available' },
  { id: 2, status: 'occupied' },
  { id: 3, status: 'available' },
  { id: 4, status: 'available' },
  { id: 5, status: 'occupied' },
  { id: 6, status: 'available' },
  { id: 7, status: 'available' },
  { id: 8, status: 'occupied' },
  { id: 9, status: 'available' },
  { id: 10, status: 'available' },
  { id: 11, status: 'available' },
  { id: 12, status: 'available' },
];

export default function TableSelector({ isOpen, onClose }: TableSelectorProps) {
  const { tableNumber, setTableNumber } = useCart();

  const handleSelectTable = (id: number) => {
    setTableNumber(id);
    onClose();
  };

  return (
    <Dialog open={isOpen} onOpenChange={onClose}>
      <DialogContent className="max-w-md bg-card border-border">
        <DialogHeader>
          <DialogTitle className="text-xl font-display">Seleccionar Mesa</DialogTitle>
        </DialogHeader>

        <div className="grid grid-cols-4 gap-3">
          {tables.map((table) => (
            <Button
              key={table.id}
              variant={tableNumber === table.id ? 'premium' : 'secondary'}
              className={cn(
                'h-16 text-lg font-bold',
                table.status === 'occupied' && tableNumber !== table.id && 'opacity-50'
              )}
              onClick={() => handleSelectTable(table.id)}
            >
              {table.id}
            </Button>
          ))}
        </div>

        <div className="flex items-center gap-4 text-sm text-muted-foreground mt-2">
          <div className="flex items-center gap-2">
            <div className="w-4 h-4 rounded bg-secondary" />
            <span>Disponible</span>
          </div>
          <div className="flex items-center gap-2">
            <div className="w-4 h-4 rounded bg-secondary opacity-50" />
            <span>Ocupada</span>
          </div>
          <div className="flex items-center gap-2">
            <div className="w-4 h-4 rounded bg-primary" />
            <span>Seleccionada</span>
          </div>
        </div>
      </DialogContent>
    </Dialog>
  );
}
