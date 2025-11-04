import { ComponentFixture, TestBed } from '@angular/core/testing';

import { EditOdontologo } from './edit-odontologo';

describe('EditOdontologo', () => {
  let component: EditOdontologo;
  let fixture: ComponentFixture<EditOdontologo>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [EditOdontologo]
    })
    .compileComponents();

    fixture = TestBed.createComponent(EditOdontologo);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
