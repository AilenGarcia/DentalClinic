import { ComponentFixture, TestBed } from '@angular/core/testing';

import { TurnosPaciente } from './turnos-paciente';

describe('TurnosPaciente', () => {
  let component: TurnosPaciente;
  let fixture: ComponentFixture<TurnosPaciente>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [TurnosPaciente]
    })
    .compileComponents();

    fixture = TestBed.createComponent(TurnosPaciente);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
