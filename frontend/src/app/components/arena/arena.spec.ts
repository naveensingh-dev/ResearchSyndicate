import { ComponentFixture, TestBed } from '@angular/core/testing';

import { Arena } from './arena';

describe('Arena', () => {
  let component: Arena;
  let fixture: ComponentFixture<Arena>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [Arena]
    })
    .compileComponents();

    fixture = TestBed.createComponent(Arena);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
