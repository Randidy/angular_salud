import { Component } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { PacienteService } from '../../services/paciente.service';
import { PacienteRequest } from '../../models/paciente-request';

@Component({
  selector: 'app-paciente-formulario',
  templateUrl: './paciente-formulario.component.html',
  styleUrls: ['./paciente-formulario.component.css']
})
export class PacienteFormularioComponent {

  pacienteForm: FormGroup;
  successMessage = '';
  errorMessage = '';

  constructor(
    private fb: FormBuilder,
    private pacienteService: PacienteService,
    private router: Router
  ) {
      this.pacienteForm = this.fb.group({
    nombre: ['', Validators.required],
    numeroIdentificacion: ['', Validators.required],
    fechaNacimiento: ['', Validators.required],
    telefono: [''],
    direccion: [''],
    email: ['', [Validators.required, Validators.email]],
    password: ['', Validators.required],
    alergiaIds: [[]] // opcional, array vacío por defecto
  }); 
  }

  registrarPaciente() {
    if (this.pacienteForm.invalid) {
      this.errorMessage = 'Por favor completa todos los campos obligatorios.';
      return;
    }

    const request: PacienteRequest = this.pacienteForm.value;

    this.pacienteService.registrarPaciente(request).subscribe({
      next: (res) => {
        this.successMessage = 'Paciente registrado exitosamente ✅';
        this.errorMessage = '';
        setTimeout(() => this.router.navigate(['/admin/pacientes']), 1500);
      },
      error: (err) => {
        this.errorMessage = err.error?.message || 'Error al registrar paciente';
        this.successMessage = '';
      }
    });
  }

  alergias = [
  { id: 1, nombre: 'Alergia a la penicilina' },
  { id: 2, nombre: 'Alergia a los frutos secos' },
  { id: 3, nombre: 'Alergia a la lactosa' }
];
}
