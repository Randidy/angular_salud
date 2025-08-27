import { Component, OnInit } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Router } from '@angular/router';

@Component({
  selector: 'app-admin-usuarios-list',
  templateUrl: './admin-usuarios-list.component.html',
  styleUrls: ['./admin-usuarios-list.component.css']
})
export class AdminUsuariosListComponent implements OnInit {
  administradores: any[] = [];
  mensaje: string = '';
  error: string = '';

  constructor(private http: HttpClient, private router: Router) {}

  ngOnInit(): void {
    this.cargarAdministradores();
  }

  private getHeaders(): HttpHeaders {
    const token = localStorage.getItem('token');
    if (!token) {
      this.error = 'No se encontró token de autenticación';
      setTimeout(() => this.router.navigate(['/login']), 2000);
      throw new Error('No token');
    }
    return new HttpHeaders({ Authorization: `Bearer ${token}` });
  }

  cargarAdministradores() {
    try {
      this.http.get('http://localhost:8081/api/admin/usuarios', { headers: this.getHeaders() })
      .subscribe({
        next: (res: any) => {
          if (res.success) {
            this.administradores = res.data;
            this.mensaje = res.message;
            this.error = '';
          } else {
            this.error = res.message;
            this.mensaje = '';
          }
        },
        error: (err) => {
          this.error = err.error?.message || 'Error en el servidor';
          this.mensaje = '';
          if (err.status === 401) this.router.navigate(['/login']);
        }
      });
    } catch {}
  }

  eliminarAdmin(id: number) {
    if (!confirm('¿Seguro que deseas eliminar este administrador?')) return;

    try {
      this.http.delete(`http://localhost:8081/api/admin/usuarios/${id}`, { headers: this.getHeaders() })
      .subscribe({
        next: (res: any) => {
          this.mensaje = res.message;
          this.error = '';
          this.cargarAdministradores(); // refrescar lista
        },
        error: (err) => {
          this.error = err.error?.message || 'Error al eliminar';
          this.mensaje = '';
          if (err.status === 401) this.router.navigate(['/login']);
        }
      });
    } catch {}
  }

  actualizarAdmin(id: number, request: any) {
    try {
      this.http.put(`http://localhost:8081/api/admin/usuarios/${id}`, request, { headers: this.getHeaders() })
      .subscribe({
        next: (res: any) => {
          this.mensaje = res.message;
          this.error = '';
          this.cargarAdministradores(); // refrescar lista
        },
        error: (err) => {
          this.error = err.error?.message || 'Error al actualizar';
          this.mensaje = '';
          if (err.status === 401) this.router.navigate(['/login']);
        }
      });
    } catch {}
  }
}
