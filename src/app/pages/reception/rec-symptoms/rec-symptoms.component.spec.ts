import { ComponentFixture, TestBed } from '@angular/core/testing';

import { RecSymptomsComponent } from './rec-symptoms.component';

describe('RecSymptomsComponent', () => {
  let component: RecSymptomsComponent;
  let fixture: ComponentFixture<RecSymptomsComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [RecSymptomsComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(RecSymptomsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
