import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CapacitacionFormularioComponent } from './capacitacion-formulario.component';

describe('CapacitacionFormularioComponent', () => {
  let component: CapacitacionFormularioComponent;
  let fixture: ComponentFixture<CapacitacionFormularioComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [CapacitacionFormularioComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(CapacitacionFormularioComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
