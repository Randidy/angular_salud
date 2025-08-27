import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { LoginComponent } from './components/login/login.component';
import { RegisterComponent } from './components/register/register.component';
import { AdminDashboardComponent } from './components/admin-dashboard/admin-dashboard.component';
import { MedicoDashboardComponent } from './components/medico-dashboard/medico-dashboard.component';
import { PacienteDashboardComponent } from './components/paciente-dashboard/paciente-dashboard.component';
import { AdminPacientesComponent } from './components/admin-pacientes/admin-pacientes.component';
import { PacienteFormularioComponent } from './components/paciente-formulario/paciente-formulario.component';
import { PacienteCitasComponent } from './components/paciente-citas/paciente-citas.component';
import { MedicoCitasComponent } from './components/medico-citas/medico-citas.component';
import { MedicoRecetasComponent } from './components/medico-recetas/medico-recetas.component';
import { AuthGuard } from './guards/auth.guard';
import { UserRole } from './models/auth.models';
import { PacienteEditarComponent } from './components/paciente-editar/paciente-editar.component';


// 👇 importa tu nuevo componente
import { AdminUsuariosFormComponent } from './components/admin-usuarios-form/admin-usuarios-form.component';
import { AdminUsuariosListComponent } from './components/admin-usuarios-list/admin-usuarios-list.component';
import { AdminUsuariosEditComponent } from './components/admin-usuarios-edit/admin-usuarios-edit.component';

const routes: Routes = [
  { path: '', redirectTo: '/login', pathMatch: 'full' },
  { path: 'login', component: LoginComponent },
  { path: 'register', component: RegisterComponent },
    { path: 'admin/pacientes/editar/:id', component: PacienteEditarComponent },


// Admin Routes
{
  path: 'admin/pacientes/editar/:id',
  component: PacienteEditarComponent,
  canActivate: [AuthGuard]
},
{
  path: 'admin/dashboard',
  component: AdminDashboardComponent,
  canActivate: [AuthGuard],
  data: { roles: [UserRole.ADMIN] }
},

{
  path: 'admin/pacientes',
  component: AdminPacientesComponent,
  canActivate: [AuthGuard],
  data: { roles: [UserRole.ADMIN] }
},
{
  path: 'admin/pacientes/nuevo',
  component: PacienteFormularioComponent,
  canActivate: [AuthGuard],
  data: { roles: [UserRole.ADMIN] }
},
{
  path: 'admin/usuarios',     // 👈 listado de administradores
  component: AdminUsuariosListComponent,
  canActivate: [AuthGuard],
  data: { roles: [UserRole.ADMIN] }
},
{
  path: 'admin/usuarios/nuevo',   // 👈 formulario para crear nuevo admin
  component: AdminUsuariosFormComponent,
  canActivate: [AuthGuard],
  data: { roles: [UserRole.ADMIN] }
},
{
  path: 'admin/usuarios/editar/:id',
  component: AdminUsuariosEditComponent,
  canActivate: [AuthGuard],
  data: { roles: [UserRole.ADMIN] }
},

  // Medico Routes
  {
    path: 'medico/dashboard',
    component: MedicoDashboardComponent,
    canActivate: [AuthGuard],
    data: { roles: [UserRole.MEDICO] }
  },
  {
    path: 'medico/citas',
    component: MedicoCitasComponent,
    canActivate: [AuthGuard],
    data: { roles: [UserRole.MEDICO] }
  },
  {
    path: 'medico/recetas',
    component: MedicoRecetasComponent,
    canActivate: [AuthGuard],
    data: { roles: [UserRole.MEDICO] }
  },

  // Paciente Routes
  {
    path: 'paciente/dashboard',
    component: PacienteDashboardComponent,
    canActivate: [AuthGuard],
    data: { roles: [UserRole.PACIENTE] }
  },
  {
    path: 'paciente/citas',
    component: PacienteCitasComponent,
    canActivate: [AuthGuard],
    data: { roles: [UserRole.PACIENTE] }
  },

  // Catch all route - redirect to login
  { path: '**', redirectTo: '/login' }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
