import { Component, OnInit } from '@angular/core';
import { MedicalService } from '../../services/medical.service';
import { Cita, Medico } from '../../models/medical.models';

@Component({
  selector: 'app-medico-citas',
  templateUrl: './medico-citas.component.html',
  styleUrls: ['./medico-citas.component.css']
})
export class MedicoCitasComponent implements OnInit {

  citas: Cita[] = [];
  medico: Medico | null = null;
  
  isLoading = false;
  errorMessage = '';
  successMessage = '';
  
  constructor(
    private medicalService: MedicalService
  ) { }

  ngOnInit(): void {
    this.loadMedicoPerfil();
    this.loadMedicoCitas();
  }

  loadMedicoPerfil(): void {
    this.medicalService.getMedicoPerfil().subscribe({
      next: (medico) => {
        this.medico = medico;
      },
      error: (error) => {
        console.error('Error loading medico perfil:', error);
      }
    });
  }

  loadMedicoCitas(): void {
    this.isLoading = true;
    this.clearMessages();

    this.medicalService.getMedicoCitas().subscribe({
      next: (citas) => {
        this.citas = citas.sort((a, b) => {
          // Sort by date, then by time
          const dateComparison = new Date(a.fecha).getTime() - new Date(b.fecha).getTime();
          if (dateComparison !== 0) return dateComparison;
          return a.hora.localeCompare(b.hora);
        });
        this.isLoading = false;
        console.log('Medico citas loaded:', citas);
      },
      error: (error) => {
        console.error('Error loading medico citas:', error);
        this.isLoading = false;
        this.handleError(error, 'Error al cargar las citas');
      }
    });
  }

  completarCita(citaId: number): void {
    if (!confirm('¿Desea marcar esta cita como completada?')) {
      return;
    }

    this.medicalService.completarCita(citaId).subscribe({
      next: () => {
        this.successMessage = 'Cita marcada como completada exitosamente';
        this.loadMedicoCitas(); // Reload the list
      },
      error: (error) => {
        this.handleError(error, 'Error al completar la cita');
      }
    });
  }

  canCompleteCita(cita: Cita): boolean {
    // Can only complete if the appointment is today or past and not already completed
    const citaDate = new Date(`${cita.fecha}`);
    const today = new Date();
    today.setHours(0, 0, 0, 0);
    citaDate.setHours(0, 0, 0, 0);
    
    return citaDate <= today && cita.estado !== 'COMPLETADA';
  }

  getCardClass(estado: string): string {
    return estado.toLowerCase();
  }

  getEstadoClass(estado: string): string {
    return estado.toLowerCase();
  }

  getEstadoDisplay(estado: string): string {
    return this.medicalService.getEstadoCitaDisplay(estado);
  }

  getEspecialidadDisplay(especialidad: string): string {
    return this.medicalService.getEspecialidadDisplay(especialidad);
  }

  formatDate(date: string): string {
    return this.medicalService.formatDate(date);
  }

  private handleError(error: any, defaultMessage: string): void {
    if (error.status === 403) {
      this.errorMessage = 'No tiene permisos para realizar esta acción';
    } else if (error.status === 401) {
      this.errorMessage = 'Sesión expirada. Por favor, inicie sesión nuevamente';
    } else if (error.status === 400) {
      if (error.error?.message) {
        this.errorMessage = error.error.message;
      } else {
        this.errorMessage = 'Datos incorrectos. Verifique la información ingresada.';
      }
    } else if (error.status === 0) {
      this.errorMessage = 'Error de conexión con el servidor';
    } else {
      this.errorMessage = defaultMessage;
    }
  }

  private clearMessages(): void {
    this.errorMessage = '';
    this.successMessage = '';
  }
}