import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ReactivoFormularioComponent } from './reactivo-formulario.component';

describe('ReactivoFormularioComponent', () => {
  let component: ReactivoFormularioComponent;
  let fixture: ComponentFixture<ReactivoFormularioComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [ReactivoFormularioComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(ReactivoFormularioComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
