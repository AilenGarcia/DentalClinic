import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ModalPassword } from './modal-password';

describe('ModalPassword', () => {
  let component: ModalPassword;
  let fixture: ComponentFixture<ModalPassword>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [ModalPassword]
    })
    .compileComponents();

    fixture = TestBed.createComponent(ModalPassword);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
