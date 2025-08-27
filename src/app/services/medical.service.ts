import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { AuthService } from './auth.service';
import { ApiResponse } from '../models/api-response.model';
import {
  Paciente, Medico, Cita, Receta, Medicamento, Alergia,
  CitaRequest, RecetaRequest, SignUpRequest
} from '../models/medical.models';

@Injectable({
  providedIn: 'root'
})
export class MedicalService {

  private apiUrl = 'http://localhost:8081/api';

  constructor(
    private http: HttpClient,
    private authService: AuthService
  ) {}

  // ===================== AUTHENTICATION =====================
  register(userData: SignUpRequest): Observable<any> {
    return this.http.post(`${this.apiUrl}/auth/register`, userData);
  }

 getAllPacientes(): Observable<ApiResponse<Paciente[]>> {
  return this.http.get<ApiResponse<Paciente[]>>(`${this.apiUrl}/admin/pacientes`, {
    headers: this.authService.getAuthHeaders()
  });
}

  createPaciente(paciente: Paciente): Observable<Paciente> {
    return this.http.post<Paciente>(`${this.apiUrl}/admin/pacientes`, paciente, {
      headers: this.authService.getAuthHeaders()
    });
  }

  updatePaciente(id: number, paciente: Paciente): Observable<Paciente> {
    return this.http.put<Paciente>(`${this.apiUrl}/admin/pacientes/${id}`, paciente, {
      headers: this.authService.getAuthHeaders()
    });
  }

  createMedico(medico: Medico): Observable<Medico> {
    return this.http.post<Medico>(`${this.apiUrl}/admin/medicos`, medico, {
      headers: this.authService.getAuthHeaders()
    });
  }

  updateMedico(id: number, medico: Medico): Observable<Medico> {
    return this.http.put<Medico>(`${this.apiUrl}/admin/medicos/${id}`, medico, {
      headers: this.authService.getAuthHeaders()
    });
  }

  getAllCitas(): Observable<Cita[]> {
    return this.http.get<Cita[]>(`${this.apiUrl}/citas`, {
      headers: this.authService.getAuthHeaders()
    });
  }

  getAllRecetas(): Observable<Receta[]> {
    return this.http.get<Receta[]>(`${this.apiUrl}/recetas`, {
      headers: this.authService.getAuthHeaders()
    });
  }

  getAllMedicos(): Observable<Medico[]> {
    return this.http.get<Medico[]>(`${this.apiUrl}/medico`, {
      headers: this.authService.getAuthHeaders()
    });
  }

  // ===================== MEDICO ENDPOINTS =====================
  getMedicoPerfil(): Observable<Medico> {
    return this.http.get<Medico>(`${this.apiUrl}/medico/perfil`, {
      headers: this.authService.getAuthHeaders()
    });
  }

  getMedicoCitas(): Observable<Cita[]> {
    return this.http.get<Cita[]>(`${this.apiUrl}/citas/medico`, {
      headers: this.authService.getAuthHeaders()
    });
  }

  completarCita(citaId: number): Observable<Cita> {
    return this.http.put<Cita>(`${this.apiUrl}/citas/${citaId}/completar`, {}, {
      headers: this.authService.getAuthHeaders()
    });
  }

  emitirReceta(receta: RecetaRequest): Observable<Receta> {
    return this.http.post<Receta>(`${this.apiUrl}/recetas/nueva`, receta, {
      headers: this.authService.getAuthHeaders()
    });
  }

  getMedicoRecetas(): Observable<Receta[]> {
    return this.http.get<Receta[]>(`${this.apiUrl}/recetas/medico`, {
      headers: this.authService.getAuthHeaders()
    });
  }

  // ===================== PACIENTE ENDPOINTS =====================
  getPacientePerfil(): Observable<Paciente> {
    return this.http.get<Paciente>(`${this.apiUrl}/paciente/perfil`, {
      headers: this.authService.getAuthHeaders()
    });
  }

  getPacienteExpediente(): Observable<any> {
    return this.http.get(`${this.apiUrl}/paciente/expediente`, {
      headers: this.authService.getAuthHeaders()
    });
  }

  getPacienteCitas(): Observable<Cita[]> {
    return this.http.get<Cita[]>(`${this.apiUrl}/citas/mis-citas`, {
      headers: this.authService.getAuthHeaders()
    });
  }

  solicitarCita(cita: CitaRequest): Observable<Cita> {
    return this.http.post<Cita>(`${this.apiUrl}/citas/nueva`, cita, {
      headers: this.authService.getAuthHeaders()
    });
  }

  modificarCita(citaId: number, cita: Partial<Cita>): Observable<Cita> {
    return this.http.put<Cita>(`${this.apiUrl}/citas/${citaId}`, cita, {
      headers: this.authService.getAuthHeaders()
    });
  }

  cancelarCita(citaId: number): Observable<Cita> {
    return this.http.put<Cita>(`${this.apiUrl}/citas/${citaId}/cancelar`, {}, {
      headers: this.authService.getAuthHeaders()
    });
  }

  getPacienteRecetas(): Observable<Receta[]> {
    return this.http.get<Receta[]>(`${this.apiUrl}/recetas/mis-recetas`, {
      headers: this.authService.getAuthHeaders()
    });
  }

  // ===================== COMMON ENDPOINTS =====================
  getMedicosDisponibles(): Observable<Medico[]> {
    return this.http.get<Medico[]>(`${this.apiUrl}/medico/disponibles`, {
      headers: this.authService.getAuthHeaders()
    });
  }

  getMedico(id: number): Observable<Medico> {
    return this.http.get<Medico>(`${this.apiUrl}/medico/${id}`, {
      headers: this.authService.getAuthHeaders()
    });
  }

  getReceta(id: number): Observable<Receta> {
    return this.http.get<Receta>(`${this.apiUrl}/recetas/${id}`, {
      headers: this.authService.getAuthHeaders()
    });
  }

  // ===================== MEDICAMENTOS =====================
  getMedicamentos(): Observable<Medicamento[]> {
    return this.http.get<Medicamento[]>(`${this.apiUrl}/medicamentos`, {
      headers: this.authService.getAuthHeaders()
    });
  }

  getMedicamento(id: number): Observable<Medicamento> {
    return this.http.get<Medicamento>(`${this.apiUrl}/medicamentos/${id}`, {
      headers: this.authService.getAuthHeaders()
    });
  }

  buscarMedicamentos(query: string): Observable<Medicamento[]> {
    return this.http.get<Medicamento[]>(`${this.apiUrl}/medicamentos/buscar?q=${query}`, {
      headers: this.authService.getAuthHeaders()
    });
  }

  // Admin only medicamento operations
  createMedicamento(medicamento: Medicamento): Observable<Medicamento> {
    return this.http.post<Medicamento>(`${this.apiUrl}/medicamentos`, medicamento, {
      headers: this.authService.getAuthHeaders()
    });
  }

  updateMedicamento(id: number, medicamento: Medicamento): Observable<Medicamento> {
    return this.http.put<Medicamento>(`${this.apiUrl}/medicamentos/${id}`, medicamento, {
      headers: this.authService.getAuthHeaders()
    });
  }

  deleteMedicamento(id: number): Observable<void> {
    return this.http.delete<void>(`${this.apiUrl}/medicamentos/${id}`, {
      headers: this.authService.getAuthHeaders()
    });
  }

  // ===================== UTILITY METHODS =====================
  formatDate(date: string): string {
    return new Date(date).toLocaleDateString('es-ES');
  }

  formatDateTime(date: string): string {
    return new Date(date).toLocaleString('es-ES');
  }

  getEspecialidadDisplay(especialidad: string): string {
    const especialidades: { [key: string]: string } = {
      'MEDICINA_GENERAL': 'Medicina General',
      'CARDIOLOGIA': 'Cardiología',
      'NEUROLOGIA': 'Neurología',
      'PEDIATRIA': 'Pediatría',
      'DERMATOLOGIA': 'Dermatología',
      'GINECOLOGIA': 'Ginecología',
      'TRAUMATOLOGIA': 'Traumatología',
      'PSIQUIATRIA': 'Psiquiatría',
      'OFTALMOLOGIA': 'Oftalmología',
      'OTORRINOLARINGOLOGIA': 'Otorrinolaringología',
      'UROLOGIA': 'Urología'
    };
    return especialidades[especialidad] || especialidad;
  }

  getEstadoCitaDisplay(estado: string): string {
    const estados: { [key: string]: string } = {
      'PROGRAMADA': 'Programada',
      'CANCELADA': 'Cancelada',
      'COMPLETADA': 'Completada'
    };
    return estados[estado] || estado;
  }
}
