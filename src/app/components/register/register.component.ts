import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators, AbstractControl } from '@angular/forms';
import { Router } from '@angular/router';
import { MedicalService } from '../../services/medical.service';
import { SignUpRequest } from '../../models/medical.models';

@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.css']
})
export class RegisterComponent implements OnInit {

  registerForm: FormGroup;
  isLoading = false;
  errorMessage = '';
  successMessage = '';

  constructor(
    private fb: FormBuilder,
    private medicalService: MedicalService,
    private router: Router
  ) {
    this.registerForm = this.fb.group({
      nombre: ['', [Validators.required]],
      numeroIdentificacion: ['', [Validators.required]],
      fechaNacimiento: ['', [Validators.required]],
      telefono: [''],
      direccion: [''],
      email: ['', [Validators.required, Validators.email]],
      password: ['', [Validators.required, Validators.minLength(6)]],
      confirmPassword: ['', [Validators.required]]
    }, { validators: this.passwordMatchValidator });
  }

  ngOnInit(): void {
  }

  passwordMatchValidator(control: AbstractControl): { [key: string]: boolean } | null {
    const password = control.get('password');
    const confirmPassword = control.get('confirmPassword');
    
    if (!password || !confirmPassword) {
      return null;
    }
    
    return password.value === confirmPassword.value ? null : { passwordMismatch: true };
  }

  onRegister(): void {
    if (this.registerForm.invalid || this.isLoading) {
      this.registerForm.markAllAsTouched();
      return;
    }

    this.clearMessages();
    this.isLoading = true;

    const formData = this.registerForm.value;
    const signUpRequest: SignUpRequest = {
      nombre: formData.nombre,
      email: formData.email,
      password: formData.password,
      numeroIdentificacion: formData.numeroIdentificacion,
      fechaNacimiento: formData.fechaNacimiento,
      telefono: formData.telefono,
      direccion: formData.direccion
    };

    this.medicalService.register(signUpRequest).subscribe({
      next: (response) => {
        console.log('Registration successful:', response);
        this.isLoading = false;
        this.successMessage = '¡Registro exitoso! Redirigiendo al login...';
        
        // Redirect to login after 2 seconds
        setTimeout(() => {
          this.router.navigate(['/login'], { 
            queryParams: { registrado: 'true' } 
          });
        }, 2000);
      },
      error: (error) => {
        console.error('Registration error:', error);
        this.isLoading = false;
        this.handleRegistrationError(error);
      }
    });
  }

  private handleRegistrationError(error: any): void {
    if (error.status === 400) {
      if (error.error?.message) {
        this.errorMessage = error.error.message;
      } else if (error.error?.errors) {
        // Handle validation errors
        const errors = Object.values(error.error.errors).join(', ');
        this.errorMessage = `Errores de validación: ${errors}`;
      } else {
        this.errorMessage = 'Datos incorrectos. Verifique la información ingresada.';
      }
    } else if (error.status === 409) {
      this.errorMessage = 'Ya existe un usuario con este email o número de identificación.';
    } else if (error.status === 0) {
      this.errorMessage = 'Error de conexión. Verifique que el servidor esté funcionando.';
    } else if (error.status === 500) {
      this.errorMessage = 'Error interno del servidor. Inténtelo más tarde.';
    } else {
      this.errorMessage = 'Ocurrió un error inesperado. Inténtelo nuevamente.';
    }
  }

  private clearMessages(): void {
    this.errorMessage = '';
    this.successMessage = '';
  }

  // Getters for template access
  get nombre() { return this.registerForm.get('nombre'); }
  get numeroIdentificacion() { return this.registerForm.get('numeroIdentificacion'); }
  get fechaNacimiento() { return this.registerForm.get('fechaNacimiento'); }
  get telefono() { return this.registerForm.get('telefono'); }
  get direccion() { return this.registerForm.get('direccion'); }
  get email() { return this.registerForm.get('email'); }
  get password() { return this.registerForm.get('password'); }
  get confirmPassword() { return this.registerForm.get('confirmPassword'); }
}