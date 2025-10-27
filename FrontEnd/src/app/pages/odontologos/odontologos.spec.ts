import { ComponentFixture, TestBed } from '@angular/core/testing';

import { Odontologos } from './odontologos';

describe('Odontologos', () => {
  let component: Odontologos;
  let fixture: ComponentFixture<Odontologos>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [Odontologos]
    })
    .compileComponents();

    fixture = TestBed.createComponent(Odontologos);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
