import { ComponentFixture, TestBed } from '@angular/core/testing';

import { TopologyStrip } from './topology-strip';

describe('TopologyStrip', () => {
  let component: TopologyStrip;
  let fixture: ComponentFixture<TopologyStrip>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [TopologyStrip]
    })
    .compileComponents();

    fixture = TestBed.createComponent(TopologyStrip);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
