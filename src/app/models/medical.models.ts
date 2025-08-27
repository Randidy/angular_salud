// Models for medical system entities

export interface Paciente {
  id?: number;
  nombre: string;
  numeroIdentificacion: string;
  fechaNacimiento: string;
  edad?: number;
  telefono: string;
  direccion: string;
  email: string;
  tieneAlergias: boolean;
  alergias?: Alergia[];
  citas?: Cita[];
  recetas?: Receta[];
}

export interface Medico {
  id?: number;
  nombre: string;
  apellido: string;
  numeroLicencia: string;
  telefono: string;
  email: string;
  especialidad: Especialidad;
  tarifaConsulta: number;
  estadoDoctor: EstadoDoctor;
  horarioAtencion?: HorarioAtencion[];
  citas?: Cita[];
  recetas?: Receta[];
}

export interface Cita {
  id?: number;
  fecha: string;
  hora: string;
  motivo: string;
  estado: EstadoCita;
  tarifaAplicada: number;
  pacienteId: number;
  medicoId: number;
  pacienteNombre?: string;
  pacienteEmail?: string;
  pacienteTelefono?: string;
  paciente?: Paciente;
  medico?: Medico;
}

export interface Receta {
  id?: number;
  fechaEmision: string;
  fechaExpiracion?: string;
  pacienteId: number;
  medicoId: number;
  dosis: string;
  frecuencia: string;
  duracion: string;
  instrucciones?: string;
  medicamentoId?: number;
  medicamentoNombre?: string;
  medicamentoTipo?: string;
  medicamentoDescripcion?: string;
  pacienteNombre?: string;
  pacienteEmail?: string;
  pacienteTelefono?: string;
  items?: ItemReceta[];
  paciente?: Paciente;
  medico?: Medico;
}

export interface ItemReceta {
  id?: number;
  medicamentoId: number;
  dosis: string;
  frecuencia: string;
  medicamento?: Medicamento;
}

export interface Medicamento {
  id?: number;
  nombre: string;
  descripcion: string;
  tipo?: string;
}

export interface Alergia {
  id?: number;
  nombre: string;
  descripcion?: string;
}

export interface HorarioAtencion {
  id?: number;
  diaSemana: DiaSemana;
  horaInicio: string;
  horaFin: string;
  medicoId: number;
}

// Enums
export enum Especialidad {
  MEDICINA_GENERAL = 'MEDICINA_GENERAL',
  CARDIOLOGIA = 'CARDIOLOGIA',
  NEUROLOGIA = 'NEUROLOGIA',
  PEDIATRIA = 'PEDIATRIA',
  DERMATOLOGIA = 'DERMATOLOGIA',
  GINECOLOGIA = 'GINECOLOGIA',
  TRAUMATOLOGIA = 'TRAUMATOLOGIA',
  PSIQUIATRIA = 'PSIQUIATRIA',
  OFTALMOLOGIA = 'OFTALMOLOGIA',
  OTORRINOLARINGOLOGIA = 'OTORRINOLARINGOLOGIA',
  UROLOGIA = 'UROLOGIA'
}

export enum EstadoCita {
  PROGRAMADA = 'PROGRAMADA',
  CANCELADA = 'CANCELADA',
  COMPLETADA = 'COMPLETADA'
}

export enum EstadoDoctor {
  ACTIVO = 'ACTIVO',
  INACTIVO = 'INACTIVO'
}

export enum DiaSemana {
  LUNES = 'LUNES',
  MARTES = 'MARTES',
  MIERCOLES = 'MIERCOLES',
  JUEVES = 'JUEVES',
  VIERNES = 'VIERNES',
  SABADO = 'SABADO',
  DOMINGO = 'DOMINGO'
}

// Request DTOs
export interface CitaRequest {
  medicoId: number;
  fecha: string;
  hora: string;
  motivo: string;
}

export interface RecetaRequest {
  pacienteId: number;
  medicamentoId: number;
  dosis: string;
  frecuencia: string;
  duracion: string;
  instrucciones?: string;
}

export interface SignUpRequest {
  nombre: string;
  email: string;
  password: string;
  numeroIdentificacion: string;
  fechaNacimiento: string;
  telefono?: string;
  direccion?: string;
}