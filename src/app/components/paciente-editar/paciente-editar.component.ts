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
    // Agregar el email al FormGroup
    this.pacienteForm = this.fb.group({
      nombre: ['', Validators.required],
      numeroIdentificacion: ['', Validators.required],
      fechaNacimiento: ['', Validators.required],
      telefono: [''],
      direccion: [''],
      email: ['', [Validators.required, Validators.email]]  // Email del usuario
    });
  }

  ngOnInit(): void {
    const idParam = this.route.snapshot.paramMap.get('id');
    if (idParam) {
      this.pacienteId = +idParam;
      this.loadPaciente();
    }
  }

  private loadPaciente(): void {
    this.pacienteService.obtenerPacienteCompleto(this.pacienteId).subscribe({
      next: (res) => {
        const paciente = res.data;
        this.pacienteForm.patchValue({
          nombre: paciente.nombre,
          numeroIdentificacion: paciente.numeroIdentificacion,
          fechaNacimiento: paciente.fechaNacimiento,
          telefono: paciente.telefono,
          direccion: paciente.direccion,
          email: paciente.usuario?.email  // Cargar el email del usuario
        });
        this.isLoading = false;
      },
      error: (err) => {
        this.errorMessage = err.error?.message || 'Error al cargar paciente';
        this.isLoading = false;
      }
    });
  }

  actualizarPaciente(): void {
    if (this.pacienteForm.invalid) {
      this.errorMessage = 'Completa los campos obligatorios';
      this.successMessage = '';
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
