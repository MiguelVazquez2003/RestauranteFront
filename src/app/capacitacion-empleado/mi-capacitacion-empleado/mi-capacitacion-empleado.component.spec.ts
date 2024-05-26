import { ComponentFixture, TestBed } from '@angular/core/testing';

import { MiCapacitacionEmpleadoComponent } from './mi-capacitacion-empleado.component';

describe('MiCapacitacionEmpleadoComponent', () => {
  let component: MiCapacitacionEmpleadoComponent;
  let fixture: ComponentFixture<MiCapacitacionEmpleadoComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [MiCapacitacionEmpleadoComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(MiCapacitacionEmpleadoComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
