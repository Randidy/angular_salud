import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { PacienteService } from '../../services/paciente.service';

@Component({
  selector: 'app-paciente-editar',
  templateUrl: './paciente-editar.component.html',
  styleUrls: ['./paciente-editar.component.css']
})
export class PacienteEditarComponent implements OnInit {

  pacienteForm: FormGroup;
  successMessage = '';
  errorMessage = '';
  pacienteId!: number;
  isLoading = true;

  constructor(
    private fb: FormBuilder,
    private pacienteService: PacienteService,
    private router: Router,
    private route: ActivatedRoute
  ) {
    this.pacienteForm = this.fb.group({
      nombre: ['', Validators.required],
      numeroIdentificacion: ['', Validators.required],
      fechaNacimiento: ['', Validators.required],
      telefono: [''],
      direccion: ['']
    });
  }

  ngOnInit(): void {
  const id = this.route.snapshot.paramMap.get('id');
  if (id) {
    this.pacienteService.obtenerPaciente(+id).subscribe(paciente => {
      this.pacienteForm.patchValue(paciente);
    });
  }
}

  cargarPaciente() {
    this.pacienteService.obtenerPaciente(this.pacienteId).subscribe({
      next: (paciente) => {
        this.pacienteForm.patchValue({
          nombre: paciente.nombre,
          numeroIdentificacion: paciente.numeroIdentificacion,
          fechaNacimiento: paciente.fechaNacimiento,
          telefono: paciente.telefono,
          direccion: paciente.direccion
        });
        this.isLoading = false;
      },
      error: (err) => {
        this.errorMessage = 'Error al cargar paciente';
        this.isLoading = false;
      }
    });
  }

  actualizarPaciente() {
    if (this.pacienteForm.invalid) {
      this.errorMessage = 'Completa los campos obligatorios';
      return;
    }

    this.pacienteService.actualizarPaciente(this.pacienteId, this.pacienteForm.value).subscribe({
      next: (res) => {
        this.successMessage = 'Paciente actualizado correctamente ✅';
        this.errorMessage = '';
        setTimeout(() => this.router.navigate(['/admin/pacientes']), 1500);
      },
      error: (err) => {
        this.errorMessage = err.error?.message || 'Error al actualizar paciente';
        this.successMessage = '';
      }
    });
  }


}
