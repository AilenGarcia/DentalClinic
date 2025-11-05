import { ComponentFixture, TestBed } from '@angular/core/testing';

import { EditPaciente } from './edit-paciente';

describe('EditPaciente', () => {
  let component: EditPaciente;
  let fixture: ComponentFixture<EditPaciente>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [EditPaciente]
    })
    .compileComponents();

    fixture = TestBed.createComponent(EditPaciente);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
