import { TestBed } from '@angular/core/testing';

import { CapacitacionEmpleadoService } from './capacitacion-empleado.service';

describe('CapacitacionEmpleadoService', () => {
  let service: CapacitacionEmpleadoService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(CapacitacionEmpleadoService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
