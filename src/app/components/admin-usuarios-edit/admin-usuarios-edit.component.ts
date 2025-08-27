import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { HttpClient } from '@angular/common/http';

@Component({
  selector: 'app-admin-usuarios-edit',
  templateUrl: './admin-usuarios-edit.component.html',
  styleUrls: ['./admin-usuarios-edit.component.css']
})
export class AdminUsuariosEditComponent implements OnInit {
  form: FormGroup;
  mensaje: string = '';
  error: string = '';
  id: number = 0;

  constructor(
    private fb: FormBuilder,
    private http: HttpClient,
    private route: ActivatedRoute,
    private router: Router
  ) {
    this.form = this.fb.group({
      nombre: ['', Validators.required],
      email: ['', [Validators.required, Validators.email]],
      password: [''] // opcional, solo si quieres cambiarlo
    });
  }

  ngOnInit(): void {
    this.id = +this.route.snapshot.paramMap.get('id')!;

    // cargar datos del admin
    this.http.get<any>(`http://localhost:8081/api/admin/usuarios`)
      .subscribe({
        next: (res) => {
          const admin = res.data.find((a: any) => a.id === this.id);
          if (admin) {
            this.form.patchValue({
              nombre: admin.name,
              email: admin.email
            });
          }
        },
        error: () => {
          this.error = 'No se pudo cargar el administrador';
        }
      });
  }

  onSubmit() {
    if (this.form.valid) {
      this.http.put(`http://localhost:8081/api/admin/usuarios/${this.id}`, this.form.value)
        .subscribe({
          next: (res: any) => {
            this.mensaje = res.message;
            this.error = '';
            setTimeout(() => this.router.navigate(['/admin/usuarios']), 1500);
          },
          error: (err) => {
            this.error = err.error?.message || 'Error en el servidor';
            this.mensaje = '';
          }
        });
    }
  }
}
