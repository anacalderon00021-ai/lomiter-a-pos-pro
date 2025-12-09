import React from 'react';
import { Users, Plus, Search, Clock, Calendar, TrendingUp } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';

const employees = [
  {
    id: '1',
    name: 'Carlos Admin',
    role: 'Dueño',
    phone: '+54 11 1234-5678',
    shift: 'Completo',
    hoursThisWeek: 45,
    status: 'present',
  },
  {
    id: '2',
    name: 'María Cajera',
    role: 'Cajera',
    phone: '+54 11 2345-6789',
    shift: 'Mañana',
    hoursThisWeek: 32,
    status: 'present',
  },
  {
    id: '3',
    name: 'José Cocina',
    role: 'Cocina',
    phone: '+54 11 3456-7890',
    shift: 'Tarde',
    hoursThisWeek: 28,
    status: 'absent',
  },
  {
    id: '4',
    name: 'Ana Delivery',
    role: 'Repartidor',
    phone: '+54 11 4567-8901',
    shift: 'Noche',
    hoursThisWeek: 24,
    status: 'present',
  },
];

const attendanceStats = [
  { label: 'Presentes Hoy', value: 3, icon: Users, color: 'text-success' },
  { label: 'Horas Totales Semana', value: 129, icon: Clock, color: 'text-primary' },
  { label: 'Días Trabajados Mes', value: 68, icon: Calendar, color: 'text-warning' },
  { label: 'Rendimiento', value: '94%', icon: TrendingUp, color: 'text-success' },
];

export default function EmployeesPage() {
  return (
    <div className="h-screen flex flex-col p-4 lg:p-6 overflow-auto custom-scrollbar">
      {/* Header */}
      <header className="flex flex-col lg:flex-row lg:items-center justify-between gap-4 mb-6">
        <div>
          <h1 className="text-2xl lg:text-3xl font-display font-bold text-foreground flex items-center gap-3">
            <Users className="w-8 h-8 text-primary" />
            Gestión de Empleados
          </h1>
          <p className="text-muted-foreground text-sm mt-1">
            {employees.length} empleados activos
          </p>
        </div>
        <div className="flex items-center gap-2">
          <div className="relative flex-1 lg:w-64">
            <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-muted-foreground" />
            <Input placeholder="Buscar empleado..." className="pl-10" />
          </div>
          <Button variant="premium" className="gap-2">
            <Plus className="w-4 h-4" />
            Nuevo
          </Button>
        </div>
      </header>

      {/* Stats */}
      <div className="grid grid-cols-2 lg:grid-cols-4 gap-4 mb-6">
        {attendanceStats.map((stat) => (
          <div key={stat.label} className="glass rounded-2xl p-4">
            <div className="flex items-center gap-3">
              <div className={`w-10 h-10 rounded-xl bg-secondary flex items-center justify-center ${stat.color}`}>
                <stat.icon className="w-5 h-5" />
              </div>
              <div>
                <p className="text-xl font-bold text-foreground">{stat.value}</p>
                <p className="text-xs text-muted-foreground">{stat.label}</p>
              </div>
            </div>
          </div>
        ))}
      </div>

      {/* Employees List */}
      <div className="glass rounded-2xl overflow-hidden">
        <table className="w-full">
          <thead className="bg-secondary/50">
            <tr>
              <th className="text-left px-4 py-3 text-sm font-semibold text-foreground">Empleado</th>
              <th className="text-left px-4 py-3 text-sm font-semibold text-foreground hidden md:table-cell">Rol</th>
              <th className="text-left px-4 py-3 text-sm font-semibold text-foreground hidden lg:table-cell">Turno</th>
              <th className="text-left px-4 py-3 text-sm font-semibold text-foreground">Horas/Semana</th>
              <th className="text-left px-4 py-3 text-sm font-semibold text-foreground">Estado</th>
              <th className="text-right px-4 py-3 text-sm font-semibold text-foreground">Acciones</th>
            </tr>
          </thead>
          <tbody className="divide-y divide-border">
            {employees.map((emp) => (
              <tr key={emp.id} className="hover:bg-secondary/30 transition-colors">
                <td className="px-4 py-4">
                  <div className="flex items-center gap-3">
                    <div className="w-10 h-10 rounded-full bg-primary/20 flex items-center justify-center">
                      <span className="text-sm font-bold text-primary">{emp.name.charAt(0)}</span>
                    </div>
                    <div>
                      <p className="font-medium text-foreground">{emp.name}</p>
                      <p className="text-xs text-muted-foreground">{emp.phone}</p>
                    </div>
                  </div>
                </td>
                <td className="px-4 py-4 text-sm text-foreground hidden md:table-cell">{emp.role}</td>
                <td className="px-4 py-4 text-sm text-foreground hidden lg:table-cell">{emp.shift}</td>
                <td className="px-4 py-4">
                  <div className="flex items-center gap-2">
                    <Clock className="w-4 h-4 text-muted-foreground" />
                    <span className="font-medium text-foreground">{emp.hoursThisWeek}h</span>
                  </div>
                </td>
                <td className="px-4 py-4">
                  <span
                    className={`inline-flex items-center px-2 py-1 rounded-full text-xs font-medium ${
                      emp.status === 'present'
                        ? 'bg-success/20 text-success'
                        : 'bg-destructive/20 text-destructive'
                    }`}
                  >
                    {emp.status === 'present' ? 'Presente' : 'Ausente'}
                  </span>
                </td>
                <td className="px-4 py-4 text-right">
                  <Button variant="secondary" size="sm">
                    Ver Asistencia
                  </Button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
}
