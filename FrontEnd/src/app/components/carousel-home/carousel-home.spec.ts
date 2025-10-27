import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CarouselHome } from './carousel-home';

describe('CarouselHome', () => {
  let component: CarouselHome;
  let fixture: ComponentFixture<CarouselHome>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [CarouselHome]
    })
    .compileComponents();

    fixture = TestBed.createComponent(CarouselHome);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
