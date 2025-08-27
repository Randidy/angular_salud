import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { PacienteRequest } from '../models/paciente-request';

@Injectable({
  providedIn: 'root'
})
export class PacienteService {

  private apiUrl = 'http://localhost:8081/api/admin/pacientes'; 
    private apedit ='http://localhost:8081/admin/paciente/${id}';

  constructor(private http: HttpClient) {}

  // Crear paciente
  registrarPaciente(request: PacienteRequest): Observable<any> {
    const token = localStorage.getItem('token') || '';
    return this.http.post<any>(this.apiUrl, request, {
      headers: { Authorization: `Bearer ${token}` }
    });
  }

  // Actualizar paciente
  actualizarPaciente(id: number, request: any): Observable<any> {
    const token = localStorage.getItem('token') || '';
    return this.http.put<any>(`${this.apedit}/${id}`, request, {
      headers: { Authorization: `Bearer ${token}` }
    });
  }
  

  // Obtener paciente por id
 obtenerPacienteCompleto(id: number): Observable<any> {
  const token = localStorage.getItem('token') || '';
  return this.http.get<any>(`http://localhost:8081/admin/paciente/${id}`, {
    headers: { Authorization: `Bearer ${token}` }
  });
}

  // Eliminar paciente
  eliminarPaciente(id: number): Observable<any> {
    const token = localStorage.getItem('token') || '';
    return this.http.delete<any>(`${this.apiUrl}/${id}`, {
      headers: { Authorization: `Bearer ${token}` }
    });
  }

  // Listar todos los pacientes
  getAllPacientes(): Observable<any> {
    const token = localStorage.getItem('token') || '';
    return this.http.get<any>(this.apiUrl, {
      headers: { Authorization: `Bearer ${token}` }
    });
  }
}
