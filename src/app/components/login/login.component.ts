import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router, ActivatedRoute } from '@angular/router';
import { AuthService } from '../../services/auth.service';
import { UserRole } from '../../models/auth.models';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {
  
  loginForm: FormGroup;
  isLoading = false;
  errorMessage = '';
  successMessage = '';

  constructor(
    private fb: FormBuilder,
    private authService: AuthService,
    private router: Router,
    private route: ActivatedRoute
  ) {
    this.loginForm = this.fb.group({
      email: ['', [Validators.required, Validators.email]],
      password: ['', [Validators.required, Validators.minLength(6)]]
    });
  }

  ngOnInit(): void {
    // Check if user is already authenticated
    if (this.authService.hasValidToken()) {
      this.redirectBasedOnRole();
      return;
    }

    // Check for query parameters
    this.route.queryParams.subscribe(params => {
      if (params['registrado']) {
        this.successMessage = 'Registro exitoso. Ahora puedes iniciar sesión.';
      }
      if (params['logout']) {
        this.successMessage = 'Sesión cerrada correctamente.';
      }
    });
  }

  onLogin(): void {
    if (this.loginForm.invalid || this.isLoading) {
      this.loginForm.markAllAsTouched();
      return;
    }

    this.clearMessages();
    this.isLoading = true;

    const credentials = {
      email: this.loginForm.value.email,
      password: this.loginForm.value.password
    };

    this.authService.login(credentials).subscribe({
      next: (response) => {
        this.isLoading = false;
        this.redirectBasedOnRole();
      },
      error: (error) => {
        this.isLoading = false;
        this.handleLoginError(error);
      }
    });
  }

  fillTestUser(userType: string): void {
    const testUsers = {
      'admin': { email: 'admin@saludvital.com', password: 'admin123' },
      'medico': { email: 'medico@saludvital.com', password: 'medico123' },
      'paciente': { email: 'paciente@saludvital.com', password: 'paciente123' }
    };

    const user = testUsers[userType as keyof typeof testUsers];
    if (user) {
      this.loginForm.patchValue({
        email: user.email,
        password: user.password
      });
      this.clearMessages();
    }
  }

  private redirectBasedOnRole(): void {
    const user = this.authService.getCurrentUser();
    
    if (!user || !user.roles) {
      this.router.navigate(['/login']);
      return;
    }

    if (user.roles.includes(UserRole.ADMIN)) {
      this.router.navigate(['/admin/dashboard']);
    } else if (user.roles.includes(UserRole.MEDICO)) {
      this.router.navigate(['/medico/dashboard']);
    } else if (user.roles.includes(UserRole.PACIENTE)) {
      this.router.navigate(['/paciente/dashboard']);
    } else {
      this.router.navigate(['/login']);
    }
  }

  private handleLoginError(error: any): void {
    if (error.status === 401) {
      this.errorMessage = 'Email o contraseña incorrectos. Verifica tus credenciales.';
    } else if (error.status === 0) {
      this.errorMessage = 'Error de conexión. Verifica que el servidor esté funcionando en puerto 8081.';
    } else if (error.status === 403) {
      this.errorMessage = 'Acceso denegado. Tu cuenta puede estar desactivada.';
    } else if (error.status === 500) {
      this.errorMessage = 'Error interno del servidor. Inténtalo más tarde.';
    } else if (error.error?.message) {
      this.errorMessage = error.error.message;
    } else {
      this.errorMessage = 'Ocurrió un error inesperado. Inténtalo nuevamente.';
    }
  }

  private clearMessages(): void {
    this.errorMessage = '';
    this.successMessage = '';
  }

  // Getter for easy access to form controls in template
  get email() { return this.loginForm.get('email'); }
  get password() { return this.loginForm.get('password'); }
}