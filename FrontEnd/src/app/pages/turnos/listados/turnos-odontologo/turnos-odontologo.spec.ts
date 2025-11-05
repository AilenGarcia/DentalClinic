import { ComponentFixture, TestBed } from '@angular/core/testing';

import { TurnosOdontologo } from './turnos-odontologo';

describe('TurnosOdontologo', () => {
  let component: TurnosOdontologo;
  let fixture: ComponentFixture<TurnosOdontologo>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [TurnosOdontologo]
    })
    .compileComponents();

    fixture = TestBed.createComponent(TurnosOdontologo);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
