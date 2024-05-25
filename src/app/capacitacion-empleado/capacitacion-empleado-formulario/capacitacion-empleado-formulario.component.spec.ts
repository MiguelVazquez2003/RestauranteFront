import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CapacitacionEmpleadoFormularioComponent } from './capacitacion-empleado-formulario.component';

describe('CapacitacionEmpleadoFormularioComponent', () => {
  let component: CapacitacionEmpleadoFormularioComponent;
  let fixture: ComponentFixture<CapacitacionEmpleadoFormularioComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [CapacitacionEmpleadoFormularioComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(CapacitacionEmpleadoFormularioComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
