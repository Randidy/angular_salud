import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { MedicalService } from '../../services/medical.service';
import { Cita, Medico, CitaRequest } from '../../models/medical.models';

@Component({
  selector: 'app-paciente-citas',
  templateUrl: './paciente-citas.component.html',
  styleUrls: ['./paciente-citas.component.css']
})
export class PacienteCitasComponent implements OnInit {

  citas: Cita[] = [];
  medicosDisponibles: Medico[] = [];
  
  isLoading = false;
  isSubmitting = false;
  errorMessage = '';
  successMessage = '';
  
  showSolicitarModal = false;
  citaForm: FormGroup;

  constructor(
    private medicalService: MedicalService,
    private fb: FormBuilder
  ) {
    this.citaForm = this.fb.group({
      medicoId: ['', [Validators.required]],
      fecha: ['', [Validators.required]],
      hora: ['', [Validators.required]],
      motivo: ['', [Validators.required, Validators.maxLength(500)]]
    });
  }

  ngOnInit(): void {
    this.loadCitas();
    this.loadMedicosDisponibles();
  }

  loadCitas(): void {
    this.isLoading = true;
    this.clearMessages();

    this.medicalService.getPacienteCitas().subscribe({
      next: (citas) => {
        this.citas = citas.sort((a, b) => {
          // Sort by date, then by time
          const dateComparison = new Date(a.fecha).getTime() - new Date(b.fecha).getTime();
          if (dateComparison !== 0) return dateComparison;
          return a.hora.localeCompare(b.hora);
        });
        this.isLoading = false;
      },
      error: (error) => {
        this.isLoading = false;
        this.handleError(error, 'Error al cargar las citas');
      }
    });
  }

  loadMedicosDisponibles(): void {
    this.medicalService.getMedicosDisponibles().subscribe({
      next: (medicos) => {
        this.medicosDisponibles = medicos;
      },
      error: (error) => {
        // Error loading médicos
      }
    });
  }

  solicitarCita(): void {
    this.showSolicitarModal = true;
    this.citaForm.reset();
  }

  closeSolicitarModal(): void {
    this.showSolicitarModal = false;
    this.citaForm.reset();
  }

  onSubmitCita(): void {
    if (this.citaForm.invalid || this.isSubmitting) {
      this.citaForm.markAllAsTouched();
      return;
    }

    this.isSubmitting = true;
    this.clearMessages();

    const citaRequest: CitaRequest = {
      medicoId: parseInt(this.citaForm.value.medicoId),
      fecha: this.citaForm.value.fecha,
      hora: this.citaForm.value.hora,
      motivo: this.citaForm.value.motivo
    };

    this.medicalService.solicitarCita(citaRequest).subscribe({
      next: (cita) => {
        this.isSubmitting = false;
        this.successMessage = 'Cita solicitada exitosamente';
        this.closeSolicitarModal();
        this.loadCitas(); // Reload the list
      },
      error: (error) => {
        this.isSubmitting = false;
        this.handleError(error, 'Error al solicitar la cita');
      }
    });
  }

  modificarCita(cita: Cita): void {
    // TODO: Implement modify functionality
    alert(`Modificar cita funcionalidad pendiente. Cita ID: ${cita.id}`);
  }

  cancelarCita(citaId: number): void {
    if (!confirm('¿Está seguro de que desea cancelar esta cita?')) {
      return;
    }

    this.medicalService.cancelarCita(citaId).subscribe({
      next: () => {
        this.successMessage = 'Cita cancelada exitosamente';
        this.loadCitas(); // Reload the list
      },
      error: (error) => {
        this.handleError(error, 'Error al cancelar la cita');
      }
    });
  }

  canModifyCita(cita: Cita): boolean {
    // Can only modify if the appointment is more than 2 hours away
    const citaDateTime = new Date(`${cita.fecha}T${cita.hora}`);
    const now = new Date();
    const timeDiff = citaDateTime.getTime() - now.getTime();
    const hoursDiff = timeDiff / (1000 * 3600);
    return hoursDiff > 2;
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

  getMinDate(): string {
    // Return tomorrow's date as minimum
    const tomorrow = new Date();
    tomorrow.setDate(tomorrow.getDate() + 1);
    return tomorrow.toISOString().split('T')[0];
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