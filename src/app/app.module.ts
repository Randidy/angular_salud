import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { HttpClientModule, HTTP_INTERCEPTORS } from '@angular/common/http';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common';  // 👈 necesario para ngIf, ngFor, ngClass

// Routing
import { AppRoutingModule } from './app-routing.module';

// Componentes
import { AppComponent } from './app.component';
import { LoginComponent } from './components/login/login.component';
import { RegisterComponent } from './components/register/register.component';
import { AdminDashboardComponent } from './components/admin-dashboard/admin-dashboard.component';
import { MedicoDashboardComponent } from './components/medico-dashboard/medico-dashboard.component';
import { PacienteDashboardComponent } from './components/paciente-dashboard/paciente-dashboard.component';
import { AdminPacientesComponent } from './components/admin-pacientes/admin-pacientes.component';
import { PacienteCitasComponent } from './components/paciente-citas/paciente-citas.component';
import { MedicoCitasComponent } from './components/medico-citas/medico-citas.component';
import { MedicoRecetasComponent } from './components/medico-recetas/medico-recetas.component';
import { PacienteEditarComponent } from './components/paciente-editar/paciente-editar.component';

// 👇 Nuevos componentes
import { AdminUsuariosFormComponent } from './components/admin-usuarios-form/admin-usuarios-form.component';
import { AdminUsuariosListComponent } from './components/admin-usuarios-list/admin-usuarios-list.component';
import { PacienteFormularioComponent } from './components/paciente-formulario/paciente-formulario.component';

// Services y guards
import { AuthService } from './services/auth.service';
import { MedicalService } from './services/medical.service';
import { AuthGuard } from './guards/auth.guard';
import { AuthInterceptor } from './interceptors/auth.interceptor';
import { AdminUsuariosEditComponent } from './components/admin-usuarios-edit/admin-usuarios-edit.component';
import { AdminMedicosComponent } from './components/admin-medicos/admin-medicos.component';

@NgModule({
  declarations: [
    AppComponent,
    LoginComponent,
    RegisterComponent,
    AdminDashboardComponent,
    MedicoDashboardComponent,
    PacienteDashboardComponent,
    AdminPacientesComponent,
    PacienteCitasComponent,
    MedicoCitasComponent,
    MedicoRecetasComponent,
    AdminUsuariosFormComponent,
    AdminUsuariosListComponent,
    AdminUsuariosEditComponent,
    AdminMedicosComponent,
    PacienteFormularioComponent ,
    PacienteEditarComponent
  
  ],
  imports: [
    BrowserModule,
    CommonModule,       // 👈 agregado
    AppRoutingModule,
    HttpClientModule,
    FormsModule,
    ReactiveFormsModule,
    
  ],
  providers: [
    AuthService,
    MedicalService,
    AuthGuard,
    {
      provide: HTTP_INTERCEPTORS,
      useClass: AuthInterceptor,
      multi: true
    }
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
