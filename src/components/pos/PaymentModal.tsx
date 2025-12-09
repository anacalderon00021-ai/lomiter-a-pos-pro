import React, { useState, useEffect } from 'react';
import { useCart } from '@/context/CartContext';
import { useAuth } from '@/context/AuthContext';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Dialog, DialogContent, DialogHeader, DialogTitle } from '@/components/ui/dialog';
import { RadioGroup, RadioGroupItem } from '@/components/ui/radio-group';
import { Label } from '@/components/ui/label';
import { 
  CreditCard, 
  Banknote, 
  Building2, 
  Receipt, 
  FileText, 
  CheckCircle,
  Printer,
  ArrowLeft
} from 'lucide-react';
import { toast } from 'sonner';
import { PaymentMethod, DocumentType, Order } from '@/types';

interface PaymentModalProps {
  isOpen: boolean;
  onClose: () => void;
}

type Step = 'payment' | 'document' | 'success';

export default function PaymentModal({ isOpen, onClose }: PaymentModalProps) {
  const { items, orderType, tableNumber, customerName, subtotal, tax, deliveryFee, total, clearCart } = useCart();
  const { user } = useAuth();
  
  const [step, setStep] = useState<Step>('payment');
  const [paymentMethod, setPaymentMethod] = useState<PaymentMethod>('cash');
  const [amountReceived, setAmountReceived] = useState<string>('');
  const [documentType, setDocumentType] = useState<DocumentType>('ticket');
  const [customerCuit, setCustomerCuit] = useState('');
  const [customerNameInput, setCustomerNameInput] = useState('');
  const [completedOrder, setCompletedOrder] = useState<Order | null>(null);

  const change = paymentMethod === 'cash' && amountReceived 
    ? parseFloat(amountReceived) - total 
    : 0;

  useEffect(() => {
    if (isOpen) {
      setStep('payment');
      setPaymentMethod('cash');
      setAmountReceived('');
      setDocumentType('ticket');
      setCustomerCuit('');
      setCustomerNameInput(customerName || '');
    }
  }, [isOpen, customerName]);

  const handlePaymentNext = () => {
    if (paymentMethod === 'cash' && (!amountReceived || parseFloat(amountReceived) < total)) {
      toast.error('El monto recibido es insuficiente');
      return;
    }
    setStep('document');
  };

  const handleConfirmPayment = () => {
    if (documentType === 'factura' || documentType === 'both') {
      if (!customerCuit.trim() || !customerNameInput.trim()) {
        toast.error('Complete los datos de facturación');
        return;
      }
    }

    // Create order
    const order: Order = {
      id: `ORD-${Date.now().toString().slice(-6)}`,
      items,
      orderType,
      paymentMethod,
      documentType,
      tableNumber,
      customerName: customerNameInput || customerName,
      customerCuit: customerCuit || undefined,
      deliveryFee: deliveryFee || undefined,
      subtotal,
      tax,
      total,
      amountReceived: paymentMethod === 'cash' ? parseFloat(amountReceived) : undefined,
      change: paymentMethod === 'cash' ? change : undefined,
      status: 'preparing',
      createdAt: new Date(),
      cashierName: user?.name || 'Cajero',
    };

    setCompletedOrder(order);
    setStep('success');
    
    // Clear cart after successful payment
    clearCart();
  };

  const handlePrint = () => {
    toast.success('Imprimiendo documento...');
    // In a real app, this would trigger the print functionality
  };

  const handleClose = () => {
    setStep('payment');
    setCompletedOrder(null);
    onClose();
  };

  return (
    <Dialog open={isOpen} onOpenChange={handleClose}>
      <DialogContent className="max-w-md bg-card border-border">
        {step === 'payment' && (
          <>
            <DialogHeader>
              <DialogTitle className="text-xl font-display">Método de Pago</DialogTitle>
            </DialogHeader>

            {/* Order Summary */}
            <div className="p-4 rounded-xl bg-secondary/50 space-y-2">
              <div className="flex justify-between text-sm">
                <span className="text-muted-foreground">Subtotal</span>
                <span className="text-foreground">${subtotal.toLocaleString()}</span>
              </div>
              <div className="flex justify-between text-sm">
                <span className="text-muted-foreground">IVA (21%)</span>
                <span className="text-foreground">${tax.toLocaleString()}</span>
              </div>
              {deliveryFee > 0 && (
                <div className="flex justify-between text-sm">
                  <span className="text-muted-foreground">Delivery</span>
                  <span className="text-foreground">${deliveryFee.toLocaleString()}</span>
                </div>
              )}
              <div className="flex justify-between text-lg font-bold pt-2 border-t border-border">
                <span>Total</span>
                <span className="text-primary">${total.toLocaleString()}</span>
              </div>
            </div>

            {/* Payment Methods */}
            <RadioGroup value={paymentMethod} onValueChange={(v) => setPaymentMethod(v as PaymentMethod)}>
              <div className="grid grid-cols-1 gap-3">
                <Label
                  htmlFor="cash"
                  className={`flex items-center gap-4 p-4 rounded-xl cursor-pointer transition-all ${
                    paymentMethod === 'cash'
                      ? 'bg-primary/20 border-2 border-primary'
                      : 'bg-secondary/50 border-2 border-transparent hover:border-border'
                  }`}
                >
                  <RadioGroupItem value="cash" id="cash" />
                  <Banknote className="w-6 h-6 text-success" />
                  <div>
                    <p className="font-medium text-foreground">Efectivo</p>
                    <p className="text-xs text-muted-foreground">Pago en efectivo</p>
                  </div>
                </Label>

                <Label
                  htmlFor="card"
                  className={`flex items-center gap-4 p-4 rounded-xl cursor-pointer transition-all ${
                    paymentMethod === 'card'
                      ? 'bg-primary/20 border-2 border-primary'
                      : 'bg-secondary/50 border-2 border-transparent hover:border-border'
                  }`}
                >
                  <RadioGroupItem value="card" id="card" />
                  <CreditCard className="w-6 h-6 text-primary" />
                  <div>
                    <p className="font-medium text-foreground">Tarjeta</p>
                    <p className="text-xs text-muted-foreground">Débito o crédito</p>
                  </div>
                </Label>

                <Label
                  htmlFor="transfer"
                  className={`flex items-center gap-4 p-4 rounded-xl cursor-pointer transition-all ${
                    paymentMethod === 'transfer'
                      ? 'bg-primary/20 border-2 border-primary'
                      : 'bg-secondary/50 border-2 border-transparent hover:border-border'
                  }`}
                >
                  <RadioGroupItem value="transfer" id="transfer" />
                  <Building2 className="w-6 h-6 text-warning" />
                  <div>
                    <p className="font-medium text-foreground">Transferencia</p>
                    <p className="text-xs text-muted-foreground">Transferencia bancaria</p>
                  </div>
                </Label>
              </div>
            </RadioGroup>

            {/* Cash Input */}
            {paymentMethod === 'cash' && (
              <div className="space-y-3 p-4 rounded-xl bg-secondary/30">
                <div>
                  <Label className="text-sm text-muted-foreground">Monto recibido</Label>
                  <Input
                    type="number"
                    placeholder="0"
                    value={amountReceived}
                    onChange={(e) => setAmountReceived(e.target.value)}
                    className="text-2xl font-bold h-14 mt-1"
                  />
                </div>
                {amountReceived && parseFloat(amountReceived) >= total && (
                  <div className="flex justify-between items-center p-3 rounded-lg bg-success/20">
                    <span className="text-sm text-success">Vuelto</span>
                    <span className="text-xl font-bold text-success">
                      ${change.toLocaleString()}
                    </span>
                  </div>
                )}
              </div>
            )}

            <Button
              variant="premium"
              size="lg"
              className="w-full"
              onClick={handlePaymentNext}
            >
              Continuar
            </Button>
          </>
        )}

        {step === 'document' && (
          <>
            <DialogHeader>
              <div className="flex items-center gap-2">
                <Button variant="ghost" size="icon-sm" onClick={() => setStep('payment')}>
                  <ArrowLeft className="w-4 h-4" />
                </Button>
                <DialogTitle className="text-xl font-display">Tipo de Documento</DialogTitle>
              </div>
            </DialogHeader>

            {/* Document Type */}
            <RadioGroup value={documentType} onValueChange={(v) => setDocumentType(v as DocumentType)}>
              <div className="grid grid-cols-1 gap-3">
                <Label
                  htmlFor="ticket"
                  className={`flex items-center gap-4 p-4 rounded-xl cursor-pointer transition-all ${
                    documentType === 'ticket'
                      ? 'bg-primary/20 border-2 border-primary'
                      : 'bg-secondary/50 border-2 border-transparent hover:border-border'
                  }`}
                >
                  <RadioGroupItem value="ticket" id="ticket" />
                  <Receipt className="w-6 h-6 text-muted-foreground" />
                  <div>
                    <p className="font-medium text-foreground">Ticket</p>
                    <p className="text-xs text-muted-foreground">Comprobante simple</p>
                  </div>
                </Label>

                <Label
                  htmlFor="factura"
                  className={`flex items-center gap-4 p-4 rounded-xl cursor-pointer transition-all ${
                    documentType === 'factura'
                      ? 'bg-primary/20 border-2 border-primary'
                      : 'bg-secondary/50 border-2 border-transparent hover:border-border'
                  }`}
                >
                  <RadioGroupItem value="factura" id="factura" />
                  <FileText className="w-6 h-6 text-primary" />
                  <div>
                    <p className="font-medium text-foreground">Factura</p>
                    <p className="text-xs text-muted-foreground">Documento fiscal</p>
                  </div>
                </Label>

                <Label
                  htmlFor="both"
                  className={`flex items-center gap-4 p-4 rounded-xl cursor-pointer transition-all ${
                    documentType === 'both'
                      ? 'bg-primary/20 border-2 border-primary'
                      : 'bg-secondary/50 border-2 border-transparent hover:border-border'
                  }`}
                >
                  <RadioGroupItem value="both" id="both" />
                  <div className="flex">
                    <Receipt className="w-5 h-5 text-muted-foreground" />
                    <FileText className="w-5 h-5 text-primary -ml-1" />
                  </div>
                  <div>
                    <p className="font-medium text-foreground">Ambos</p>
                    <p className="text-xs text-muted-foreground">Ticket y Factura</p>
                  </div>
                </Label>
              </div>
            </RadioGroup>

            {/* Factura Details */}
            {(documentType === 'factura' || documentType === 'both') && (
              <div className="space-y-3 p-4 rounded-xl bg-secondary/30">
                <p className="text-sm font-medium text-foreground">Datos de Facturación</p>
                <div className="space-y-2">
                  <Input
                    placeholder="Nombre o Razón Social"
                    value={customerNameInput}
                    onChange={(e) => setCustomerNameInput(e.target.value)}
                  />
                  <Input
                    placeholder="CUIT (ej: 20-12345678-9)"
                    value={customerCuit}
                    onChange={(e) => setCustomerCuit(e.target.value)}
                  />
                </div>
              </div>
            )}

            <Button
              variant="premium"
              size="lg"
              className="w-full gap-2"
              onClick={handleConfirmPayment}
            >
              <CheckCircle className="w-5 h-5" />
              Confirmar Pago
            </Button>
          </>
        )}

        {step === 'success' && completedOrder && (
          <div className="py-6 text-center space-y-6">
            <div className="w-20 h-20 rounded-full bg-success/20 flex items-center justify-center mx-auto animate-scale-in">
              <CheckCircle className="w-10 h-10 text-success" />
            </div>
            
            <div>
              <h2 className="text-2xl font-display font-bold text-foreground">
                ¡Pago Exitoso!
              </h2>
              <p className="text-muted-foreground mt-1">
                Pedido #{completedOrder.id}
              </p>
            </div>

            <div className="p-4 rounded-xl bg-secondary/50 space-y-2 text-left">
              <div className="flex justify-between text-sm">
                <span className="text-muted-foreground">Total</span>
                <span className="font-bold text-primary">${completedOrder.total.toLocaleString()}</span>
              </div>
              <div className="flex justify-between text-sm">
                <span className="text-muted-foreground">Método</span>
                <span className="text-foreground capitalize">
                  {completedOrder.paymentMethod === 'cash' ? 'Efectivo' :
                   completedOrder.paymentMethod === 'card' ? 'Tarjeta' : 'Transferencia'}
                </span>
              </div>
              {completedOrder.change && completedOrder.change > 0 && (
                <div className="flex justify-between text-sm">
                  <span className="text-muted-foreground">Vuelto</span>
                  <span className="text-success font-bold">${completedOrder.change.toLocaleString()}</span>
                </div>
              )}
              <div className="flex justify-between text-sm">
                <span className="text-muted-foreground">Documento</span>
                <span className="text-foreground capitalize">
                  {completedOrder.documentType === 'ticket' ? 'Ticket' :
                   completedOrder.documentType === 'factura' ? 'Factura' : 'Ticket + Factura'}
                </span>
              </div>
            </div>

            <div className="flex gap-3">
              <Button variant="secondary" className="flex-1 gap-2" onClick={handlePrint}>
                <Printer className="w-4 h-4" />
                Imprimir
              </Button>
              <Button variant="premium" className="flex-1" onClick={handleClose}>
                Nuevo Pedido
              </Button>
            </div>
          </div>
        )}
      </DialogContent>
    </Dialog>
  );
}
