import { ComponentFixture, TestBed } from '@angular/core/testing';

import { PacienteFormularioComponent } from './paciente-formulario.component';

describe('PacienteFormularioComponent', () => {
  let component: PacienteFormularioComponent;
  let fixture: ComponentFixture<PacienteFormularioComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [PacienteFormularioComponent]
    });
    fixture = TestBed.createComponent(PacienteFormularioComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
