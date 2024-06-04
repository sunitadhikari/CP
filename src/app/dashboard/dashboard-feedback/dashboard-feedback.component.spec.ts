import { ComponentFixture, TestBed } from '@angular/core/testing';

import { DashboardFeedbackComponent } from './dashboard-feedback.component';

describe('DashboardFeedbackComponent', () => {
  let component: DashboardFeedbackComponent;
  let fixture: ComponentFixture<DashboardFeedbackComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [DashboardFeedbackComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(DashboardFeedbackComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
