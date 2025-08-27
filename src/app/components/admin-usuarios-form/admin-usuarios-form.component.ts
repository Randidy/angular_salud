import { Component } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { HttpClient } from '@angular/common/http';

@Component({
  selector: 'app-admin-usuarios-form',
  templateUrl: './admin-usuarios-form.component.html',
  styleUrls: ['./admin-usuarios-form.component.css']
})
export class AdminUsuariosFormComponent {
  form: FormGroup;
  mensaje: string = '';
  error: string = '';

  constructor(private fb: FormBuilder, private http: HttpClient) {
    this.form = this.fb.group({
      usuario: ['', Validators.required],
      email: ['', [Validators.required, Validators.email]],
      password: ['', Validators.required]
    });
  }

  onSubmit() {
    if (this.form.valid) {
      const body = {
        nombre: this.form.value.usuario,
        email: this.form.value.email,
        password: this.form.value.password
      };

      // 👉 asegúrate de que esta URL apunte a tu backend
      this.http.post('http://localhost:8081/api/admin/usuarios', body).subscribe({
        next: (res: any) => {
          if (res.success) {
            this.mensaje = res.message;
            this.error = '';
            this.form.reset();
          } else {
            this.error = res.message;
            this.mensaje = '';
          }
        },
        error: (err) => {
          this.error = err.error?.message || 'Error en el servidor';
          this.mensaje = '';
        }
      });
    }
  }
}
