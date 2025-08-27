import { ComponentFixture, TestBed } from '@angular/core/testing';
import { AdminUsuariosListComponent } from './admin-usuarios-list.component';

describe('AdminUsuariosListComponent', () => {
  let component: AdminUsuariosListComponent;
  let fixture: ComponentFixture<AdminUsuariosListComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [AdminUsuariosListComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(AdminUsuariosListComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
