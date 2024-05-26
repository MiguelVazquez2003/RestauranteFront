import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ProgramarExamenComponent } from './programar-examen.component';

describe('ProgramarExamenComponent', () => {
  let component: ProgramarExamenComponent;
  let fixture: ComponentFixture<ProgramarExamenComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [ProgramarExamenComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(ProgramarExamenComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
