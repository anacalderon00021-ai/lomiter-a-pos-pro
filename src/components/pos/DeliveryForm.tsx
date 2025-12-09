import React, { useState, useEffect } from 'react';
import { useCart } from '@/context/CartContext';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Textarea } from '@/components/ui/textarea';
import { Dialog, DialogContent, DialogHeader, DialogTitle } from '@/components/ui/dialog';
import { User, Phone, MapPin, CheckCircle } from 'lucide-react';
import { toast } from 'sonner';

interface DeliveryFormProps {
  isOpen: boolean;
  onClose: () => void;
}

export default function DeliveryForm({ isOpen, onClose }: DeliveryFormProps) {
  const { customerName, customerPhone, customerAddress, setCustomerInfo } = useCart();
  
  const [name, setName] = useState('');
  const [phone, setPhone] = useState('');
  const [address, setAddress] = useState('');

  useEffect(() => {
    if (isOpen) {
      setName(customerName || '');
      setPhone(customerPhone || '');
      setAddress(customerAddress || '');
    }
  }, [isOpen, customerName, customerPhone, customerAddress]);

  const handleSave = () => {
    if (!name.trim() || !phone.trim() || !address.trim()) {
      toast.error('Complete todos los campos');
      return;
    }
    setCustomerInfo(name, phone, address);
    toast.success('Datos de delivery guardados');
    onClose();
  };

  return (
    <Dialog open={isOpen} onOpenChange={onClose}>
      <DialogContent className="max-w-md bg-card border-border">
        <DialogHeader>
          <DialogTitle className="text-xl font-display">Datos de Delivery</DialogTitle>
        </DialogHeader>

        <div className="space-y-4">
          <div className="space-y-2">
            <label className="text-sm font-medium text-foreground flex items-center gap-2">
              <User className="w-4 h-4 text-primary" />
              Nombre del cliente
            </label>
            <Input
              placeholder="Juan Pérez"
              value={name}
              onChange={(e) => setName(e.target.value)}
            />
          </div>

          <div className="space-y-2">
            <label className="text-sm font-medium text-foreground flex items-center gap-2">
              <Phone className="w-4 h-4 text-primary" />
              Teléfono
            </label>
            <Input
              placeholder="+54 11 1234-5678"
              value={phone}
              onChange={(e) => setPhone(e.target.value)}
            />
          </div>

          <div className="space-y-2">
            <label className="text-sm font-medium text-foreground flex items-center gap-2">
              <MapPin className="w-4 h-4 text-primary" />
              Dirección de entrega
            </label>
            <Textarea
              placeholder="Calle, número, piso, depto, referencias..."
              value={address}
              onChange={(e) => setAddress(e.target.value)}
              rows={3}
            />
          </div>

          <div className="p-3 rounded-xl bg-warning/10 border border-warning/30">
            <p className="text-sm text-warning">
              Costo de delivery: <span className="font-bold">$500</span>
            </p>
          </div>
        </div>

        <Button
          variant="premium"
          size="lg"
          className="w-full gap-2"
          onClick={handleSave}
        >
          <CheckCircle className="w-5 h-5" />
          Guardar Datos
        </Button>
      </DialogContent>
    </Dialog>
  );
}
