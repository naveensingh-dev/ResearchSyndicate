import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ReportOverlay } from './report-overlay';

describe('ReportOverlay', () => {
  let component: ReportOverlay;
  let fixture: ComponentFixture<ReportOverlay>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [ReportOverlay]
    })
    .compileComponents();

    fixture = TestBed.createComponent(ReportOverlay);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
