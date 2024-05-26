import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ProgramarExamenFormularioComponent } from './programar-examen-formulario.component';

describe('ProgramarExamenFormularioComponent', () => {
  let component: ProgramarExamenFormularioComponent;
  let fixture: ComponentFixture<ProgramarExamenFormularioComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [ProgramarExamenFormularioComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(ProgramarExamenFormularioComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
