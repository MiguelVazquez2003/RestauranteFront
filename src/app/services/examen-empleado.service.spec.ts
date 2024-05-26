import { TestBed } from '@angular/core/testing';

import { ExamenEmpleadoService } from './examen-empleado.service';

describe('ExamenEmpleadoService', () => {
  let service: ExamenEmpleadoService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(ExamenEmpleadoService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
