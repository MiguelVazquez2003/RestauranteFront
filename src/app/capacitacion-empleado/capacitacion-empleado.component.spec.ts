import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CapacitacionEmpleadoComponent } from './capacitacion-empleado.component';

describe('CapacitacionEmpleadoComponent', () => {
  let component: CapacitacionEmpleadoComponent;
  let fixture: ComponentFixture<CapacitacionEmpleadoComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [CapacitacionEmpleadoComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(CapacitacionEmpleadoComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
