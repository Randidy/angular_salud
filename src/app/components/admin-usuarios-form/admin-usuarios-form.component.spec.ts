import { ComponentFixture, TestBed } from '@angular/core/testing';
import { ReactiveFormsModule } from '@angular/forms';
import { HttpClientTestingModule } from '@angular/common/http/testing';
import { AdminUsuariosFormComponent } from './admin-usuarios-form.component';

describe('AdminUsuariosFormComponent', () => {
  let component: AdminUsuariosFormComponent;
  let fixture: ComponentFixture<AdminUsuariosFormComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [AdminUsuariosFormComponent],
      imports: [
        ReactiveFormsModule,
        HttpClientTestingModule // Para poder mockear HTTP
      ]
    }).compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(AdminUsuariosFormComponent);
    component = fixture.componentInstance;
    fixture.detectChanges(); // Inicializa bindings
  });

  it('should create the component', () => {
    expect(component).toBeTruthy();
  });

  it('should have form controls', () => {
    expect(component.form.contains('usuario')).toBeTrue();
    expect(component.form.contains('password')).toBeTrue();
    expect(component.form.contains('roles')).toBeTrue();
  });

  it('should make the form invalid when empty', () => {
    component.form.setValue({ usuario: '', password: '', roles: 'ADMIN' });
    expect(component.form.valid).toBeFalse();
  });

  it('should make the form valid when filled', () => {
    component.form.setValue({ usuario: 'admin', password: '123456', roles: 'ADMIN' });
    expect(component.form.valid).toBeTrue();
  });
});
