import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { PacienteService } from '../../services/paciente.service';
import { Paciente } from '../../models/medical.models';

@Component({
  selector: 'app-admin-pacientes',
  templateUrl: './admin-pacientes.component.html',
  styleUrls: ['./admin-pacientes.component.css']
})
export class AdminPacientesComponent implements OnInit {

  pacientes: Paciente[] = [];
  isLoading = false;
  errorMessage = '';
  successMessage = '';

  constructor(
    private pacienteService: PacienteService,
    private router: Router
  ) {}

  ngOnInit(): void {
    this.loadPacientes();
  }

  loadPacientes(): void {
    this.isLoading = true;
    this.clearMessages();

    this.pacienteService.getAllPacientes().subscribe({
      next: (res) => {
        this.pacientes = res.data; 
        this.successMessage = res.message;
        this.isLoading = false;
      },
      error: (err) => {
        this.isLoading = false;
        this.handleError(err, 'Error al cargar la lista de pacientes');
      }
    });
  }

  editPaciente(paciente: Paciente): void {
  this.router.navigate(['/admin/pacientes/editar', paciente.id]);
}

  deletePaciente(pacienteId: number): void {
    if (!confirm('¿Está seguro de que desea eliminar este paciente? Esta acción no se puede deshacer.')) {
      return;
    }

    this.pacienteService.eliminarPaciente(pacienteId).subscribe({
      next: () => {
        this.successMessage = 'Paciente eliminado correctamente';
        this.loadPacientes();
      },
      error: (err) => this.handleError(err, 'Error al eliminar el paciente')
    });
  }

  calculateAge(fechaNacimiento: string): number {
    const birthDate = new Date(fechaNacimiento);
    const today = new Date();
    let age = today.getFullYear() - birthDate.getFullYear();
    const monthDiff = today.getMonth() - birthDate.getMonth();
    if (monthDiff < 0 || (monthDiff === 0 && today.getDate() < birthDate.getDate())) age--;
    return age;
  }

  private handleError(error: any, defaultMessage: string): void {
    if (error?.status === 403) this.errorMessage = 'No tiene permisos para realizar esta acción';
    else if (error?.status === 401) {
      this.errorMessage = 'Sesión expirada. Por favor, inicie sesión nuevamente';
      setTimeout(() => this.router.navigate(['/login']), 2000);
    } else if (error?.status === 0) this.errorMessage = 'Error de conexión con el servidor';
    else if (error?.error?.message) this.errorMessage = error.error.message;
    else this.errorMessage = defaultMessage;
  }

  private clearMessages(): void {
    this.errorMessage = '';
    this.successMessage = '';
  }
}
