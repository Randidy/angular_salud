export interface PacienteRequest {
  nombre: string;
  email: string;
  password: string;
  numeroIdentificacion: string;
  fechaNacimiento: string; // yyyy-MM-dd
  telefono?: string;
  direccion?: string;
  alergiaIds?: number[];
}