import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { MedicalService } from '../../services/medical.service';
import { Receta, Medicamento, RecetaRequest } from '../../models/medical.models';

@Component({
  selector: 'app-medico-recetas',
  templateUrl: './medico-recetas.component.html',
  styleUrls: ['./medico-recetas.component.css']
})
export class MedicoRecetasComponent implements OnInit {

  recetas: Receta[] = [];
  medicamentos: Medicamento[] = [];
  
  isLoading = false;
  isSubmitting = false;
  errorMessage = '';
  successMessage = '';
  
  showNuevaRecetaModal = false;
  recetaForm: FormGroup;

  constructor(
    private medicalService: MedicalService,
    private fb: FormBuilder
  ) {
    this.recetaForm = this.fb.group({
      pacienteId: ['', [Validators.required]],
      medicamentoId: ['', [Validators.required]],
      dosis: ['', [Validators.required, Validators.maxLength(100)]],
      frecuencia: ['', [Validators.required, Validators.maxLength(100)]],
      duracion: ['', [Validators.required, Validators.maxLength(100)]],
      instrucciones: ['', [Validators.maxLength(500)]]
    });
  }

  ngOnInit(): void {
    this.loadRecetas();
    this.loadMedicamentos();
  }

  loadRecetas(): void {
    this.isLoading = true;
    this.clearMessages();

    this.medicalService.getMedicoRecetas().subscribe({
      next: (recetas) => {
        this.recetas = recetas.sort((a, b) => {
          return new Date(b.fechaEmision).getTime() - new Date(a.fechaEmision).getTime();
        });
        this.isLoading = false;
        console.log('Recetas loaded:', recetas);
      },
      error: (error) => {
        console.error('Error loading recetas:', error);
        this.isLoading = false;
        this.handleError(error, 'Error al cargar las recetas');
      }
    });
  }

  loadMedicamentos(): void {
    this.medicalService.getMedicamentos().subscribe({
      next: (medicamentos) => {
        this.medicamentos = medicamentos;
        console.log('Medicamentos loaded:', medicamentos);
      },
      error: (error) => {
        console.error('Error loading medicamentos:', error);
      }
    });
  }

  nuevaReceta(): void {
    this.showNuevaRecetaModal = true;
    this.recetaForm.reset();
  }

  closeNuevaRecetaModal(): void {
    this.showNuevaRecetaModal = false;
    this.recetaForm.reset();
  }

  onSubmitReceta(): void {
    if (this.recetaForm.invalid || this.isSubmitting) {
      this.recetaForm.markAllAsTouched();
      return;
    }

    this.isSubmitting = true;
    this.clearMessages();

    const recetaRequest: RecetaRequest = {
      pacienteId: parseInt(this.recetaForm.value.pacienteId),
      medicamentoId: parseInt(this.recetaForm.value.medicamentoId),
      dosis: this.recetaForm.value.dosis,
      frecuencia: this.recetaForm.value.frecuencia,
      duracion: this.recetaForm.value.duracion,
      instrucciones: this.recetaForm.value.instrucciones || ''
    };

    this.medicalService.emitirReceta(recetaRequest).subscribe({
      next: (receta) => {
        this.isSubmitting = false;
        this.successMessage = 'Receta emitida exitosamente';
        this.closeNuevaRecetaModal();
        this.loadRecetas(); // Reload the list
        console.log('Receta created:', receta);
      },
      error: (error) => {
        console.error('Error creating receta:', error);
        this.isSubmitting = false;
        this.handleError(error, 'Error al emitir la receta');
      }
    });
  }

  formatDate(date: string): string {
    return this.medicalService.formatDate(date);
  }

  formatDateTime(date: string): string {
    return this.medicalService.formatDateTime(date);
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