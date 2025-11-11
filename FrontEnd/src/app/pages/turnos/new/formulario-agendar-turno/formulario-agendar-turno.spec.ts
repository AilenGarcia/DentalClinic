import { ComponentFixture, TestBed } from '@angular/core/testing';

import { FormularioAgendarTurno } from './formulario-agendar-turno';

describe('FormularioAgendarTurno', () => {
  let component: FormularioAgendarTurno;
  let fixture: ComponentFixture<FormularioAgendarTurno>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [FormularioAgendarTurno]
    })
    .compileComponents();

    fixture = TestBed.createComponent(FormularioAgendarTurno);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
