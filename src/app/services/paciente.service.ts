import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { PacienteRequest } from '../models/paciente-request';

@Injectable({
  providedIn: 'root'
})
export class PacienteService {

private apiUrl = 'http://localhost:8081/api/admin';


  constructor(private http: HttpClient) {}

  

 // Crear paciente
  registrarPaciente(request: PacienteRequest): Observable<any> {
    return this.http.post<any>(this.apiUrl, request);
  }

actualizarPaciente(id: number, request: any) {
  const token = localStorage.getItem('token'); 
  return this.http.put<any>(`${this.apiUrl}/pacientes/${id}`, request, {
    headers: { Authorization: `Bearer ${token}` }
  });
}

  // Obtener paciente por id
  obtenerPaciente(id: number): Observable<any> {
    return this.http.get<any>(`${this.apiUrl}/${id}`);
  }

eliminarPaciente(pacienteId: number, token: string) {
  return this.http.delete(`http://localhost:8081/api/admin/pacientes/${pacienteId}`, {
    headers: { Authorization: `Bearer ${token}` }
  });
}
}
