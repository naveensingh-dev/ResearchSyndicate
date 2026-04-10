import { ComponentFixture, TestBed } from '@angular/core/testing';

import { BackgroundFx } from './background-fx';

describe('BackgroundFx', () => {
  let component: BackgroundFx;
  let fixture: ComponentFixture<BackgroundFx>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [BackgroundFx]
    })
    .compileComponents();

    fixture = TestBed.createComponent(BackgroundFx);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
