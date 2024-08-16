import { ComponentFixture, TestBed } from '@angular/core/testing';

import { MedicalPescribeComponent } from './medical-pescribe.component';

describe('MedicalPescribeComponent', () => {
  let component: MedicalPescribeComponent;
  let fixture: ComponentFixture<MedicalPescribeComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [MedicalPescribeComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(MedicalPescribeComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
